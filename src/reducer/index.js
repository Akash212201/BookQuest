import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../Slices/authslice"


const rootReducer=combineReducers({
    auth:authSlice   
})

export default rootReducer;