import { setloading } from "../../Slices/Profile";
import { apiconnector } from "../apioperator";
import { setting } from "../apis";
import { toast } from 'react-toastify';

const {
    CHANGEPASSWORD } = setting;
export const changepassword = (formdata, token) => {
    return async (dispatch) => {

        try {
            dispatch(setloading(true));
            const response = await apiconnector("POST", CHANGEPASSWORD, formdata, {
                Authorisation: `Bearer ${token}`
            })
            console.log("profileresponse", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("update password successfully");
            dispatch(setloading(false));

        } catch (error) {
            console.log(error);
            toast.error("failed to update password");
        }

    }
}