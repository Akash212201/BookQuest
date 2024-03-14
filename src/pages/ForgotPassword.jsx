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
    <div className="template flex justify-center items-center h-[85vh]">
      <div className='w-[380px] lg:w-[450px] rounded-[10px] bg-white px-6 py-10 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
        {
          emailsent ? <h1 className=' text-center text-3xl font-semibold '>Check Email</h1> : <h1 className='text-center text-3xl font-semibold'>Reset password</h1>
        }
        {
          emailsent ? (
            <div className='my-3 text-[1.25rem] text-center '>
              {`We have sent the reset email to
                  ${email}`}
            </div>
          )
            : <p className='my-3 text-[1.25rem] text-center '>Enter your email and recover your account
            </p>
        }
        <form onSubmit={submithandler}>
          {
            !emailsent &&
            <label className=''>
              <p className='text-[1.2rem] mt-8'>Email Address<sup>*</sup></p>
              <input
                className="text-lg input outline-none border border-[#f4f5] rounded px-[10px] py-[8px] w-[100%] mb-1"
                type="email"
                placeholder='Enter Email'
                name='email'
                value={email}
                onChange={(e) => setemail(e.target.value)}>
              </input>
            </label>
          }
          <div className='flex flex-row justify-between mt-6'>
            <div className='flex gap-2 items-center mt-4 px-2'>
              <Link to="/login" className='flex justify-evenly items-center text-[#ff0056] font-bold'>
                <BsArrowLeftShort />
                Back to login
              </Link>
            </div>
            <button type='submit ' className='mt-2 px-3 rounded bg-[#dcdef8]'>
              {
                emailsent ? "Resend Email" : "Reset Password"
              }

            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
