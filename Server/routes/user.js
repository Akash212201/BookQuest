const express=require("express")
const router=express.Router();

const {login,signup,sendOtp,changepassword}=require("../controllers/Auth")
const {contactus}=require("../controllers/contactus")
const {resetPassword ,resetPasswordToken}=require("../controllers/ResetPassword")
const {getCategories,groupcategory,groupcategoryid,groupcategorysort,createCategory,getCategory,categoryPageDetails}=require("../controllers/category")
const {auth,isCustomer,isAdmin}=require("../middlewares/auth")
const {updateProfile,deleteProfile,getPurchasedBooks,updateDisplayPicture,getAllUserDetails,getorders,getallusers}=require("../controllers/profile")
router.post("/login",login);
router.post("/signup",signup);
router.post("/sendotp",sendOtp);
router.post("/changePassword",auth,changepassword)
//route for getting all categories

router.get("/getCategories",getCategories);
router.get("/getCategory",getCategory);
router.post("/createCategory",createCategory);
router.get("/groupCategory",groupcategory)
router.post("/groupcategoryid",groupcategoryid)
router.post("/groupcategorysort",groupcategorysort)
router.post("/categoryPageDetails",categoryPageDetails)
// contact us
router.post("/contactUs",contactus);

// reset password
router.post("/resetPasswordToken",resetPasswordToken);
router.post('/resetPassword', resetPassword)

//update profile
router.post("/updateProfile",auth,updateProfile)
router.get("/deleteProfile",auth,deleteProfile);
router.get("/getUserDetails",auth,getAllUserDetails)
router.post("/updateImage",auth,updateDisplayPicture)
router.get("/allorders",getorders);
router.get("/getallusers",getallusers);



// for customers
router.get("/allPurchasedBooks",auth,isCustomer,getPurchasedBooks);

module.exports=router;