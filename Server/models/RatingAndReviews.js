const mongoose=require("mongoose");

const ratingandreviewschema=new mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
},
rating:{
    type:Number
},
review:{
    type:String,
    required:true
},
eBook:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Book",
    required:true
}
   
});

module.exports=mongoose.model("RatingAndReviews",ratingandreviewschema);