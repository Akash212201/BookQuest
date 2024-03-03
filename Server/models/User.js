const mongoose=require("mongoose");

const userschema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
  
    },
    accountType:{
        type:String,
        required:true,
        enum:["Admin","Customer"]
    },
    addressDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Address"
    },
    eBooks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Books"
    }],
    token:{
        type:String
    },
    resetPasswordExpires:{
        type:Date
    },
    image:{
        type:String
    }
    
})

module.exports=mongoose.model("User",userschema);