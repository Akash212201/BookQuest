
const Address = require("../models/Address");
const Books = require("../models/Books");
const Paymentinfo = require("../models/Paymentinfo");
const User = require("../models/User");
const { imageUploadCloudinary } = require("../utils/imageUploadCloudinary");

exports.updateProfile = async (req, resp) => {
  try {
    const { firstName, lastName, address, mobile } = req.body;
    const userid = req.user.id;
    const userdetails = await User.findById(userid);
    const addressid = userdetails.addressDetails;

    console.log("firstName",firstName)
    const updateaddress = await Address.findByIdAndUpdate(
      addressid,
      {
        address: address,
        mobile:mobile,
       
      },
      { new: true }
    );

    const updateuser = await User.findByIdAndUpdate(userid, {
      firstName: firstName,
      lastName: lastName,
    },{new:true})
      .populate("addressDetails")
      .exec();
    return resp
      .status(200)
      .json({
        message: "profile updated  successfully",
        updateuser,
        success: true,
      });
  } catch (error) {
    resp
      .status(400)
      .json({ message: "profile not update error occured", success: false });
  }
};

exports.deleteProfile = async (req, resp) => {
  try {
    const userid = req.user.id;

    const userdetail = await User.findById(userid);

    const addressid = userdetail.addressDetails;
    await Address.findByIdAndDelete(addressid);

    for (const bookid of userdetail.eBooks) {
      await Books.findByIdAndUpdate(bookid, {
        $pull: { customerPurchased: userid },
      });
    }
    await User.findByIdAndDelete(userid);
    return resp.status(200).json({
      success: true,
      message: "delete account successfully",
    });
  } catch (error) {
    resp.status(400).json({
      success: false,
      message: "problem in delete account",
    });
  }
};

exports.getAllUserDetails = async (req, resp) => {
  try {
    const userid = req.user.id;
    const userdetails = await User.findById(userid)
      .populate("addressDetails")
      .populate({
        path: "eBooks",
        populate: {
          path: "category",
        },
      })
      .exec();
    return resp.status(200).json({
      success: true,
      message: "get user details successfully",
      data: userdetails,
    });
  } catch (error) {
    resp.status(400).json({
      success: false,
      message: "error in fetching all details",
    });
  }
};

exports.updateDisplayPicture = async (req, resp) => {
  try {
    console.log("mark")
    console.log("request",req)
    //   cookies: {
    //     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVucnVmZmxlZGJhbnphaThAZnJlZXRoZWNvb2tpZXMuY29tIiwiaWQiOiI2NWRlZGVhODlhNWMxYjU2MmQyMjZmZWMiLCJhY2NvdW50VHlwZSI6IkFkbWluIiwiaWF0IjoxNzA5MjAxNzE4LCJleHAiOjE3MDkyODgxMTh9.sg66tw7hsvpIya3wefOF1SDOiZBBU7eOk4ghz0PDR6E'
    //   },
    //   signedCookies: [Object: null prototype] {},
    //   files: [Object: null prototype] {
    //     image: {
    //       name: 'css certificate (1)_page-0001 (1).jpg',
    //       data: <Buffer >,
    //       size: 2853923,
    //       encoding: '7bit',
    //       tempFilePath: 'public\\temp\\tmp-1-1709201878839',
    //       truncated: false,
    //       mimetype: 'image/jpeg',
    //       md5: '633c0903045ed951840b6419b027c1fb',
    //       mv: [Function: mv]
    //     }
    //   },
      const image = req.files.image;
      console.log("req.files",req.files)


    if (!image) {
      resp.status(400).json({
        success: false,
        message: "cannot find image",
      });
    }
    const imageCloudinary = await imageUploadCloudinary(
      image,
      process.env.FOLDER_NAME
    );
    console.log(imageCloudinary);
    const updateuser = await User.findByIdAndUpdate(
      req.user.id,
      {
        image: imageCloudinary.secure_url,
      },
      { new: true }
    ).populate("addressDetails").exec();
    return resp.status(200).json({
      success: true,
      message: "Image has been updated Successfully",
      updateuser,
    });
  } catch (error) {
    return resp.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getPurchasedBooks=async (req,resp)=>{
    try{
        const userid=req.user.id;
        const userdetail=await User.findById(userid);
        const  purchasedbooks=userdetail.eBooks;
        
        let bookdetails=[];
        let i=0;
        for(const bookid of purchasedbooks){
            bookdetails[i]=await Books.findById(bookid).populate("category").exec();
            i++;
        }

      return   resp.status(200).json({
            success:true,
            message:"all purchased books shows",
            data:bookdetails
        })

    }catch(error){
        resp.status(400).json({
            success:false,
            message:"server error",
        
        })
    }
}

exports.getorders=async (req,resp)=>{
  try{
    const allorder=await Paymentinfo.find({});
    const orders=allorder.map((order,ind)=>({
      id:ind+1,
      paymentId:order.paymentId,
      orderId:order.orderId, 
      amount:order.amount,
      userId:order.userId,
    }))

    if(!allorder){
      return resp.status(400).json({
        success:false,
        message:"error in get orders"
      })
    }

    return resp.status(200).json({
      success:true,
      data:orders,
        message:"success in get orders"
    })

  }catch(error){
    return resp.status(400).json({
      success:false,
      message:"error found"
    })
  }
}




exports.getallusers=async (req,resp)=>{
  try{
    const allusers=await User.find({accountType:"Customer"});
    // console.log(allusers)
    const users=allusers.map((user,ind)=>(
     
      {
      id:ind+1,
      firstName:user.firstName,
       email:user.email,
       image:user.image, 
       purchaseBooks:user.eBooks.length
     
    }))

    if(!allusers){
      return resp.status(400).json({
        success:false,
        message:"error in get Users"
      })
    }

    return resp.status(200).json({
      success:true,
      data:users,
        message:"success in fetching users"
    })

  }catch(error){
    return resp.status(400).json({
      success:false,
      message:"error found"
    })
  }
}

//Todo:add dashboard

exports.instructorDashboard=async (req,resp)=>{
  try{
     const booksDetails=await Books.find({})

     const bookData=booksDetails.map((book,i)=>{
      const totalCustomerPurchase=book.customerPurchased.length;
      const totalAmountGenerate=totalCustomerPurchase*book.price;

      const bookDataWithStats={
     _id:book._id,
     bookName:book.bookName,
   
     totalCustomerPurchase,
     totalAmountGenerate
      }

      return bookDataWithStats;
     })
resp.status(200).json({
  success:true,
  courses:bookData
})

  }catch(error){
      console.log(error);
      resp.status(500).json({
          message:"Internal server error"
      })
  }
}

exports.instructorStats=async (req,resp)=>{
  try{
const orderdetails=await Paymentinfo.find({});
const users=await User.find({accountType:"Customer"});
const books=await Books.find({});
console.log(users)

let totalorders=0;
let totalsale=0;
for(let val of orderdetails){
totalorders+=1;
totalsale+=val.amount;

}

let totalusers=0;
for(let val of users){
  totalusers+=1;
}

let totalbooks=0;
for(let val of books){
  totalbooks+=1;
}

return resp.status(200).json({
  success:true,
  data:{
    totalorders,
    totalsale,
    totalusers,
    totalbooks
  }
})
  }catch(error){

  }
}