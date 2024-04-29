const {instance}=require("../config/Razorpay");
const User=require("../models/User");
const Book=require("../models/Books")
const {Bookpurchase}=require("../Mail/Templates/Bookpurchase")
const mailSender=require("../utils/mailSender");
const { response } = require("express");
const crypto = require("crypto")
const { mongoose } = require("mongoose");
const { paymentSuccessEmail } = require("../Mail/Templates/paymentSuccessEmail");
const Paymentinfo = require("../models/Paymentinfo");
const Books = require("../models/Books");
// capture the payment and initiate the razorpay
exports.capturepayment=async (req,resp)=>{
    const {books}=req.body;
    const userid=req.user.id;
    if(books.length===0){
        return resp.json({
            success:false,
            message:"No Book id is found"
        })
    }
    let total_amount=0;
    for(const bookid of books){
        try{
           
            const book=await Book.findById(bookid)
      
            if(!book){
                return resp.status(200).json({
                    success:false,
                    message:"could not found the book"
                })
            }

            
            const uid=new mongoose.Types.ObjectId(userid)
            console.log("uid",uid);
            console.log("already",book.customerPurchased.includes(uid));
            if(book.customerPurchased.includes(uid)){
                return resp.status(200).json({
                    success:false,
                    message:"Customer is already Purchased the Book"
                })
            }
         
            total_amount+=book.price

        }
        catch(error){
            console.log(error)
            return resp.status(500).json({
                success:false,
                message:"error occured"
            })

        }
    }
    const options={
        amount:total_amount*100,
        currency:"INR",
        receipt:Math.random(Date.now()).toString(),
    }

    try{
        //Initiate the payment using razorpay
        const paymentResponse=await instance.orders.create(options);
        console.log("Payment Response",paymentResponse);
        resp.status(200).json({
            success:true,
            data:paymentResponse
        })


    }catch(error){
        console.log(error);
        resp.status(500).json({
            success:false,
            message:"could not initiate order"
        })

    }

}





// verify the payment
exports.verifysignature=async (req,resp)=>{
    console.log("verify");
    const razorpay_order_id=req.body.razorpay_order_id
    console.log(razorpay_order_id);
    const razorpay_payment_id=req.body.razorpay_payment_id
    console.log(razorpay_payment_id);
    const razorpay_signature=req.body.razorpay_signature
    console.log(razorpay_signature);
    const books=req.body.books
console.log(books);
    const userid=req.user.id;
    console.log(userid);
    if(!razorpay_order_id|| !razorpay_payment_id||
        !razorpay_signature || !books||
        !userid){
            return resp.status(200).json({
                success:false,
                message:"Payment Failed"
            })
        }
    // make the body 
    let body=razorpay_order_id + "|" + razorpay_payment_id;
console.log("body",body);
    // expected signature
    const expectedsignature=crypto.createHmac("sha256",process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

    console.log("expected sign",expectedsignature);
    console.log("razorpay sign",razorpay_signature);

    if(expectedsignature === razorpay_signature){
        await customerPurchase(books,userid,resp)
        return resp.status(200).json({
            success:true,
            message:"Payment verified"
        })
    }
    return resp.status(200).json({
        success:false,
        message:"payment failed"
    })

}
//send payment success email
exports.sendPaymentSuccessEmail=async(req,resp)=>{
    const {orderid,paymentid,amount}=req.body;
    console.log(orderid)
    const books=req.body.books;
    
   console.log(books)
   console.log("order",orderid)
    const userid=req.user.id;
    
    if(!userid||!orderid||!paymentid||!amount){
        return resp.status(400).json({
            success:false,
            message:"please provide details"
        })
    }
    try{
 const customerPurchase=await User.findById(userid)
 console.log("Purchase",customerPurchase);



for(const bookid of books){
    const bookinfo=await Books.findById(bookid);

    const response=await Paymentinfo.create({
        orderId:orderid,
        paymentId:paymentid,
        amount:amount/100,
        userId:userid,
        bookName:bookinfo.bookName,
        thumbnail:bookinfo.thumbnail
        
        
        
     })
}



try {
    const mailresponse = await mailSender(customerPurchase.email, "Payment Recieved", paymentSuccessEmail(customerPurchase.firstName, amount / 100, orderid, paymentid));
    console.log("mail", mailresponse);
  } catch (error) {
    console.error("Error sending email:", error);
    return resp.status(400).json({
      success: false,
      message: "Could not send email",
    });
  }
    }catch(error){
        console.log("error in sending mail")
        return resp.status(400).json({
            success:false,
            message:"could not send mail"
        })
    }

}



const customerPurchase=async(books,userid,resp)=>{
    if(!books || !userid){
        return resp.status(400).json({
            success:false,
            message:"please provide details"
        })
    }

/**findOneAndUpdate--> The first document that matches the query will be updated.
 * 
 * findByIdandUpdate--> provide the _id of the document
 *  you want to update, and it will find and update that specific document.
 */

     for(const bookid of books){
        try{
            
            const customerBook=await Book.findOneAndUpdate(
                {_id:bookid},
                {$push:{customerPurchased:userid}},
               
                {new:true}
            )

            if(!customerBook){
                return resp.status(400).json({
                    success:false,
                    message:"book not found"
                })
            }


        const customer=await User.findByIdAndUpdate(
            userid,
            {
                $push:{
                    eBooks:bookid,
                }
            },
            {new:true}

        )
        console.log("customer purchase",customer)
        
        const emailresponse=await mailSender(
            customer.email,
            `Successfully Enrolled into ${customerBook.bookName}`,
            Bookpurchase(
                customerBook.bookName,
                `${customer.firstName} ${customer.lastName}`
            )
        )
console.log("Email sent Successfully",emailresponse)


        }catch(error){
            console.log(error)
            return resp.status(400).json({
                success:false,
                message:"error occured!!!!"
            })
        }
     }
} 

