const { default: mongoose } = require("mongoose");
const Category = require("../models/Category");
const Books = require("../models/Books");

exports.createCategory = async (req, resp) => {
  try {
    const { categoryName, categoryDesc } = req.body;

    console.log(categoryName)
    if (!categoryName) {
      return resp.status(400).json({
        success: false,
        message: "not found category name",
      });
    }
    const existCategory = await Category.findOne({ categoryName });
    if (existCategory) {
    if (existCategory) {
      return resp.status(400).json({
        success: false,
        message: "category is already exist",
      });
    }

    const categorydetails = await Category.create({ categoryName, categoryDesc });
    console.log(categorydetails);

    return resp.status(200).json({
      success: true,
      message: "category created successfully",
    });
  }
}
catch (error) {
  resp.status(400).json({
    success: false,
    message: "error occured",
  });
}
}

exports.getCategories=async (req,resp)=>{
    try{
      // const skip=2;
      // const limit=2;
      // for pagination we use skip and limit 
        // const categories=(await Category.find({},null,{skip,limit}));
        // const categories=(await Category.find({}).skip(2).limit(2));
        const categories=await Category.find({});
        const categoriesdata=categories.map((category,ind)=>(
          {
            id:ind+1,
            categoryName:category.categoryName,
            categoryDesc:category.categoryDesc
          }
        ))
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
            data:categoriesdata
          });

  } catch (error) {
    resp.status(400).json({
      success: false,
      message: "error occured",
    });
  }
}

exports.groupcategory = async (req, resp) => {
  try {

    const categoryid = "65e22940c05eccafe3477a54";
    const categorybooks = await Category.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(categoryid)
        }
      }, {
        $lookup: {
          from: "books",
          localField: "eBooks",
          foreignField: "_id",
          as: "books",
          pipeline: [
            {
              $project: {

                bookName: 1, bookAuthor: 1,
                bookSummary: 1, bookStock: 1,
                price: 1, thumbnail: 1
              }
            }
          ]
        }
      },
      {
        $addFields: {
          books: "$books"
        }
      },
      {
        $unwind: "$books" // Unwind the "books" array (optional but recommended)
      },
      {
        $replaceRoot: { // Replace the root document with the "books" document
          newRoot: "$books"
        }
      },

    ])

    const mostrecentbooks = await Books.find({}).sort({ createdAt: -1 })

    const allCategory = await Category.find({}).populate({
      path: "eBooks",
      match: { status: "Published" },
      populate: "ratingAndReviews"
    }).exec();

    const allBooks = allCategory.flatMap((category) => category.eBooks);
    const mostSellingBooks = allBooks.sort((a, b) => b.customerPurchased.length - a.customerPurchased.length).slice(0, 10);


    return resp.status(200).json({
      success: true,
      data: {
        categorybooks,
        mostrecentbooks,
        mostSellingBooks
      },
      message: "get all the books"
    })
  } catch (error) {
    return resp.status(400).json({
      success: false,
      message: "error occured"
    })
  }
}


exports.categoryPageDetails = async (req, resp) => {
  try {
    const { categoryid } = req.body;

    const specificCategory = await Category.findById({ _id: categoryid }).populate({
      path: "eBooks",
      match: { status: "Published" },
      populate: "ratingAndReviews"
    }).exec();

    console.log(specificCategory)

    // all categories
    if (!specificCategory) {
      return resp.status(402).json({
        success: false,
        message: "cannot find courses"
      })
    }

    // Handle the case when there are no book
    if (specificCategory.eBooks.length === 0) {
      console.log("No eBooks found for the selected category.")
      return resp.status(404).json({
        success: false,
        message: "No eBooks found for the selected category.",
      })
    }

    const allCategory = await Category.find({}).populate({
      path: "eBooks",
      match: { status: "Published" },
      populate: "ratingAndReviews"
    }).exec();

    const allBooks = allCategory.flatMap((category) => category.eBooks);
    const mostSellingBooks = allBooks.sort((a, b) => b.customerPurchased.length - a.customerPurchased.length).slice(0, 10);


    return resp.status(200).json({
      success: true,
      message: "data get successfully",
      data: {
        specificCategory,
        mostSellingBooks
      }
    })

  } catch (error) {
    resp.status(400).json({
      success: false,
      message: "error occured",

    })
  }
}

// exports.getAllCategories = async (req, resp) =>{
//   try {
//     const categories = await Category.find({}, { categoryName: true });
//     if(!categories){
//       return resp.status(400).json({
//         success: false,
//         message: "category couldn't fetched"        
//       });
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }


