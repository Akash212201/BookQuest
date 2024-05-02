import React from 'react'
import Template from "../components/Common/Template"
import signup from "../assests/Sign up.svg"

const Signup = () => {
  
  return (
    <div className='template flex justify-center items-center pb-10 px-24 bg-[#f2f2f2]'>
      <Template
        heading="Join Us Now"
        para1="Register with us to explore the vast collection of e-books"
        formtype="signup"
        frame={signup}

      ></Template>
    </div>
  )
}

export default Signup
