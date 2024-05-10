const { default: mongoose } = require("mongoose");
const Books = require("../models/Books");
const RatingAndReviews = require("../models/RatingAndReviews");

exports.RatingAndReviews = async (req, resp) => {
  try {
    const { rating, bookid , review=" "} = req.body;
    console.log(rating)
    console.log(bookid)
    console.log(review)
    const userid = req.user.id;

    if (!rating || !bookid ) {
      resp.status(400).json({
        success: false,
        message: "required fields are missing",
      });
    }
console.log("mark2")
    const checkpurchase = await Books.findOneAndUpdate(
      {_id:bookid},
      {$push:{customerPurchased:userid}},  
    );
    console.log("checkpurchase",checkpurchase)

    if (!checkpurchase) {
      resp.status(400).json({
        success: false,
        message: "You have not purchased this book.",
      });
    }
    // check user is already rating and review or not
    let checkrating = await RatingAndReviews.findOne({
      user: userid,
      eBook: bookid,
    });

    if (checkrating) {
      resp.status(400).json({
        success: false,
        message: "You are already rate this book",
      });
    }
console.log("mark23")
const createrating = await RatingAndReviews.create({
  user: userid,
  rating: rating,
  review: review,
  eBook: bookid,
});
console.log("mark13")

    if (!createrating) {
      resp.status(400).json({
        success: false,
        message: "problem in creating the rating and review",
      });
    }

    // update the book
    await Books.findByIdAndUpdate(bookid, {
      $push: { ratingAndReviews: createrating._id },
    });

    resp.status(200).json({
      success: true,
      message: "successfully rate and review the book",
    });
  } catch (error) {
    resp.status(400).json({
      success: false,
      message: "server error occured",
    });
  }
};


// const { ObjectId } = require('mongodb'); // Or use Mongoose

// const bookid = "63fc77b2087f2b79d5915eb2"; // Sample valid ObjectID value 
// const newBookDocumentId = new ObjectId(bookid); 

// console.log(newBookDocumentId);


exports.getAverageRating = async (req, resp) => {
  try {
    const  bookid  = req.body;

    const result = await RatingAndReviews.aggregate([
      {
        $match: { 
            eBook:new ObjectId(bookid) 
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    if (result.length > 0) {
      return resp.status(200).json({
        success: true,
        message: "get average ratings",
        averageRating: result[0].averageRating,
      });
    }

    return resp.status(402).json({
      success: false,
      message: "Averagerating is 0,no rating given now till now",
    });
  } catch (error) {
    return resp.status(402).json({
      success: false,
      message: "Server Error Occurred!",
    });
  }
};

exports.getAllRatings = async (req, resp) => {
  try {
    const allRatings = await RatingAndReviews.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName LastName email image",
      })
      .populate({
        path: "eBooks",
        select: "bookName bookSummary bookAuthor",
        
      })
      .exec();

    return resp.status(200).json({
      success: true,
      message: "Get All Ratings",
      data: allRatings,
    });
  } catch (error) {
    return resp.status(402).json({
      success: false,
      message: "server error occured!!",
    });
  }
};
