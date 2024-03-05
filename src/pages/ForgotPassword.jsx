import React from 'react'
import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { BsArrowLeftShort } from "react-icons/bs"
import { Link } from 'react-router-dom';
import { getResetPasswordToken } from '../services/operations/authapi';

const ForgotPassword = () => {

  const [emailsent, setemailsent] = useState(false);
  const [email, setemail] = useState("");

  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  function submithandler(e) {
    e.preventDefault();
    console.log("a");
    dispatch(getResetPasswordToken(email, setemailsent));
  }
  return (
    <div className="h-[60vh] flex justify-center items-center bg-[#f2f2f2]">
      <div className=' text-white relative lg:h-[250px] h-[300px] lg:w-[27vw] bg-green-400 p-4 rounded-lg'>
      {
        loading ? (<div className='text-3xl flex justify-center items-center'>Loading....</div>) : (
          <div className='flex flex-col gap-4 h-full'>
            {
              emailsent ? <h1 className=' font-bold text-[1.6rem] text-center '>Check Email</h1> : <h1 className='font-bold text-4xl text-center'>Reset password</h1>

            }
            {
              emailsent ? (
                <div className='font-semibold text-richblack-100 text-[1.2rem] text-center '>
                  {`We have sent the reset email to
                  ${email}`}
                </div>
              )
                : <p className=' text-richblack-100 text-[1rem] text-center '>Enter your email and recover your account
                </p>
            }
            <form onSubmit={submithandler}>
              {
                !emailsent &&
                <label>
                  <p className='text-[1.2rem]'>Email Address<sup>*</sup></p>
                  <input className=" form-style w-full outline-none px-2 py-1 text-black" type="email" placeholder='Enter Email' name='email' value={email} onChange={(e) => setemail(e.target.value)}></input>
                </label>
              }
              <div className='flex flex-row justify-between absolute bottom-6 left-3 right-3'>

                <button type='submit ' className='mt-2'>
                  {
                    emailsent ? "Resend Email" : "Reset Password"
                  }

                </button>

                <div className='flex gap-2 items-center mt-4 px-2'>
                  <Link to="/login" className='flex justify-evenly items-center'>
                    <BsArrowLeftShort />
                  Back to login
                  </Link>

                </div>
              </div>
            </form>

          </div>
        )
      }
    </div>
    </div>
  )
}

export default ForgotPassword
