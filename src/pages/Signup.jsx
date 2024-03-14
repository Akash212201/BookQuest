import React from 'react'
import Template from "../components/Common/Template"
import { useSelector } from 'react-redux'
import signup from "../assests/Sign up.svg"

const Signup = () => {
  const { loading } = useSelector((state) => state.auth);
  console.log("signupa");
  return (
    <div className='template flex justify-center items-center pb-10 px-24 bg-[#f2f2f2]'>
      {
        loading ? (<div>Loading...</div>) : (
          <Template
            heading="Join Us Now"
            para1="Regiter with us to explore the vast collection of e-books"
            formtype="signup"
            frame={signup}

          ></Template>
        )
      }

    </div>
  )
}

export default Signup
