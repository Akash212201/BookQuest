import { useState } from "react";
import { apiconnector } from "../apioperator";
import { category } from "../apis"
import { toast } from 'react-toastify';
import {books} from "../apis"

const {HOMEPAGE_BOOKS}=category;
const {SHOW_ALL_BOOKS,SHOW_BOOK_DETAILS}=books;
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
            toast.error("failed to show books");
        }

    
}

export const showallbooks = async () => {

   
    let result=[];
            try {
            console.log("mark")
                const response = await apiconnector("GET", SHOW_ALL_BOOKS,null)
                console.log("All books", response);
                if (!response.data.success) {
                    throw new Error(response.data.message);
                }
                result=response.data;
                console.log("result",result)
    
                return result;
            
    
            } catch (error) {
                console.log(error);
                toast.error("failed to show all books");
            }
    
        
    }

    export const showbookdetails = async (bookid) => {

   console.log("bookid in action",bookid)
        let result={};
                try {
                console.log("mark")
                    const response = await apiconnector("POST",SHOW_BOOK_DETAILS,{bookid})
                    console.log("show book", response);
                    if (!response.data.success) {
                        throw new Error(response.data.message);
                    }
                    result=response.data;
                    console.log("result",result)
        
                    return result;
                
        
                } catch (error) {
                    console.log(error);
                    toast.error("failed to show bookdetails");
                }
            }