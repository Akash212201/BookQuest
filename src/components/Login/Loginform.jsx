import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { login } from "../../../src/services/operations/authapi"


const Loginform = () => {

  const [formdata, setformdata] = useState({ email: "", password: "" });
  const [isvisible, setisvisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  function changehandler(event) {
    const { name, value } = event.target;

    setformdata((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })

  }

  function submithandler(e) {
    e.preventDefault();
    const { email, password } = formdata;
    dispatch(login(email, password, navigation));
  }

  function toggle() {
    if (isvisible) {
      setisvisible(false);
    }
    else {
      setisvisible(true);
    }
  }
  return (
    <div className='flex flex-col '>

      <form onSubmit={submithandler}>

        <div className='flex flex-col items-start gap-4 w-fit'>
          <label>
            <p className='text-richblack-900 '>Email <sup>*</sup></p>
            <input placeholder='Enter Your Email' name='email' className=" rounded-lg bg-[#e2e8f0] text-black px-[20px] py-[12px] pr-40 outline-none" onChange={changehandler} value={formdata.email}></input>

          </label>

          <label>
            <p className='text-richblack-900 '>Password <sup>*</sup></p>
            <div className='relative flex-row items-center'>
              <input placeholder='Enter Password' type={`${isvisible ? "text" : "password"}`} name='password' className="pr-40 rounded-lg text-black bg-[#e2e8f0] px-[20px] py-[12px] w-full outline-none" onChange={changehandler} value={formdata.password}></input>
              <div className='text-black absolute right-8 flex -translate-y-[30px]' onClick={() => toggle()}>
                {
                  isvisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />
                }
              </div>
            </div>

          </label>

          <div className='text-blue-400 translate-x-64 '>
            <Link to="/forgotpassword">
              Forgot password
            </Link>
          </div>

          <button
            type="submit"
            className="rounded-[8px] bg-black py-[8px] px-[15px] font-medium text-white text-lg"
          >
            Sign In
          </button>
        </div>
      </form>
      <div className='font-inter  text-pure-greys-400 pt-5'>Don’t have an account?
        <Link to="/signup"><span className='font-bold text-black pl-2'>Sign up</span></Link>
      </div>

    </div>

  )
}

export default Loginform
