const Books = require("../models/Books");
const Category = require("../models/Category");
const User = require("../models/User");
const { imageUploadCloudinary } = require("../utils/imageUploadCloudinary");

require("dotenv").config();

exports.createBook = async (req, resp) => {
  try {
    console.log("mark");

    const {
      bookName,
      bookAuthor,
      bookSummary,
      price,
      category,
      status,
      bookStock,
    } = req.body;
    console.log(bookName);
    const thumbnail = req.files.thumbnail;
    const pdfUrl = req.files.pdfUrl;
    console.log(thumbnail);
    console.log(pdfUrl);

    if (
      !bookName ||
      !bookAuthor ||
      !bookSummary ||
      !price ||
      !category ||
      !status ||
      !thumbnail ||
      !bookStock ||
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

    const thumbnailImage = await imageUploadCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    const PDFURL = await imageUploadCloudinary(pdfUrl, process.env.FOLDER_NAME);
    console.log(PDFURL);

    const categorydetail = await Category.findById({ _id: category });

    const newbook = await Books.create({
      bookName,
      bookAuthor,
      bookSummary,
      price,
      thumbnail: thumbnailImage.secure_url,
      pdfUrl: PDFURL.secure_url,
      category: categorydetail._id,
      status,
      adminUser: adminDetails._id,
      noOfPages: PDFURL.pages,
      bookStock,
    });

    // update User model
    await User.findByIdAndUpdate(
      { _id: adminDetails._id },
      { $push: { eBooks: newbook._id } },
      { new: true }
    );

    //update category model
    console.log("mark3");
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
    resp.status(200).json({
      success: false,
      message: "some problem occured",
    });
  }
};

// show all ebooks
exports.showAllEbooks = async (req, resp) => {
  try {
    const booksDetails = await Books.find(
      {},
      {
        bookName: true,
        bookAuthor: true,
        price: true,
        thumbnail: true,
        pdfUrl: true,
        category: true,
        customerPurchased: true,
        bookSummary: true,
        ratingAndReviews: true,
        bookStock: true,
      }
    );

    console.log(booksDetails);
    return resp.status(200).json({
      success: true,
      message: "all the ebooks fetched successfully",
      data: booksDetails,
    });
  } catch (error) {
    resp.status(400).json({
      success: false,
      message: "error occured",
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
    const { bookid } = req.body;
    const updates = req.body;

    const bookdetails = await Books.findById(bookid);

    // Important Stepss----
    const { thumbnail, pdfUrl } = req.files;
    console.log(thumbnail);
    console.log(pdfUrl);

    if (thumbnail) {
      const thumbnailImage = await imageUploadCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      bookdetails.thumbnail = thumbnailImage.secure_url;
    }

    if (pdfUrl) {
      const updatePdf = await imageUploadCloudinary(
        pdfUrl,
        process.env.FOLDER_NAME
      );
      bookdetails.pdfUrl = updatePdf.secure_url;
    }

    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        bookdetails[key] = updates[key];
      }
    }

    await bookdetails.save();
    // Todo:update rating and reviews

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
    const {bookid} = req.body;
console.log(bookid)
    const bookdetails = await Books.findById(bookid)
    console.log("mark1")
    if( bookdetails.customerPurchased){
        for(const userid of bookdetails.customerPurchased) {
            await User.findByIdAndUpdate(
              { userid },
              {
                $pull: { eBooks: bookid },
              }
            );
          }
    }

    await User.findByIdAndUpdate(bookdetails.adminUser,{
        $pull:{eBooks:bookid}
    })
    await Category.findByIdAndUpdate(bookdetails.category, {
      $pull: { eBooks: bookid },
    });

    await Books.findByIdAndDelete(bookid);

    return resp.status(200).json({
      success: true,
      message: "Successfully deleted the Book",
    });
  } catch (error) {
    resp.status(400).json({
      success: false,
      message: "error occured",
    });
  }
};
