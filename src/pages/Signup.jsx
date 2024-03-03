import React from 'react'
import Template from "../components/Common/Template"
import { useSelector } from 'react-redux'
import signup from "../assests/Sign up.svg"

const Signup = () => {
  const { loading } = useSelector((state) => state.auth);
  console.log("signupa");
  return (
    <div className="bg-[#f2f2f2] pb-10 px-5">
      {
        loading ? (<div>Loading...</div>) : (
          <Template
            heading="Join Us Now"
            para1="Regiter yourself to use most affordable rickshaw service."
            formtype="signup"
            frame={signup}

          ></Template>
        )
      }

    </div>
  )
}

export default Signup
