import React from 'react'
import Template from "../components/Common/Template"
import login from "../assests/login.png"
const Login = () => {
  return (
    <div className='flex justify-center items-center pb-10 px-24 bg-[#f2f2f2]'>
      <Template
        heading="Welcome Back"
        para1="Build skills for today, tomorrow, and beyond. Education to future-proof your career."
        formtype="login"
        frame={login}

      ></Template>

    </div>
  )
}

export default Login

