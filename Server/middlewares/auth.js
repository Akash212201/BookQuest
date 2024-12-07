const User = require("../models/User");
const jwt = require("jsonwebtoken");
// auth
exports.auth = async (req, resp, next) => {
    console.log("a");
    try {
        // fetch the token from the req body

        console.log("C")

        const token = req.body.token  || req.header("Authorization").replace("Bearer ", "");
        console.log("token11",token);
        // if token is missing then return the response
        if (token==="null") {
            return resp.status(402).json({
                success: false,
                message: "Customer is not Login ! Please Login "
            })
        }

        console.log("d");
        // verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("decode", decode);
            req.user = decode;
            console.log("b");
        } catch (error) {
            // verification issue
            return resp.status(402).json({
                success: false,
                message: "token is invalid"
            })
        }
        console.log("c");
        next();


    } catch (error) {
        return resp.status(402).json({
            success: false,
            message: "something went wrong while validation"
        })

    }

}
// isCustomer
exports.isCustomer = async (req, resp, next) => {
    try {
      
        const userdetails = await User.findOne({ email: req.user.email })
        if (userdetails.accountType !== "Customer") {
            return resp.status(400).json({
                success: false,
                message: "this is the protected route of Customer"
            })
        }
        next();
    } catch (error) {
        return resp.status(402).json({
            success: false,
            message: "User role is not verified ,Please try again"
        })
    }
}

// isAdmin
exports.isAdmin = async (req, resp, next) => {
    try {
        const userdetails = await User.findOne({ email: req.user.email })
        if (userdetails.accountType !== "Admin") {
            return resp.status(400).json({
                success: false,
                message: "this is the protected route of admin"
            })
        }

        next();

    } catch (error) {
        return resp.status(402).json({
            success: false,
            message: "User role is not verified ,Please try again"
        })
    }
}

