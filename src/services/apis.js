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
    HOMEPAGE_BOOKS:BASE_URL+"/user/groupCategory",
    CATEGORY_PAGE_ID:BASE_URL+"/user/groupcategoryid",
    GROUP_CATEGORY_SORT:BASE_URL+'/user/groupcategorysort',
    GET_CATEGORY:BASE_URL+"/user/getCategories",
    GET_CATEGORY_ID:BASE_URL+"/user/getCategory",
    CREATE_CATEGORY:BASE_URL+"/user/createCategory",
    CATEGORY_PAGE:BASE_URL+"/user/categoryPageDetails",

}

export const books={
SHOW_ALL_BOOKS:BASE_URL+"/books/showAllBooks",
SHOW_BOOK_DETAILS:BASE_URL+"/books/showBookDetails",
ADD_NEW_BOOK:BASE_URL+"/books/createBook",
DELETE_BOOK:BASE_URL+"/books/deleteBook",
REQ_BOOK:BASE_URL+"/books/reqBook"
}

// STUDENTS ENDPOINTS
export const customerEndpoints = {
     BOOK_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    BOOK_VERIFY_API: BASE_URL + "/payment/verifySignature",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
  };


export const orderEndPoints = {
    GET_ORDERS:BASE_URL+"/user/allorders",
    GET_USERS:BASE_URL+"/user/getallusers",
    ALL_PURCHASED_BOOKS:BASE_URL+"/user/allPurchasedBooks"
}

export const userprofile = {
    UPDATE_PROFILE:BASE_URL+"/user/updateProfile",
    UPDATE_IMAGE:BASE_URL+"/user/updateImage"
}