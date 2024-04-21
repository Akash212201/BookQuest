import { apiconnector } from "../apioperator";
import { contact,userprofile } from "../apis";
import { toast } from 'react-toastify';

const { CONTACT_DETAILS } = contact;
const {UPDATE_PROFILE,UPDATE_IMAGE}=userprofile

export const createcontact = (formdata) => {
    return async (dispatch) => {

        try {
            const response = await apiconnector("POST", CONTACT_DETAILS, formdata)
            console.log("profileresponse", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("add contact details .....");

        } catch (error) {
            console.log(error);
            toast.error("failed to add contact details");
        }

    }
}

export const updateProfile = async (formdata,token) => {
   const result={};

        try {
            console.log(formdata)
            const response = await apiconnector("POST", UPDATE_PROFILE, formdata,{
                Authorization: `Bearer ${token}`})

            console.log("profileresponse", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            localStorage.removeItem("user")
            console.log(response.data.updateuser)
            localStorage.setItem("user",JSON.stringify(response.data.updateuser));
            toast.success("Update Profile Successfully .....");
            return response.data.updateuser;

        } catch (error) {
            console.log(error);
            toast.error("failed to add contact details");
        }


}

export const updateimage= async (formData,token) => {
    const result={};
 
         try {
             console.log(formData)
             const response = await apiconnector("POST", UPDATE_IMAGE, formData,{
                 Authorization: `Bearer ${token}`})
 
             console.log("profileresponse", response);
             if (!response.data.success) {
                 throw new Error(response.data.message);
             }
             localStorage.removeItem("user")
             console.log(response.data.updateuser)
             localStorage.setItem("user",JSON.stringify(response.data.updateuser));
             toast.success("Update Profile Image Successfully .....");
             return response.data.updateuser;
 
         } catch (error) {
             console.log(error);
             toast.error("failed to add contact details");
         }
 
 
 }