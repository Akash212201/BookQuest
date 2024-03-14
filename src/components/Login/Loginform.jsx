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
    <>
      <form onSubmit={submithandler}>
        <label>
          <p className='text-richblack-900 '>Email <sup>*</sup></p>
          <input placeholder='Enter Your Email' name='email' 
          className="text-black border w-full py-2 px-3 text-lg rounded-xl my-3 outline-none"
            onChange={changehandler}
            value={formdata.email}>
          </input>
        </label>
        <label>
          <p className='text-richblack-900 mt-4'>Password <sup>*</sup></p>
          <div className='relative flex-row items-center'>
            <input
              placeholder='Enter Password'
              type={`${isvisible ? "text" : "password"}`}
              name='password'
              className="text-black border w-full py-2 px-3 text-lg rounded-xl outline-none"
              onChange={changehandler} value={formdata.password}>
            </input>
            <div
              className='text-black absolute right-8 flex -translate-y-[30px]'
              onClick={() => toggle()}>
              {
                isvisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />
              }
            </div>
          </div>

        </label>

        <div className='text-[#ff0056]  mt-2 flex justify-end'>
          <Link to="/forgotpassword">
            Forgot password
          </Link>
        </div>

        <button
          type="submit"
          className="rounded bg-[#dbddf9] py-2 px-5 font-bold text-lg"
        >
          Sign In
        </button>

      </form>
      <div className='font-inter text-pure-greys-400 pt-5'>Don’t have an account?
        <Link to="/signup">
          <span className='font-bold pl-2 text-[#ff0056] '>Sign Up Here</span>
        </Link>
      </div>
    </>

  )
}

export default Loginform
