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
            _id:category._id,
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


exports.getCategory=async (req,resp)=>{
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
          _id:category._id,
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
const {sort}=req.body;
    // const categoryid = "65e22940c05eccafe3477a54";
    // const categorybooks = await Category.aggregate([
    //   {
    //     $match: {
    //       _id: new mongoose.Types.ObjectId(categoryid)
    //     }
    //   }, {
    //     $lookup: {
    //       from: "books",
    //       localField: "eBooks",
    //       foreignField: "_id",
    //       as: "books",
    //       pipeline: [
    //         {
    //           $project: {

    //             bookName: 1, bookAuthor: 1,
    //             bookSummary: 1, bookStock: 1,
    //             price: 1, thumbnail: 1
    //           }
    //         }
    //       ]
    //     }
    //   },
    //   {
    //     $addFields: {
    //       books: "$books"
    //     }
    //   },
    //   {
    //     $unwind: "$books" // Unwind the "books" array (optional but recommended)
    //   },
    //   {
    //     $replaceRoot: { // Replace the root document with the "books" document
    //       newRoot: "$books"
    //     }
    //   },

    // ])

    const availableBooks = await Books.find({});


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
        mostrecentbooks,
        mostSellingBooks,
        availableBooks,
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



exports.groupcategorysort = async (req, resp) => {
  try {
const {sort}=req.body;
  console.log("sort123 ",sort)

    


    const mostrecentbooks = await Books.find({}).sort({ createdAt: -1 })
    console.log("mostrecent",mostrecentbooks)

    sort===true?mostrecentbooks.sort((a, b) => a.price - b.price):
    mostrecentbooks.sort((a, b) => b.price - a.price);

    console.log("mark111")
    const allCategory = await Category.find({}).populate({
      path: "eBooks",
      match: { status: "Published" },
      populate: "ratingAndReviews"
    }).exec();

    const allBooks = allCategory.flatMap((category) => category.eBooks);
    const mostSellingBooks = allBooks.sort((a, b) => b.customerPurchased.length - a.customerPurchased.length).slice(0, 10);

    console.log("most selling",mostSellingBooks)
    sort===true?mostSellingBooks.sort((a, b) => a.price - b.price):
    mostSellingBooks.sort((a, b) => b.price - a.price);

    console.log("mark12")
    return resp.status(200).json({
      success: true,
      data: {
        mostrecentbooks,
        mostSellingBooks,
      
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


exports.groupcategoryid = async (req, resp) => {
  try {

 const {categoryid}=req.body;

    


    const mostrecentbooks = await Books.find({category:categoryid}).sort({ createdAt: -1 })

    const allCategory = await Category.find({_id:categoryid}).populate({
      path: "eBooks",
      match: { status: "Published" },
      populate: "ratingAndReviews"
    }).exec();

    const allBooks = allCategory.flatMap((category) => category.eBooks);
    const mostSellingBooks = allBooks.sort((a, b) => b.customerPurchased.length - a.customerPurchased.length).slice(0, 10);


    return resp.status(200).json({
      success: true,
      data: {
        mostrecentbooks,
        mostSellingBooks,
    
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
    console.log("mark category");

    const { categoryid,sort } = req.body;
    console.log(categoryid);

    const specificCategory = await Category.findById({ _id: categoryid }).populate({
      path: "eBooks",
      match: { status: "Published" },
      populate: "ratingAndReviews"
    }).exec();

    console.log(specificCategory);

    if (!specificCategory) {
      return resp.status(402).json({
        success: false,
        message: "cannot find books"
      });
    }

    // Sort ebooks by price in ascending order (Mongoose approach)
    sort===true?specificCategory.eBooks.sort((a, b) => a.price - b.price):
    specificCategory.eBooks.sort((a, b) => b.price - a.price);

    // OR (using JavaScript array sort)
    // const sortedEbooks = specificCategory.eBooks.sort((a, b) => a.price - b.price);
    // specificCategory.eBooks = sortedEbooks;

    return resp.status(200).json({
      success: true,
      message: "data get successfully",
      data: specificCategory
    });
  } catch (error) {
    resp.status(400).json({
      success: false,
      message: "error occured",
    });
  }
};

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


// exports.deleteCategory=async (req,resp)=>{
//   try{
//     const {categoryid}=req.body;
//       const categories=await Category.findById(categoryid);
//       const categoriesdata=categories.map((category,ind)=>(
//         {
//           id:ind+1,
//           categoryName:category.categoryName,
//           categoryDesc:category.categoryDesc
//         }
//       ))
//       if(categories.length==0){
//           resp.status(400).json({
//               success: false,
//               message: "no category found",
//             });
//       }

//       console.log(categories);
//       return resp.status(200).json({
//           success: true,
//           message: "category fetched successfully",
//           data:categoriesdata
//         });

// } catch (error) {
//   resp.status(400).json({
//     success: false,
//     message: "error occured",
//   });
// }
// }