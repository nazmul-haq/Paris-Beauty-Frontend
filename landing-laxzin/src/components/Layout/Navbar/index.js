import { FaHandPointDown } from "react-icons/fa";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const targetDate = new Date("2023-12-26T00:00:00Z"); // Change this to your target date
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function calculateTimeRemaining() {
    const currentTime = new Date();
    const difference = targetDate - currentTime;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  return (
    <div className="h-24 bg-[#E7E7E7] fixed inset-0  z-50 xs:h-32 xms:h-32 xls:h-32">
      <div className=" max-w-5xl mx-auto h-full">
        <div className="flex items-center justify-between px-2 h-full xs:flex-col  xs:justify-around xms:flex-col xms:justify-around xls:flex-col xls:justify-around ">
          <div className="flex space-x-2 py-2 xms:space-x-1 xs:space-x-0 items-center xs:py-0">
            <div className=" text-[#1E5461]">
              <div className="text-[24px]">
                {timeRemaining.days.toString().padStart(2, "0")} :
              </div>
              <div className="text-[12px]">
                <span className="text-[12px]">DAYS</span>
              </div>
            </div>
            <div className=" text-[#1E5461]">
              <div className="text-[24px]">
                {timeRemaining.hours.toString().padStart(2, "0")} :
              </div>
              <div className="text-[12px]">
                <span className="text-[12px]">HRS</span>
              </div>
            </div>
            <div className=" text-[#1E5461]">
              <div className="text-[24px]">
                {timeRemaining.minutes.toString().padStart(2, "0")} :
              </div>
              <div className="text-[12px]">
                <span className="text-[12px]">MINS</span>
              </div>
            </div>
            <div className=" text-[#1E5461]">
              <div className="text-[24px]">
                {timeRemaining.seconds.toString().padStart(2, "0")}
              </div>
              <div className="text-[12px]">
                <span className="text-[12px]">SEC</span>
              </div>
            </div>
          </div>
          <div className="flex items-center text-[22px] font-bold bg-[#b08020] py-3 px-3 rounded-md text-white xs:text-[16px] xs:py-2 xms:text-[16px] xms:py-2 xls:text-[16px] xls:py-2 sm:text-[18px]">
            <span>সারাদেশে ডেলিভারি চার্জ ফ্রি</span>
            <FaHandPointDown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
