import { apiconnector } from "../apioperator";
import {auth} from "../apis"
import { setloading ,settoken} from "../../Slices/authslice";
import {toast} from 'react-toastify';

const {RESETPASSWORDTOKEN_API,RESETPASSWORD_API,SENDOTP_API,SIGNUP_API,LOGIN_API}=auth;

export const signup=(firstName,lastName,email,accountType,password,confirmPassword,otp,navigation)=>{
        return async(dispatch)=>{
            dispatch(setloading(true));
            console.log("a");
            try{
                console.log("d");
                console.log(firstName);
                console.log(otp);
                
                const resp=await apiconnector("POST",SIGNUP_API , {firstName,lastName,email,accountType,password,confirmPassword,otp});
                console.log("b");
                console.log(resp);
                console.log("c");
            if(!resp.data.success){
            throw new Error(resp.data.message);
            
            }
            toast.success("signup successfully");
            navigation("/login");


                    
            }catch(error){
                console.log(error);
                toast.error("failed to signup");

            }
            dispatch(setloading(false));
            
        }
    }


    
export const login=(email,password,navigate)=>{
    return async(dispatch)=>{
        dispatch(setloading(true));
        console.log("a");
        
      try{
        const response=await apiconnector("POST",LOGIN_API,{email,password});
        console.log(response);
        if(!response.data.success){
            throw new Error(response.data.message);

        }
        
        dispatch(settoken(response.data.token));
        localStorage.setItem("token",JSON.stringify(response.data.token));
        localStorage.setItem("user",JSON.stringify(response.data.checkuser));
        
        toast.success("Login Successfully")

        navigate("/home");

      }catch(error){
console.log(error);
toast.error("Login failed");
      }

dispatch(setloading(false));
    }
}


export const sendotp=(email,navigate)=>{
    return async(dispatch)=>{
        dispatch(setloading(true));
        
        try{
          console.log("sendotp");
          console.log(email)
          console.log(SENDOTP_API)
        const response=await apiconnector("POST",SENDOTP_API,{email});
        console.log(response);
        if(!response.data.success){
            throw new Error(response.data.message);

        }
        toast.success("OTP Sent Successfully")
        navigate("/verify-email")

      }catch(error){
console.log(error);
toast.error("Send otp failed");
      }

dispatch(setloading(false));
    }
}

export const getResetPasswordToken=(email,setemailsent)=>{
    return async(dispatch)=>{
        dispatch(setloading(true));
        console.log("b");
        try{
            const response=await apiconnector("POST",RESETPASSWORDTOKEN_API,{email});
            console.log(response);
            if(!response.data.success){
                throw new Error(response.data.message);

            }
            setemailsent(true);

            toast.success("Reset email sent");
        }
    catch(error){
        console.log(error);
        toast.error("Failed to send email ");
    }

dispatch(setloading(false));

    }
}

export const getresetpassword=(password,confirmPassword,token)=>{
    return async(dispatch)=>{
        dispatch(setloading(true));
        try{
const response=await apiconnector("POST",RESETPASSWORD_API,{password,confirmPassword,token});
console.log(response);
if(!response.data.success){
    throw new Error(response.data.message);

}

toast.success("password reset successfully");

        }catch(error){
console.log(error);
toast.error("fail to reset password");
        }
        dispatch(setloading(false));

    }
}


export function logout(navigate) {
    return (dispatch) => {
      dispatch(settoken(null));
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/home");
      toast.success("Logged Out");
    };
  }
  

