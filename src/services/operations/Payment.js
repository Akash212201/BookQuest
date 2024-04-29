import { toast } from "react-toastify"
import { apiconnector } from "../apioperator"
import { customerEndpoints } from "../apis"

const {
    BOOK_PAYMENT_API,
    BOOK_VERIFY_API,
    SEND_PAYMENT_SUCCESS_EMAIL_API,
  } = customerEndpoints;

  //Load the Razorpay SDK from the CDN
  function loadScript(src){
    return new Promise((resolve)=>{
        const script=document.createElement("script")
        script.src=src;
        script.onload=()=>{
            resolve(true)
        }
        script.onerror=()=>{
            resolve(false)
        }
        document.body.appendChild(script)
    })
  }

 
  export async function BuyBook(
token,
books,
user_details,
navigate,
dispatch
  ){
    console.log(token)
    console.log(books)
    console.log(user_details)
    console.log(user_details?.firstName)
const toastid=toast.loading("Loading...")

try{
// Load the script of Razorpay Sdk
const resp=await loadScript("https://checkout.razorpay.com/v1/checkout.js")
console.log(resp);
if(!resp){
    toast.error(
        "Razorpay SDK failed to load.Check Your Internet Connection"
    )
    return ;
}
// Initiate the order in Backend
const orderResponse=await apiconnector("POST",BOOK_PAYMENT_API,{
    books
},{
    Authorization:`Bearer ${token}`
});

if(!orderResponse.data.success){
    throw new Error(orderResponse.data.message)
    
}
console.log("payment response",orderResponse.data);
             

// opening the razorpay sdk

const options={
    key:"rzp_test_v9cBsqDqUXzY8t",
    currency:orderResponse.data.data.currency,
    amount:orderResponse.data.data.amount,
    order_id:orderResponse.data.data.id,
    name:"BookQuest",
    description:"Thankyou for the Purchasing the Book ",
    
    // prefill:{
    //     name:`${user_details.firstName} ${user_details.lastName}`,
       
    // },
   
    handler: function (response){
       
        sendPaymentSuccessEmail(
            {...response,books},
            orderResponse.data.data.amount,
            
            token
            );
            verifyPayment({...response,books},token,navigate,dispatch);
            
            
            
        }
        
    };
    console.log("a")

    const paymentObject=new window.Razorpay(options);
    paymentObject.open();

    
}catch(error){
    console.log("payment api error",error);
    toast.error(error.response.data.message);
}
toast.dismiss(toastid)

}

console.log("a")

async function verifyPayment(bodydata,token,navigate,dispatch){
    console.log("a")
    console.log("bodydata",bodydata);
    const toastid=toast.loading("Verifying Payment");
 
    try{
        const response=await apiconnector("POST",BOOK_VERIFY_API,bodydata,{
            
            Authorization:`Bearer ${token}`});
            console.log("verifying payment response",response)
            console.log(response.data.success)
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("payment successfull.")
            console.log("payment succ") 
            // navigate("/dashboard/enrolled-courses");
            
            // dispatch(resetcart())
            
            
   }catch(error){
console.log("payment verify error ",error);
toast.error("could not verify payment");
   } 
   toast.dismiss(toastid);
//    dispatch(setpaymentLoading(false))
  }

  
  async function sendPaymentSuccessEmail(bookdata,amount,token){
    console.log("payment",bookdata);
   
    try{
await apiconnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
    orderid:bookdata.razorpay_order_id,
    paymentid: bookdata.razorpay_payment_id,
    books:bookdata.books,
    amount
},{
    Authorization:`Bearer ${token}`
})
    }catch(error){
console.log("payment success email errror",error)

    }
  }