import React from "react";
import Loginform from "../Login/Loginform"
import Signupform from "../Signup/Signupform"
import { useSelector } from "react-redux";


const Template = ({ heading, para1, formtype, frame }) => {
  const { loading } = useSelector((state) => state.auth);
  
  return (
    <>
      {
 
          <div className="flex justify-center items-center min-h-[80vh] lg:mt-14 mt-8">
            <div className="bg-white lg:w-[480px] w-[350px] rounded text-[1rem] px-6 py-10 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'">
              {/**form type */}
                <h1 className="text-center text-3xl">{heading}</h1>
                <p className="text-center mb-6">{para1}</p>
                {
                  formtype === "signup" ? <Signupform /> : <Loginform />

                }
              
            </div>
          </div>
        
      }
    </>
  );
};

export default Template;