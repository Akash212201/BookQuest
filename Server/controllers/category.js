const Category = require("../models/Category");

exports.createCategory = async (req, resp) => {
  try {
    const { categoryName } = req.body;

    if (!categoryName) {
      resp.status(400).json({
        success: false,
        message: "not found category name",
      });
    }

    const categorydetails = await Category.create({ categoryName });
    console.log(categorydetails);

    return resp.status(200).json({
      success: true,
      message: "category created successfully",
    });
  } catch (error) {
    resp.status(400).json({
      success: false,
      message: "error occured",
    });
  }
};

exports.getCategories=async (req,resp)=>{
    try{
        const categories=await Category.find({},{categoryName:true});
        if(categories.length==0){
            resp.status(400).json({
                success: false,
                message: "no category found",
              });
        }

        console.log(categories);
        return resp.status(200).json({
            success: true,
            message: "category fetched successfully",
            categories
          });

    }catch(error){
        resp.status(400).json({
            success: false,
            message: "error occured",
          });
    }
}

exports.categoryPageDetails=async (req,resp)=>{
    try{
const {categoryid}=req.body;

const specificCategory=await Category.findById({_id : categoryid}).populate({
    path:"eBooks",
    match:{status:"Published"},
    populate:"ratingAndReviews"
}).exec();

console.log(specificCategory)

// all categories
if(!specificCategory){
    return resp.status(402).json({
        success:false,
        message:"cannot find courses"
    })
}

// Handle the case when there are no courses
if (specificCategory.eBooks.length === 0) {
    console.log("No eBooks found for the selected category.")
    return resp.status(404).json({
        success: false,
        message: "No eBooks found for the selected category.",
    })
}

const allCategory=await Category.find({}).populate({
    path:"eBooks",
    match:{status:"Published"},
    populate:"ratingAndReviews"
}).exec();

const allBooks=allCategory.flatMap((category)=> category.eBooks );
const mostSellingBooks=allBooks.sort((a,b)=> b.customerPurchased.length-a.customerPurchased.length).slice(0,10);


return resp.status(200).json({
    success:true,
    message:"data get successfully",
    data:{
        specificCategory,
        mostSellingBooks
    }
})

    }catch(error){
        resp.status(400).json({
            success:false,
            message:"error occured",
           
        })
    }
}


