const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../Mail/Templates/emailVerification");
const getExpiryTime = require("../utils/getExpiryTime")

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true,

    },
    createDate: {
        type: Date,
        default: Date.now(),
        expires: getExpiryTime
    }
})

async function sendVerification(email, otp) {
    try {
        const resp = await mailSender(email, "Send Verification", otpTemplate(otp));
        console.log(resp);

    } catch (error) {
        console.log(error);
        throw error;
    }
}

// premiddleware
otpSchema.pre("save", async function (next) {
    await sendVerification(this.email, this.otp);
    next();
})


module.exports = mongoose.model("Otp", otpSchema);