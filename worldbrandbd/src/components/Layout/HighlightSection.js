import React from 'react'
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { BsTruck } from "react-icons/bs";
import { GoThumbsup } from "react-icons/go";
import { BiSupport } from "react-icons/bi";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import {
 
  MdOutlineLocalOffer,
  MdOutlinePayment,
} from "react-icons/md";

const HighlightSection = () => {
  return (
    <div className="relative section pt-5 px-2">
      <Swiper
        slidesPerView={6}
        spaceBetween={10}
        className="border border-gray-300 rounded-md"
        autoplay={{
          delay: 2200,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".button-next-slide",
          prevEl: ".button-prev-slide",
        }}
        modules={[Autoplay, Navigation]}
        breakpoints={{
          270: {
            slidesPerView: 1.8,
            spaceBetween: 9,
          },

          320: {
            slidesPerView: 2,
            spaceBetween: 9,
          },

          375: {
            slidesPerView: 2,
            spaceBetween: 10,
          },

          425: {
            slidesPerView: 2,
            spaceBetween: 15,
          },

          480: {
            slidesPerView: 2.5,
            spaceBetween: 18,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 18,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 18,
          },
          1150: {
            slidesPerView: 4.5,
            spaceBetween: 18,
          },
          1440: {
            slidesPerView: 4.7,
            spaceBetween: 18,
          },
          1500: {
            slidesPerView: 6,
            spaceBetween: 18,
          },
        }}
      >
        <SwiperSlide>
          <div className=" flex items-center justify-between border-r border-gray-300 py-4 px-5 h-[90px]">
            <div className="">
              <BsTruck className="text-[39px] xls:text-[25px] xms:text-[25px] xs:text-[22px] text-tahiti-500" />
            </div>
            <div className="">
              <div className="text-[14px] xls:text-[12px] xms:text-[12px] xs:text-[11px] font-semibold text-center">
                Free Delivery
              </div>
              <div className="text-[12px] text-center">From ৳1999</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" flex items-center justify-between border-r border-gray-300 py-4 px-5 h-[90px]">
            <div className="">
              <GoThumbsup className="text-[39px] xls:text-[25px] xms:text-[25px] xs:text-[22px] text-tahiti-500" />
            </div>
            <div className="">
              <div className="text-[14px] xls:text-[12px] xms:text-[12px] xs:text-[11px] font-semibold text-center">
                99% Positive
              </div>
              <div className="text-[12px] text-center">Feedback</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" flex items-center justify-between border-r border-gray-300 py-4 px-5 h-[90px]">
            <div className="">
              <BiSupport className="text-[39px] xls:text-[25px] xms:text-[25px] xs:text-[22px] text-tahiti-500" />
            </div>
            <div className="">
              <div className="text-[14px] xls:text-[12px] xms:text-[12px] xs:text-[11px] font-semibold text-center">
                24/7 Support
              </div>
              <div className="text-[12px] text-center">shop with an expert</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" flex items-center justify-between border-r border-gray-300 py-4 px-5 h-[90px]">
            <div className="">
              <FaBangladeshiTakaSign className="text-[39px] xls:text-[25px] xms:text-[25px] xs:text-[22px] text-tahiti-500" />
            </div>
            <div className="">
              <div className="text-[14px] xls:text-[12px] xms:text-[12px] xs:text-[11px] font-semibold text-center">
                Affordable Price
              </div>
              <div className="text-[12px] text-center">get best price</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" flex items-center justify-between border-r border-gray-300 py-4 px-5 h-[90px]">
            <div className="">
              <MdOutlinePayment className="text-[39px] xls:text-[25px] xms:text-[25px] xs:text-[22px] text-tahiti-500" />
            </div>
            <div className="">
              <div className="text-[14px] xls:text-[12px] xms:text-[12px] xs:text-[11px] font-semibold text-center">
                Payment
              </div>
              <div className="text-[12px] text-center">Secure System</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" flex items-center justify-between  py-4 px-5h-[90px] ">
            <div className="">
              <MdOutlineLocalOffer className="text-[39px] xls:text-[25px] xms:text-[25px] xs:text-[22px] text-tahiti-500" />
            </div>
            <div className="">
              <div className="text-[14px] xls:text-[12px] xms:text-[12px] xs:text-[11px] font-semibold text-center">
                Only Best
              </div>
              <div className="text-[12px] text-center">Brands</div>
            </div>
          </div>
        </SwiperSlide>
        <button className="button-prev-slide w-[50px] xls:w-[20px] xms:w-[20px] xms:h-[20px] xs:h-[20px] xs:w-[20px] xls:h-[20px] h-[50px] rounded-full shadow-xl drop-shadow-lg  transition duration-200 bg-slate-50 text-black grid place-items-center absolute top-[47%] z-10 left-[-50px] md:left-[-15px] sm:left-[-5px] xls:left-[-20px] xms:left-[-20px] xs:left-[-23px] cursor-pointer">
          <MdOutlineKeyboardArrowLeft size={20} className="text-primary" />
        </button>

        <button className="button-next-slide w-[50px] xls:w-[20px] xms:w-[20px] xms:h-[20px] xs:h-[20px] xs:w-[20px] xls:h-[20px] h-[50px] rounded-full shadow-xl drop-shadow-lg  transition duration-200 bg-slate-50 text-black grid place-items-center absolute top-[47%] z-10 right-[-50px] md:right-[-15px] sm:right-[-5px]  xls:right-[-20px] xms:right-[-20px] xs:right-[-23px] cursor-pointer">
          <MdOutlineKeyboardArrowRight size={20} className="text-primary" />
        </button>
      </Swiper>
    </div>
  );
}

export default HighlightSection