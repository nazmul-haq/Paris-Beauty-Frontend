import Link from "next/link";
import React, { useEffect } from "react";

const PaymentSuccessful = () => {
  useEffect(() => {
    if (typeof window.fbq === "function") {
      window.fbq("track", "Pageview");
    }
  }, []);

  return (
    <div className="min-h-[670px] bg-gray-100">
      <div className="max-w-7xl sm:max-w-[40rem] xls:mx-w-[24rem] xms:max-w-[22rem] xs:max-w-[16rem] mx-auto h-full">
        <div className="flex justify-center items-center h-full pt-72">
          <div>
            <p className="text-3xl font-semibold text-center dark:text-black">
              Thank you for purchasing from worldbrand BD
            </p>
          </div>
        </div>
        <Link className="flex justify-center mt-6" href={`/`}>
          <button className=" px-5 py-2 rounded-md bg-gray-700 text-white">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessful;
