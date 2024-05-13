import { apiconnector } from "../apioperator";
import { category } from "../apis";
import { toast } from "react-toastify";
import { books } from "../apis";
import { orderEndPoints } from "../apis";
// import { database } from "../../../Server/config/database";

const { HOMEPAGE_BOOKS ,CATEGORY_PAGE_ID,CREATE_CATEGORY, GROUP_CATEGORY_SORT, GET_CATEGORY,GET_CATEGORY_ID,CATEGORY_PAGE} = category;
const { SHOW_ALL_BOOKS,DELETE_BOOK, SHOW_BOOK_DETAILS,ADD_NEW_BOOK,REQ_BOOK ,EDIT_BOOK,RATING_REVIEWS,GETRATING} = books;
const { GET_ORDERS,GET_USERS, ALL_PURCHASED_BOOKS,DASHBOARD_STATS,DASHBOARD_PIECHART,DASHBOARD_BARCHART,DASHBOARD_LINECHART}=orderEndPoints;
export const groupCategory = async () => {
  let result = [];
  try {
    const response = await apiconnector("GET", HOMEPAGE_BOOKS, null);
    // console.log("booksresponse", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
    // console.log("result", result);

    return result;
  } catch (error) {
    console.log(error);
   
  }
};

export const groupCategoryid = async (data) => {
  let result = [];
  try {
    const response = await apiconnector("POST",  CATEGORY_PAGE_ID, data);
    // console.log("booksresponse", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
    // console.log("result", result);

    return result;
  } catch (error) {
    console.log(error);
    toast.error("failed to show books");
  }
};

export const groupCategorysort = async (data) => {
  let result = [];
  try {
    const response = await apiconnector("POST",  GROUP_CATEGORY_SORT, data);
    // console.log("booksresponse", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
    // console.log("result", result);

    return result;
  } catch (error) {
    console.log(error);
    toast.error("failed to show books");
  }
};

export const getcategory = async () => {
  let result = [];
  try {
    
    const response = await apiconnector("GET", GET_CATEGORY_ID, null);
    // console.log("show book", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
    // console.log("result", result);

    return result;
  } catch (error) {
     console.log(error);
    toast.error("failed to show categories");
  }
};

export const showallbooks = async () => {
  let result = [];
  try {
    
    const response = await apiconnector("GET", SHOW_ALL_BOOKS, null);
    // console.log("All books", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
    // console.log("result", result);

    return result;
  } catch (error) {
    console.log(error);
    toast.error("failed to show all books");
  }
};

export const showbookdetails = async (bookid) => {
  // console.log("bookid in action", bookid);
  let result = {};
  try {
    
    const response = await apiconnector("POST", SHOW_BOOK_DETAILS, { bookid });
   // console.log("show book", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
    console.log(response.data)
   // console.log("result", result);

    return result;
  } catch (error) {
    console.log(error);
    toast.error("failed to show bookdetails");
  }
};


export const viewbookdetails = async (bookid,token) => {
 // console.log("bookid in action", bookid);
  let result = {};
  try {
    
    const response = await apiconnector("POST", SHOW_BOOK_DETAILS, { bookid },{
      Authorization: `Bearer ${token}`
    });
   // console.log("show book", response);
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
  // console.log("bookid in action", data);
  let result=null;
  const toastId = toast.loading("Loading...");

  try {
    

    const response = await apiconnector("POST", ADD_NEW_BOOK, data,{
        Authorization: `Bearer ${token}`
    } );
   // console.log("show book", response);
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


export const editbook = async (formData,token,navigate) => {
  // console.log("bookid in action", formData);
  let result=null;
  const toastId = toast.loading("Loading...");

  try {
    

    const response = await apiconnector("POST", EDIT_BOOK, formData,{
        Authorization: `Bearer ${token}`
    } );
    // console.log("show book", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
    // console.log("result", result);
    toast.success("Book Updated Successfully")
    navigate("/admin/dashboard/books")
    
  } catch (error) {
    console.log(error);
    toast.error("failed to update books");
  }
  toast.dismiss(toastId);
  
  return result;

};
export const getcategories = async () => {
    let result = [];
    try {
      
      const response = await apiconnector("GET", GET_CATEGORY, null);
      // console.log("show book", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      result = response.data;
      // console.log("result", result);
  
      return result;
    } catch (error) {
      console.log(error);
      toast.error("failed to show categories");
    }
  };

  export const createcategory = async (data) => {
    try {
      
      // console.log(data)
      const response = await apiconnector("POST", CREATE_CATEGORY, data);
      // console.log("show book", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Successfully create Category ");
      // console.log("result", result);
return ;  

    } catch (error) {
      console.log(error);
      toast.error("failed to create categories");
    }
  };

  export const deletebook = async (data,token) => {
 
    try {
      
      // console.log(data)
      // console.log(token)
      const response = await apiconnector("POST", DELETE_BOOK, data,{
        Authorization: `Bearer ${token}`});
      // console.log("show book", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
    toast.success("Successfully delete book ");
      // console.log("result", result);

      return ;
    } catch (error) {
      // console.log(error);
      toast.error("failed in Deleting a Book");
    }
  };

  export const allorders = async () => {
    let result = [];
    try {
      
      const response = await apiconnector("GET", GET_ORDERS, null);
      // console.log("show book", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      result = response.data;
      // console.log("result", result);
  
      return result;
    } catch (error) {
      console.log(error);
      toast.error("failed to show orders");
    }
  };

  export const allusers = async () => {
    let result = [];
    try {
      
      const response = await apiconnector("GET", GET_USERS, null);
      // console.log("show book", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      result = response.data;
      // console.log("result", result);
  
      return result;
    } catch (error) {
      console.log(error);
      toast.error("failed to show Users");
    }
  };


  
export const reqBook = async (data) => {

  try {
    
    const response = await apiconnector("POST", REQ_BOOK, data);
    // console.log("All books", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
   toast.success("Req Book Added Successfully !!!")
  } catch (error) {
    console.log(error);
    toast.error("failed to show req books");
  }
};


export const categoryPage = async (data) => {
  let result = [];
  try {
    const response = await apiconnector("POST", CATEGORY_PAGE, data);
    // console.log("booksresponse", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
    // console.log("result", result);

    return result;
  } catch (error) {
    console.log(error);
    
  }
};

export const allpurchasedorders = async (token) => {
  let result = [];
  
  try {
    
    const response = await apiconnector("GET", ALL_PURCHASED_BOOKS, null,{
      Authorization: `Bearer ${token}`
    });
    // console.log("show Purchased books", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
   
    // console.log("result", result);

    return result;
  } catch (error) {
    console.log(error);
    toast.error("failed to show orders");
  }
  
};



export const dashboardstats = async (token) => {
  let result = {};
  try {
    
    const response = await apiconnector("GET",DASHBOARD_STATS, null,{
      Authorization: `Bearer ${token}`
    });
    // console.log("show Dashboard stats", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
    // console.log("result", result);

    return result;
  } catch (error) {
    console.log(error);
    toast.error("failed to show dashboard stats");
  }
};

export const dashboardpiechart = async (token) => {
  let result = {};
  try {
    
    const response = await apiconnector("GET",DASHBOARD_PIECHART, null,{
      Authorization: `Bearer ${token}`
    });
    // console.log("show Dashboard stats", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
    // console.log("result", result);

    return result;
  } catch (error) {
    console.log(error);
    toast.error("failed to show dashboard pie chart stats");
  }
};

export const dashboardlinechart = async (token) => {
  let result = {};
  try {
    // 
    const response = await apiconnector("GET",DASHBOARD_LINECHART, null,{
      Authorization: `Bearer ${token}`
    });
    // console.log("show Dashboard stats", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
    // console.log("result", result);

    return result;
  } catch (error) {
    console.log(error);
    toast.error("failed to show dashboard line chart stats");
  }
};

export const dashboardbarchart = async (token) => {
  let result = {};
  try {
    
    const response = await apiconnector("GET",DASHBOARD_BARCHART, null,{
      Authorization: `Bearer ${token}`
    });
    // console.log("show Dashboard stats", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
    // console.log("result", result);

    return result;
  } catch (error) {
    console.log(error);
    toast.error("failed to show dashboard bar chart stats");
  }
};


export const ratingAndReviews = async (bookid,rating,review,token) => {
  // console.log("bookid in action", bookid);
   
   try {
     
     const response = await apiconnector("POST", RATING_REVIEWS, { bookid ,rating ,review},{
       Authorization: `Bearer ${token}`
     });
    // console.log("show book", response);
     if (!response.data.success) {
       throw new Error(response.data.message);
     }
    //  result = response.data;
    // console.log("result", result);
 toast.success("Successfully Rating And Review")
    //  return result;
   } catch (error) {
     console.log(error);
     toast.error(error.response.data.message);
   }
 };

 export const getRating = async (bookid) => {
  let result = [];
  try {
    const response = await apiconnector("GET", GETRATING, bookid);
    // console.log("booksresponse", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.averageRating;
    // console.log("result", result);

    return result;
  } catch (error) {
    console.log(error);
   
  }
};


// new temp
export const dashboardbarchart2 = async (token) => {
  let result = {};
  try {
    
    const response = await apiconnector("GET",DASHBOARD_BARCHART, null,{
      Authorization: `Bearer ${token}`
    });
    // console.log("show Dashboard stats", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
    // console.log("result", result);

    return result;
  } catch (error) {
    console.log(error);
    toast.error("failed to show dashboard bar chart2 stats");
  }
};
