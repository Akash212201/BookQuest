const mongoose=require("mongoose");

const categorySchema=new mongoose.Schema({
    categoryName:{
        type:String,
        required:true
    },
    categoryDesc:{
        type:String,
    },
    eBooks:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Books"
    }]
})
module.exports=mongoose.model("Category",categorySchema);