const mongoose=require("mongoose");
const reqbookSchema=new mongoose.Schema({
    bookName:{
        type:String,
        required:true,
        trim:true
    },
    bookAuthor:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    }



})

module.exports=mongoose.model("ReqBook",reqbookSchema);