import { apiconnector } from "../apioperator";
import { contact } from "../apis";
import { toast } from 'react-toastify';

const { CONTACT_DETAILS } = contact;

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