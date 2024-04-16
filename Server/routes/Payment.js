const express=require("express");
const router=express.Router();

const {capturepayment,sendPaymentSuccessEmail, verifysignature}=require("../controllers/Payment");


const {auth,isCustomer}=require("../middlewares/auth");

router.post("/capturePayment",auth,isCustomer,capturepayment);
router.post("/verifySignature",auth,isCustomer,verifysignature);
router.post("/sendPaymentSuccessEmail",auth,isCustomer,sendPaymentSuccessEmail)


module.exports=router;