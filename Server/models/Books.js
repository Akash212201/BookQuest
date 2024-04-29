const mongoose=require("mongoose");
const bookSchema=new mongoose.Schema({
    bookName:{
        type:String,
        required:true,
        trim:true
    },
    bookAuthor:{
        type:String,
        required:true,
    },
    bookSummary:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    bookStock:{
        type:Number,
        default:1,
      
    },
    adminUser:{
        type:mongoose.Types.ObjectId,
        ref:"User"

    },
    ratingAndReviews:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"RatingAndReviews"
    }],
    thumbnail:{
        type:String,
       
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    customerPurchased:[{
     type:mongoose.Schema.Types.ObjectId,
     ref:"User"   
    }],
    status:{
        type:String,
        default:"Draft",
        enum:["Draft","Published"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    noOfPages:{
        type:Number
    },
    pdfUrl:{
        type:String
    }



})

module.exports=mongoose.model("Books",bookSchema);