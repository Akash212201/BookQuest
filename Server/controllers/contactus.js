const Contact = require("../models/Contact");

exports.contactus=async (req,resp)=>{
try{
const {name,email,phoneNo,message}=req.body;
if(!name || !email ||!phoneNo || !message){
    resp.status(400).json({
        success:false,
        message:"Please provide all the details"
    })
}
// save the details in contact model
const contactdetails=await Contact.create({
    name,email,phoneNo,message
})
resp.status(201).json({
    success:true,
    data:contactdetails
});


}catch(error){
resp.status(400)
    .json({
        success:false,
      error:error 
      });
}}
