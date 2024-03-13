import { useState } from "react";
import { apiconnector } from "../apioperator";
import { category } from "../apis"
import { toast } from 'react-toastify';


const {HOMEPAGE_BOOKS}=category;
export const groupCategory = async () => {

   
let result=[];
        try {
        
            const response = await apiconnector("GET", HOMEPAGE_BOOKS,null)
            console.log("booksresponse", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            result=response.data;
            console.log("result",result)

            return result;
        

        } catch (error) {
            console.log(error);
            toast.error("failed to update password");
        }

    
}