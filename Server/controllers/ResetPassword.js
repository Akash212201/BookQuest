const User = require("../models/User");
const crypto = require("crypto");
const mailSender = require("../utils/mailSender");
const ResetPassword = require("../Mail/Templates/ResetPassword");
const bcrypt = require("bcrypt");

exports.resetPasswordToken = async (req, resp) => {
  try {
    const { email } = req.body;

    const userdetails = await User.findOne({ email: email });
    if (!userdetails) {
      resp.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    const newtoken = crypto.randomUUID();

    const updateuser = await User.findOneAndUpdate(
      { email: email },
      {
        token: newtoken,
        resetPasswordExpires: Date.now() + 5 * 60 * 60 * 1000, //5hr
      },
      { new: true }
    );
    console.log(updateuser);
    // console.log("new token",newtoken)

    // const url = process.env.APP_URL + `/update-password/${newtoken}`;
    const url=`https://bookquest-five.vercel.app/update-password/${newtoken}`
    await mailSender(
      email,
      "password Update Link",
      ResetPassword(url)
    );
    resp.status(200).json({
      success: true,
      message: "Email send successfully",
    });
  } catch (error) {
    return resp.status(500).json({
      success: false,
      message: "Something went wrong!!!",
    });
  }
};

exports.resetPassword = async (req, resp) => {
  try {
    const { password, confirmPassword, token } = req.body;
    if (password != confirmPassword) {
      return resp.status(500).json({
        success: false,
        message: "Password not match",
      });
    }

    const userdetails = await User.findOne({ token: token });
    console.log(userdetails)
    if (!userdetails) {
      return resp.status(400).json({
        success: false,
        message: "Invalid Token",

      });
    }
    if (Date.now() > userdetails.resetPasswordExpires) {
        return resp.status(400).json({
            success: false,
            message: "token expires",
        });
    }
    console.log("mark2")

    const hashpassword = await bcrypt.hash(password, 10);
    console.log(hashpassword)

    const updateuser = await User.findOneAndUpdate(
      { token: token },
      {
        password: hashpassword,
      },
      { new: true }
    );

    return resp.status(200).json({
        success:true,
        message:"Password Reset Successfully!!!"
    })
  } catch (error) {
   return resp.status(500).json({
        success:false,
        message:"Something went wrong!!!"
    })
  }
};
