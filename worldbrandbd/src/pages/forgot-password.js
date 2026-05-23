import postRequest from '@/lib/postRequest';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const ForgetPassword = () => {

 
   const router = useRouter();

   const [num, setNum] = useState("");

   const handleChange = (value) => {
     setNum(value);
   };

   const handleSubmit = async () => {
     if (num == "") {
       toast.error("the field is required");
       return;
     }

     
          var bdMobilePattern = /^(\+)?(88)?01[3-9]\d{8}$/;
          if (bdMobilePattern.test(num)) {
          } else {
            toast.error("Not a valid phone number");

            return;
          }
    

     let res = await postRequest(`forget-password`, {
       phone: num,
     });

     if (res?.status) {

       setCookie(
         null,
         "registerPhone",
         JSON.stringify({
           phone: num,
         }),
         {
           maxAge: 24 * 60 * 60,
           path: "/",
         }
       );
      
       toast.success(`${res?.message}`);
       router.push(`/otp-verify`);
     } else {
       toast.error(`${res?.error}`);
     }
   };


  return (
    <div className="bg-gray-100 pt-32">
      <div className="max-w-7xl md:max-w-[62rem] sm:max-w-[47rem] xxl:max-w-[110rem]  mx-auto min-h-[600px] pt-5">
        <div className="mt-4 min-h-[550px] bg-gray-100 pt-32 pb-16">
          <p className="text-center text-xl font-semibold tracking-wider mb-4 dark:text-black">
            Forgot password
          </p>
          <div className=" bg-gray-200 w-[350px] xs:w-[290px] h-[150px] mx-auto rounded-md pl-3 pt-3">
            <label className="font-semibold dark:text-black">
              Phone number
            </label>
            <div className="flex justify-center items-center my-3">
              <input
                type="text"
                className="w-full mr-4 py-2 px-4 rounded-md bg-white text-black"
                onChange={(e) => handleChange(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <button
                className="px-3 py-1 bg-tahiti-500 text-white rounded-md"
                onClick={() => handleSubmit()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword