import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { setsignupdata } from "../../../src/Slices/authslice";
import { toast } from 'react-toastify';
import { sendotp } from "../../../src/services/operations/authapi"

const Signupform = () => {
  const [formdata, setformdata] = useState({
    firstName: "",
    lastName: "",
    accountType: "",
    password: "",
    confirmPassword: "",
    email: ""
  });
  const { firstName, lastName, accountType, password, confirmPassword, email } = formdata;
  const [isvisible, setisvisible] = useState(false);
  const [isvisible1, setisvisible1] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function changehandler(event) {
    const { name, value } = event.target;

    setformdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }


  function submithandler(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password not matching");
      return;
    }
    const signupdata = { ...formdata };
    console.log("signup val", signupdata);

    // call the setsignup reducer from auth slice
    dispatch(setsignupdata(signupdata));
    // send otp using dispatch hook
    dispatch(sendotp(formdata.email, navigate));

    // reset the form 
    setformdata({
      firstName: "", lastName: "", phone: "", password: "", confirmPassword: "", email: "", accountType: "",
    })

  }
  function toggle() {
    if (isvisible) {
      setisvisible(false);
    } else {
      setisvisible(true);
    }
  }

  function toggle1() {
    if (isvisible1) {
      setisvisible1(false);
    } else {
      setisvisible1(true);
    }
  }
  return (
    <>
      <form onSubmit={submithandler}>
        <div className="flex flex-col lg:flex-row items-center gap-3 w-full mb-3">
          <div className="lg:w-[50%] w-[100%]">
            <label>
              <p className="text-richblack-900 ">
                First Name <sup>*</sup>
              </p>
              <input
                placeholder="Enter First Name"
                className=" rounded-lg border text-black px-[10px] py-[12px] w-full outline-none"
                name="firstName"
                onChange={changehandler}
                value={firstName}
              />
            </label>
          </div>
          <div className="lg:w-[50%] w-[100%]">
            <label>
              <p className="text-richblack-900 ">
                Last Name <sup>*</sup>
              </p>
              <input
                className=" rounded-lg border text-black px-[10px] py-[12px] w-full outline-none"
                placeholder="Enter Last Name"
                name="lastName"
                onChange={changehandler}
                value={lastName}
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-3 w-full mb-3">
          <div className="lg:w-[50%] w-[100%]">
            <label>
              <p className='text-richblack-900 '>Email <sup>*</sup></p>
              <input type="email" placeholder='Enter Email' 
              name='email' 
              onChange={changehandler} 
              className=" rounded-lg border text-black px-[10px] py-[12px] w-full outline-none" 
              value={email}>
              </input>
            </label>
          </div>
          <div className="lg:w-[50%] w-[100%]">
            <label>
              <p className='text-richblack-900 '>Account Type <sup>*</sup></p>
              <input type="text" placeholder='Enter Account Type' 
              name='accountType' onChange={changehandler} 
              className=" rounded-lg border text-black px-[10px] py-[12px] w-full outline-none" 
              value={accountType}>

              </input>

            </label>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-3 w-full mb-3">
          <div className="lg:w-[50%] w-[100%]">
            <label>
              <p className="text-richblack-900 ">
                Create Password <sup>*</sup>
              </p>
              <div className="relative">
                <input
                  className=" rounded-lg border text-black px-[10px] py-[12px] w-full outline-none"
                  placeholder="Create Password"
                  type={`${isvisible ? "text" : "password"}`}
                  name="password"

                  onChange={changehandler}
                  value={password}
                />
                <div
                  className="text-black absolute lg:translate-x-[185px] translate-x-[290px] -translate-y-[30px]"
                  onClick={() => toggle()}
                >
                  {isvisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
              </div>
            </label>
          </div>
          <div className="lg:w-[50%] w-[100%]">
            <label>
              <p className="text-richblack-900 ">
                Confirm Password <sup>*</sup>
              </p>
              <div className="relative">
                <input
                  className=" rounded-lg text-black border px-2 py-[12px] w-full outline-none"
                  placeholder="Confirm password"
                  type={`${isvisible1 ? "text" : "password"}`}
                  name="confirmPassword"
                  onChange={changehandler}
                  value={confirmPassword}
                />
                <div
                  className="text-black absolute lg:translate-x-[185px] translate-x-[290px] -translate-y-[30px]"
                  onClick={() => toggle1()}
                >
                  {isvisible1 ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
              </div>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="rounded bg-[#dbddf9] py-2 px-5 font-bold text-lg"
        >
            Create Account
          </button>
        
        <div className='text-pure-greys-400 pt-5'>Already Register?
        <Link to="/login">
        <span className='font-bold pl-2 text-[#ff0056] '>Login Here</span>
        </Link>
      </div>
      </form>
    </>
  );
};
export default Signupform;
