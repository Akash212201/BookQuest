const Books = require("../models/Books");
const Category = require("../models/Category");
const ReqBook = require("../models/ReqBook");
const User = require("../models/User");
const { imageUploadCloudinary } = require("../utils/imageUploadCloudinary");

require("dotenv").config();

exports.createBook = async (req, resp) => {
  try {
    console.log("mark");
    // console.log("req",req)

    const {
      bookName,
      bookAuthor,
      bookSummary,
      price,
      category,
      bookStock

    } = req.body;
    const { thumbnail, pdfUrl } = req.files;
    console.log(category)

    console.log("category", category)

    // console.log("pdfurl",pdfUrl);

    if (
      !bookName ||
      !bookAuthor ||
      !bookSummary ||
      !price ||
      !category ||

      !thumbnail ||

      !pdfUrl
    ) {
      resp.status(400).json({
        success: false,
        message: "required fields are missing",
      });
    }

    const userid = req.user.id;
    console.log(userid);

    // this is the admin who create the books of different author we can find that  by using userId
    const adminDetails = await User.findById(userid);
    console.log(adminDetails);
    if (!adminDetails) {
      return resp.status(401).json({
        success: false,
        message: "Invalid admin credentials!",
      });
    }
    console.log("mark5")
    console.log(thumbnail)

    const thumbnailImage = await imageUploadCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    console.log("mark6")

    const PDFURL = await imageUploadCloudinary(pdfUrl, process.env.FOLDER_NAME);
    console.log("pdfUrl", PDFURL);

    const categorydetail = await Category.findById({ _id: category });

    console.log(categorydetail)

    const newbook = await Books.create({
      bookName,
      bookAuthor,
      bookSummary,
      price,
      bookStock: bookStock,
      status: "Published",
      thumbnail: thumbnailImage?.secure_url || '', // Use optional chaining to access secure_url property
      pdfUrl: PDFURL?.secure_url || '', // Use optional chaining to access secure_url property
      category: categorydetail?._id || null, // Use optional chaining to access _id property
      adminUser: adminDetails?._id || null, // Use optional chaining to access _id property
      noOfPages: PDFURL?.pages || null, // Use optional chaining to access pages property
    });

    console.log("mark7")

    // update User model
    await User.findByIdAndUpdate(
      { _id: adminDetails._id },
      { $push: { eBooks: newbook._id } },
      { new: true }
    );

    //update category model
    console.log("mark8");
    console.log(categorydetail._id);
    await Category.findByIdAndUpdate(
      { _id: categorydetail._id },
      { $push: { eBooks: newbook._id } },
      { new: true }
    );
    console.log("mark2");

    return resp.status(200).json({
      success: true,
      data: newbook,
      message: "new book added",
    });
  } catch (error) {
    resp.status(400).json({
      success: false,
      message: "some problem occured",
    });
  }
};

// // show all ebooks
// exports.showAllEbooks = async (req, resp) => {
//   try {
//     const booksDetails = await Books.find(
//       {},
//       {
//         bookName: true,
//         bookAuthor: true,
//         price: true,
//         thumbnail: true,
//         pdfUrl: true,
//         'category.categoryName': true,
//         customerPurchased: true,
//         bookSummary: true,
//         ratingAndReviews: true,
//         bookStock: true,
//       }
//     )

//     const modifiedBooksDetails = booksDetails.map(book => ({
//       ...book.toObject(),
//       categoryName: book.category.categoryName
//     }));

//     console.log(booksDetails);
//     return resp.status(200).json({
//       success: true,
//       message: "all the ebooks fetched successfully",
//       data: modifiedBooksDetails,
//     });
//   } catch (error) {
//     resp.status(400).json({
//       success: false,
//       message: "error occured",
//     });
//   }
// };

// const Books = require('../models/Books'); // Import the Books model

exports.showAllEbooks = async (req, resp) => {
  try {
    // Fetch all books and populate the 'category' field to get categoryName
    const booksDetails = await Books.find({}, '-__v')
      .populate('category', 'categoryName');

    // Format the response to include categoryName directly in each book object
    const formattedBooksDetails = booksDetails.map((book, index) => ({
      id: index + 1,

      _id: book._id,
      bookName: book.bookName,
      bookAuthor: book.bookAuthor,
      bookSummary: book.bookSummary,
      price: book.price,
      bookStock: book.bookStock,
      ratingAndReviews: book.ratingAndReviews,
      thumbnail: book.thumbnail,
      categoryName: book.category ? book.category.categoryName : '', // Check if category exists
      customerPurchased: book.customerPurchased,
      pdfUrl: book.pdfUrl
    }));

    console.log(formattedBooksDetails);

    return resp.status(200).json({
      success: true,
      message: "All ebooks fetched successfully",
      data: formattedBooksDetails,
    });
  } catch (error) {
    console.error("Error fetching ebooks:", error);
    return resp.status(400).json({
      success: false,
      message: "An error occurred while fetching ebooks",
    });
  }
};


exports.showBookInformation = async (req, resp) => {
  try {
    const { bookid } = req.body;
    console.log(bookid);

    if (!bookid) {
      return resp.json({
        success: false,
        message: "please provide a valid id",
      });
    }

    console.log("mark23");
    //Todo: Add the Populate
    const bookdetails = await Books.findById({ _id: bookid })

      .populate("category")
      .populate("ratingAndReviews")
      .exec();

    console.log(bookdetails);
    return resp.status(200).json({
      success: true,
      data: bookdetails,
    });
  } catch (error) {
    resp.status(400).json({
      success: false,
      message: "error occured",
    });
  }
};




exports.showBookDetail = async (req, resp) => {
  try {
    const { bookid } = req.body;
    console.log(bookid);

    if (!bookid) {
      return resp.json({
        success: false,
        message: "please provide a valid id",
      });
    }

    console.log("mark23");
    //Todo: Add the Populate
    const bookdetails = await Books.findById({ _id: bookid })
      .populate("category")
      .exec();

    console.log(bookdetails);
    return resp.status(200).json({
      success: true,
      data: bookdetails,
    });
  } catch (error) {
    resp.status(400).json({
      success: false,
      message: "error occured",
    });
  }
};


exports.editBook = async (req, resp) => {
  try {
    console.log("mark")
    const { bookid,bookName } = req.body;
    console.log(bookid)
    console.log(bookName)
    const updates = req.body;

    const bookdetails = await Books.findById(bookid);
console.log(bookdetails)
console.log(updates)

    // Important Stepss----
//     const { thumbnail, pdfUrl } = req.files;

// console.log("mark222")
//     console.log(thumbnail);
//     console.log(pdfUrl);

//     if (thumbnail) {
//       const thumbnailImage = await imageUploadCloudinary(
//         thumbnail,
//         process.env.FOLDER_NAME
//       );
//       bookdetails.thumbnail = thumbnailImage.secure_url;
//     }

//     if (pdfUrl) {
//       const updatePdf = await imageUploadCloudinary(
//         pdfUrl,
//         process.env.FOLDER_NAME
//       );
//       bookdetails.pdfUrl = updatePdf.secure_url;
//     }

    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        bookdetails[key] = updates[key];
      }
    }
    console.log("mark222")
    
    await bookdetails.save();
    // Todo:update rating and reviews
    
    console.log("mark2223")
    const updatedBook = await Books.findById(bookid)
      .populate("category")
      .exec();

    return resp.status(200).json({
      success: true,
      data: updatedBook,
      message: "Book updated successfully",
    });
  } catch (error) {
    resp.status(500).json({
      success: false,
      message: "An error occurred while updating the book",
    });
  }
};

exports.getAdminBooks = async (req, resp) => {
  try {
    const adminid = req.user.id;
    // find all books
    const adminbooks = await Books.find({ adminUser: adminid }).sort({
      createdAt: -1,
    });
    resp.status(200).json({
      success: true,
      message: "all books fetched",
      adminbooks,
    });
  } catch (error) {
    resp.status(400).json({
      success: false,
      message: "Error occured while getting books",
    });
  }
};

exports.deleteBook = async (req, resp) => {
  try {
    const { bookid } = req.body;
    console.log(bookid)
    const bookdetails = await Books.findById(bookid)
    console.log("mark1")
    if (bookdetails.customerPurchased) {
      for (const userid of bookdetails.customerPurchased) {
        console.log(userid)
        await User.findByIdAndUpdate(
          userid,
          {
            $pull: { eBooks: bookid },
          }
        );
      }
      console.log("mark2")
    }

    await User.findByIdAndUpdate(bookdetails.adminUser, {
      $pull: { eBooks: bookid }
    })
    console.log("mark3")
    await Category.findByIdAndUpdate(bookdetails.category, {
      $pull: { eBooks: bookid },
    });
    console.log("mark4")

    await Books.findByIdAndDelete(bookid);
    console.log("mark5")

    return resp.status(200).json({
      success: true,
      message: "Successfully deleted the Book",
    });
  } catch (error) {
    return resp.status(400).json({
      success: false,
      message: "error occured",
    });
  }
};

exports.reqBook = async (req, resp) => {
  try {
    const {
      bookName,
      bookAuthor,
      email,
      mobile
    } = req.body;

    console.log(bookName)
    const bookresp = await ReqBook.create({
      bookName,
      bookAuthor,
      email,
      mobile
    });

    if (!bookresp) {
      return resp.status(400).json({
        success: false,
        message: "error in req book",
      });
    }

    return resp.status(200).json({
      success: true,

      message: "get the data",
    });

  } catch (error) {
    return resp.status(400).json({
      success: false,
      message: "error occured",
    });
  }
}
