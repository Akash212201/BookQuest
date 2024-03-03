const mongoose=require("mongoose");

const addressSchema=new mongoose.Schema({
    address:{
        type:String,
    },
    country:{
        type:String,

    },
    state:{
        type:String,
        trim:true
    },
    pinCode:{
        type:Number,
        trim:true
    }
});

module.exports=mongoose.model("Address",addressSchema);