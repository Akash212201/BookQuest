import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BsArrowLeftShort } from "react-icons/bs"
import { getresetpassword } from '../services/operations/authapi';
const UpdatePassword = () => {
    const [formdata, setformdata] = useState({ password: "", confirmPassword: "" });
    // const {loading}=useSelector((state)=> state.auth);
    const dispatch = useDispatch();

    const location = useLocation();
    const { password, confirmPassword } = formdata;

    function changehandler(e) {
        e.preventDefault();
        return setformdata((prev) => (
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ))
    }

    function submithandler(e) {
        e.preventDefault();
        const token = location.pathname.split("/").at(-1);
        dispatch(getresetpassword(password, confirmPassword, token));
    }
    return (
        <div className="template flex justify-center items-center h-[90vh]">
            <div className="py-8 lg:px-10 px-6 w-[380px] lg:w-[30%] shadow-[0, 3px ,101px ,rgba(0,0,0,0.10)] bg-white rounded-lg">
                <h1 className="lg:text-4xl text-2xl mt-5 mb-1 text-center">Create New Password</h1>
                <p className="text-center">Create your new password and you are all set.</p>
                <form onSubmit={submithandler} className="my-10">
                    <label>
                        <p className="text-xl mt-2">New Password<sup>*</sup></p>
                        <input type="text" name="password"
                            value={password}
                            onChange={changehandler}
                            className="text-black border w-full py-2 px-3 text-lg rounded-xl my-3 outline-none" />
                    </label>
                    <label>
                        <p className="text-xl mt-2">Confirm New Password<sup>*</sup></p>
                        <input type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={changehandler}
                            className="text-black border w-full py-2 px-3 text-lg rounded-xl my-3 outline-none">
                        </input>
                    </label>

                    <button type='submit'
                        className="border w-full py-2 px-3 text-lg rounded-xl bg-[#dbddf9]">
                        Update Password
                    </button>
                </form>

                <Link to="/login"
                    className="flex justify-start items-center text-[#ff0056]">
                    <BsArrowLeftShort className="mr-2 text-2xl" />
                    Back to login
                </Link>

            </div>
        </div>
    )
}

export default UpdatePassword
