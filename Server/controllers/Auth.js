const Address = require("../models/Address");
const Otp = require("../models/Otp");
const User = require("../models/User");
const otpgenerator = require("otp-generator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const passwordUpdate = require("../Mail/Templates/passwordUpdated");

exports.sendOtp = async (req, resp) => {
  try {
    // fetch email from the request body
    console.log("sendooootp")
    const { email } = req.body;
    console.log(email)
    // check user is already exists


    const checkuser = await User.findOne({ email: email });
    //to be used in case of signup

    // if user already exists then return the response
    if (checkuser) {
      return resp.status(402).json({
        success: false,
        message: "user is already exists"
      })
    }

    // generate otp
    var otp = otpgenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false
    });

    // check unique otp or not

    // This mechanism seems to ensure that each OTP used is unique within the context of the database.

    const result = await Otp.findOne({ otp: otp });
    console.log("OTP", otp);
    console.log("Result", result);
    while (result) {
      otp = otpgenerator.generate(6, {
        upperCaseAlphabets: false,

      });

    }

    // create entry for otp
    const otpbody = await Otp.create({ email, otp });
    console.log(otpbody._id);

    // return response successfull
    resp.status(200).json({
      success: true,
      message: "Otp send successfully",
      otp
    })

  } catch (error) {
    return resp.status(400).json({
      success: false,
      message: "Otp send failed",

    })
  }

}



// sign up
exports.signup = async (req, resp) => {
  try {
    // data fetch from the request body
    const { firstName, lastName, email
      , password, confirmPassword,
      accountType, otp
    } = req.body;
    console.log(firstName)

// perform validation
    if (!firstName || !email || !password || !confirmPassword || !otp) {
      return resp.status(402).json({
        success: false,
        message: "required details missing"
      })
    }

    // password match confirm and password
    if (password !== confirmPassword) {
      return resp.status(402).json({
        success: false,
        message: "password not match with confirm password"
      })
    }
    // check user already exists or not
    const checkemail = await User.findOne({ email });

    if (checkemail) {
      return resp.status(402).json({
        success: false,
        message: "user is already exists"
      })
    }

    const recentotp = await Otp.find({ email: email }).sort({ createDate: -1 }).limit(1);
    console.log(recentotp);
    // validate otp
    if (recentotp.length == 0) {
      return resp.status(402).json({
        success: false,
        message: "Otp not found"
      })
    } else if (otp !== recentotp[0].otp) {
      return resp.status(402).json({
        success: false,
        message: "Invalid otp"
      })
    }
    //else  it means otp is correct
    // hash password

    const hashpassword = await bcrypt.hash(password, 10);





    // create entry in the database

    const addressdetails = await Address.create({
      address: null,
      country: null,
      state: null,
      pinCode: null
    });


    const userdata = await User.create({
      firstName, lastName, email, password: hashpassword, accountType,
      addressDetails: addressdetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
    })
    console.log("user:" + userdata._id);
    // return response
    return resp.status(200).json({
      success: true,
      message: "user is registered successfully",
      userdata
    })

  }
  catch (error) {
    return resp.status(402).json({
      success: false,
      message: "user cannot be registered"
    })
  }
}

// Login
exports.login = async (req, resp) => {
  try {
    // get data from the request body
    const { email, password } = req.body;
    // validation on data
    if (!email || !password) {
      return resp.status(400).json({
        success: false,
        message: "required entries is missing"
      })
    }
    // check user is registered or not
    const checkuser = await User.findOne({ email }).populate("addressDetails");
    if (!checkuser) {
      return resp.status(400).json({
        success: false,
        message: "user is not registered ,first registered"
      })
    }

    // password matching
    if (await bcrypt.compare(password, checkuser.password)) {
      // generate token
      const payload = {
        email: checkuser.email,
        id: checkuser._id,
        accountType: checkuser.accountType
      }

      console.log("B")

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h"
      });

      checkuser.token = token;
      checkuser.password = undefined; // for privacy purpose


      const options = {
        expires: new Date(Date.now() + 3 * 60 * 60 * 1000),
        httpsOnly: true
      }


      resp.cookie("token", token, options).status(200).json({
        success: true,
        token,
        checkuser,
        message: "user is successfully login"
      })
    }
    else {
      return resp.status(401).json({
        success: false,
        message: "Password not matched ,try again"
      });
    }
  }
  catch (error) {
    return resp.status(402).json({
      success: false,
      message: "login fail ,please try again"
    })

  }
}


exports.changepassword = async (req, resp) => {
  try {
    const userdetails = await User.findById({ _id: req.user.id });
    const { oldpassword, newpassword } = req.body;
    console.log(oldpassword)

    const oldpassmatch = await bcrypt.compare(oldpassword, userdetails.password);
    console.log(oldpassmatch)

    if (!oldpassmatch) {
      return resp.status(402).json({
        success: false,
        message: "Password is incorrect"
      })
    }
    console.log("mark1")
    const encryptpass = await bcrypt.hash(newpassword, 10);
    console.log(encryptpass)
    const updateuser = await User.findByIdAndUpdate({ _id: req.user.id },
      { password: encryptpass }, { new: true });
    console.log(updateuser)

    // send mail update the password

    try {
      const sendmail = await mailSender(updateuser.email, "Password Updation",
        passwordUpdate(
          `Password updated Successfully for ${updateuser.firstName} ${updateuser.lastName}`, updateuser.email)
      )
    } catch (error) {
      return resp.status(402).json({
        success: false,
        message: "error occurred while sending mail"
      })
    }

    // send response
    return resp.status(200).json({
      success: true,
      message: "Password Updated Successfully"
    })
  } catch (error) {
    return resp.status(402).json({
      success: false,
      message: error.message
    })
  }
}


