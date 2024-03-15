import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import OtpInput from "react-otp-input"
import { BsArrowLeftShort } from "react-icons/bs"
import { sendotp, signup } from '../services/operations/authapi';

const VerifyEmail = () => {
  console.log("mark");
  const [otp, setotp] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { signupdata, loading } = useSelector((state) => state.auth);
  console.log(signupdata);

  useEffect(() => {
    if (!signupdata) {
      navigation("/signup");
    }
    // eslint-disable-next-line
  }, []);
  function submithandler(e) {
    e.preventDefault();
    const { firstName, lastName, email
      , password, confirmPassword, accountType } = signupdata;

    console.log(signupdata);
    console.log(firstName);
    console.log(otp);

    dispatch(signup(firstName, lastName, email
      , accountType, password, confirmPassword, otp, navigation));
  }

  return (
    <div className="template flex justify-center items-center h-[90vh]">
      <div className="py-8 px-10 lg:w-[30%] w-[380px] rounded-xl shadow-[0, 3px ,101px ,rgba(0,0,0,0.10)] bg-white">
        {
          loading ? (<div>Loading.....</div>) : (<div>
            <form onSubmit={submithandler}>
              <h1 className="text-4xl mt-5 mb-1 text-center">Verify Email</h1>
              <p className="text-base mb-10 text-center">A verification code has been sent to you. Enter the code below</p>
              <div className="flex justify-center">
                <OtpInput
                  value={otp}
                  onChange={setotp}
                  numInputs={6}
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input {...props} className=" text-black rounded-lg text-4xl border" />}

                />
              </div>

              <button type='submit' 
              className="border w-full py-2 px-3 text-lg rounded-xl my-5 bg-[#93a2f6]">Verify OTP</button>

            </form>
            <div className="flex justify-between items-center">
              <div>
                <Link to="/login" 
                className="flex justify-start items-center text-[#ff0056]">
                  <BsArrowLeftShort className="mr-2 text-2xl" />
                  Back to login
                </Link>
              </div>
              <div>
                <button onClick={() => sendotp()} className="bg-[#f4f5ff] ml-2 border border-black px-4 py-1 rounded-lg">
                  Resend it
                </button>
              </div>
            </div>



          </div>)
        }
      </div>
    </div>
  )
}

export default VerifyEmail
