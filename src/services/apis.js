const BASE_URL = process.env.REACT_APP_BASE_URL

export const auth = {
    RESETPASSWORDTOKEN_API: BASE_URL + "/user/resetPasswordToken",
    RESETPASSWORD_API: BASE_URL + "/user/resetPassword",
    UPDATEPASSWORD_API: BASE_URL + "/user/changePassword",
    SENDOTP_API: BASE_URL + "/user/sendotp",
    SIGNUP_API: BASE_URL + "/user/signup",
    LOGIN_API: BASE_URL + "/user/login"
}

export const setting = {

    CHANGEPASSWORD: BASE_URL + "/user/changePassword"
}

export const contact = {
    CONTACT_DETAILS: BASE_URL + "/contact"
}

export const category={
    HOMEPAGE_BOOKS:BASE_URL+"/user/groupCategory"
}

