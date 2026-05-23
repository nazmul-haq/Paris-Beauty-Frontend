import { useStatus } from '@/context/contextStatus';
import postRequest from '@/lib/postRequest';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useState, useEffect } from "react";
import OTPInput from 'react-otp-input';
import { toast } from 'react-toastify';


const Otp = () => {

    const router = useRouter();

    const {setTabIndex} = useStatus();

 
   const [otp, setOTP] = useState("");

   const handleOTPChange = (otp) => {
     setOTP(otp);
   };

  
    
  const cookie = parseCookies();
  let items = cookie?.hasOwnProperty("registerPhone")
    ? JSON.parse(cookie?.registerPhone)
    : {};

  // console.log("items.......",items);

  const initialSeconds = localStorageAvailable()
    ? localStorage.getItem("timer") || 300
    : 300;
  const [seconds, setSeconds] = useState(parseInt(initialSeconds, 10));

  useEffect(() => {
    if (localStorageAvailable()) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          const newSeconds = prevSeconds - 1;
          localStorage.setItem("timer", newSeconds);
          return newSeconds;
        });
      }, 1000);

      return () => {
        clearInterval(interval);
        localStorage.removeItem("timer");
      };
    }
  }, [seconds]);

  // Convert seconds to minutes and seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  function localStorageAvailable() {
    try {
      const testKey = "__testKey__";
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  const handleSubmit = async () => {
    let res = await postRequest(`otp/verify`, {
      otp: otp,
    });
    if (res?.status) {
      toast(`${res?.message}`);
      localStorage.setItem("timer", 300);
      router.push(`/auth`);
      setTabIndex(1);
    } else {
      toast.error(`${res?.error}`);
    }
  };

  const handleOTP = async () => {
    let res = await postRequest(`forget-password`, {
      phone: items?.phone,
    });

    if (res?.status) {
      toast.success(`${res?.message}`);
      setOTP("");

      if (localStorageAvailable()) {
        localStorage.setItem("timer", 300);
        setSeconds(300); // Reset state as well
      }
    } else {
      toast.error(`${res?.error}`);
    }
  };

    

  return (
    <div className="bg-gray-100 pt-[170px]">
      <div className="max-w-7xl md:max-w-[62rem] sm:max-w-[47rem] xxl:max-w-[110rem]  mx-auto min-h-[600px] pt-5">
        <div className="mt-4 min-h-[550px] bg-gray-100 pt-32 pb-16">
          <div className="text-center text-xl font-semibold tracking-wider mb-4 dark:text-black">
            Please enter your OTP
          </div>
          <div className="space-y-6 bg-gray-200 w-[450px] xls:w-[400px] xms:w-[320px] xs:w-[290px] h-[150px] xms:h-[70px] xs:h-[70px] mx-auto rounded-md">
            <div className="flex justify-center items-center h-full">
              <OTPInput
                value={otp}
                onChange={handleOTPChange}
                numInputs={4}
                separator={<span>-</span>}
                inputStyle="my-otp-input"
                renderInput={(props) => <input type="text" {...props} />}
              />
            </div>

            {seconds > 0 ? (
              <p className="text-center text-black">
                Recieve the verification code in:{" "}
                {minutes.toString().padStart(2, "0")}:
                {remainingSeconds.toString().padStart(2, "0")}
              </p>
            ) : (
              <p className="text-center text-black" onClick={() => handleOTP()}>
                Didnt recieve the OTP yet?{" "}
                <span className="text-red-500 underline cursor-pointer">
                  Resend OTP
                </span>
              </p>
            )}

            <div className="flex justify-center">
              <button
                className="px-3 py-1 bg-tahiti-500 text-white rounded-md"
                onClick={() => handleSubmit()}
              >
                Submit OTP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Otp