import { useState } from "react";
import { apiconnector } from "../apioperator";
import { category } from "../apis";
import { toast } from "react-toastify";
import { books } from "../apis";

const { HOMEPAGE_BOOKS , GET_CATEGORY} = category;
const { SHOW_ALL_BOOKS, SHOW_BOOK_DETAILS,ADD_NEW_BOOK } = books;
export const groupCategory = async () => {
  let result = [];
  try {
    const response = await apiconnector("GET", HOMEPAGE_BOOKS, null);
    console.log("booksresponse", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
    console.log("result", result);

    return result;
  } catch (error) {
    console.log(error);
    toast.error("failed to show books");
  }
};

export const showallbooks = async () => {
  let result = [];
  try {
    console.log("mark");
    const response = await apiconnector("GET", SHOW_ALL_BOOKS, null);
    console.log("All books", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
    console.log("result", result);

    return result;
  } catch (error) {
    console.log(error);
    toast.error("failed to show all books");
  }
};

export const showbookdetails = async (bookid) => {
  console.log("bookid in action", bookid);
  let result = {};
  try {
    console.log("mark");
    const response = await apiconnector("POST", SHOW_BOOK_DETAILS, { bookid });
    console.log("show book", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
    console.log("result", result);

    return result;
  } catch (error) {
    console.log(error);
    toast.error("failed to show bookdetails");
  }
};

export const addnewbook = async (data,token) => {
  console.log("bookid in action", data);
  let result=null;
  const toastId = toast.loading("Loading...");

  try {
    console.log("mark");

    const response = await apiconnector("POST", ADD_NEW_BOOK, data,{
        Authorization: `Bearer ${token}`
    } );
    console.log("show book", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
    console.log("result", result);
    toast.success("Book Details Added Successfully")
    
  } catch (error) {
    console.log(error);
    toast.error("failed to add books");
  }
  toast.dismiss(toastId);
  return result;

};

export const getcategories = async () => {
    let result = [];
    try {
      console.log("mark");
      const response = await apiconnector("GET", GET_CATEGORY, null);
      console.log("show book", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      result = response.data;
      console.log("result", result);
  
      return result;
    } catch (error) {
      console.log(error);
      toast.error("failed to show categories");
    }
  };