import React from "react";
import Loginform from "../Login/Loginform"
import Signupform from "../Signup/Signupform"
import { useSelector } from "react-redux";


const Template = ({ heading, para1, formtype, frame }) => {
  const { loading } = useSelector((state) => state.auth);
  console.log("signupb");
  return (
    <div>
      {
        loading ? (<div>Loading...</div>) : (
          <div className="flex lg:flex-row lg:gap-7 flex-col gap-0">
            {/**left part */}
            <div className="lg:w-[50%] flex justify-center items-center">
              <img src={frame} className="lg:h-[550px] h-[400px]" alt="error"></img>
            </div>
            {/**right part */}
            <div className="lg:w-[50%] flex flex-col items-start gap-5 text-[1rem]">
              {/**form type */}
              <div className="formtemplate px-10 lg:py-16 py-8">
                <h1 className="text-center text-3xl">{heading}</h1>
                <p className="text-center">{para1}</p>
                {
                  formtype === "signup" ? <Signupform /> : <Loginform />

                }
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Template;