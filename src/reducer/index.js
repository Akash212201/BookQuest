import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../Slices/authslice"
import cartSlice from "../Slices/cartSlice";


const rootReducer=combineReducers({
    auth:authSlice,
    cart:cartSlice, 
})

export default rootReducer;