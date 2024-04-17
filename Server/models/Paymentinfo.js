const mongoose=require("mongoose");

const paymentinfoschema=new mongoose.Schema({
paymentId:{
    type:String,
    required:true
},
orderId:{
    type:String
},
amount:{
    type:Number,
    required:true
},
userId:{
    type:String,
    
}

   
});

module.exports=mongoose.model("Paymentinfo",paymentinfoschema);