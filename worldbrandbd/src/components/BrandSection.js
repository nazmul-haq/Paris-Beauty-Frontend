import Image from 'next/image';
import React from 'react'
import hostname from "@/lib/config";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useRouter } from 'next/router';

const BrandSection = ({ brands }) => {
 
 const router = useRouter();



  return (
    <div className="pb-6">
      <div className="py-5 flex items-center justify-between px-2">
        <div className="text-[18px] font-semibold border-b-[2px] cursor-pointer pb-1 border-tahiti-500 xs:text-[14px] xms:text-[14px] xls:text-[14px] sm:text-[16px]">
          Brands{" "}
        </div>
        <div
          onClick={() => router.push(`/brand`)}
          className=" cursor-pointer text-[12px] px-2 bg-tahiti-500 py-2 rounded-sm text-white shadow-md hover:bg-black transition duration-500 xs:py-1 xms:py-1 xls:py-1"
        >
          View All Brands
        </div>
      </div>
      <div className="relative section">
        <Swiper
          slidesPerView={6}
          spaceBetween={10}
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
              slidesPerView: 3,
              spaceBetween: 9,
            },

            320: {
              slidesPerView: 3,
              spaceBetween: 9,
            },

            375: {
              slidesPerView: 3,
              spaceBetween: 10,
            },

            425: {
              slidesPerView: 3,
              spaceBetween: 10,
            },

            480: {
              slidesPerView: 2,
              spaceBetween: 18,
            },
            768: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 18,
            },
            1150: {
              slidesPerView: 6,
              spaceBetween: 18,
            },
            1440: {
              slidesPerView: 6,
              spaceBetween: 18,
            },
            1500: {
              slidesPerView: 6,
              spaceBetween: 18,
            },
          }}
        >
          {brands.map((item, index) => (
            <SwiperSlide
              key={index}
              className="bg-white border rounded-lg hover:shadow-md cursor-pointer"
              onClick={() => router.push(`/brand/${item?.name}`)}
            >
              <div>
                <div className="my-2 relative w-[130px] h-[160px] xs:w-[60px] xs:h-[80px] xms:w-[70px] xms:h-[90px] xls:w-[80px] xls:h-[100px] sm:w-[80px] sm:h-[100px] md:w-[90px] md:h-[110px]">
                  <Image
                    className="h-full w-full"
                    src={
                      item?.image_path && item?.image
                        ? `${hostname.ImageHostName}/storage/${item?.image_path}${item?.image}`
                        : '/assets/placeholder_600x.webp'
                    }
                    width={100}
                    height={100}
                    priority
                    alt="category"
                    onError={(e) => {
                      e.target.src = '/assets/placeholder_600x.webp'; 
                    }}
                  />
                </div>

                <div className="text-[13px] text-center py-1">{item?.name}</div>
              </div>
            </SwiperSlide>
          ))}

          <button className="button-prev-slide w-[50px] xls:w-[20px] xms:w-[20px] xms:h-[20px] xs:h-[20px] xs:w-[20px] xls:h-[20px] h-[50px] rounded-full shadow-xl drop-shadow-lg  transition duration-200 bg-slate-50 text-black grid place-items-center absolute top-[47%] z-10 left-[-50px] md:left-[-15px] sm:left-[-5px] xls:left-[-20px] xms:left-[-20px] xs:left-[-23px] cursor-pointer">
            <MdOutlineKeyboardArrowLeft size={20} className="text-primary" />
          </button>

          <button className="button-next-slide w-[50px] xls:w-[20px] xms:w-[20px] xms:h-[20px] xs:h-[20px] xs:w-[20px] xls:h-[20px] h-[50px] rounded-full shadow-xl drop-shadow-lg  transition duration-200 bg-slate-50 text-black grid place-items-center absolute top-[47%] z-10 right-[-50px] md:right-[-15px] sm:right-[-5px]  xls:right-[-20px] xms:right-[-20px] xs:right-[-23px] cursor-pointer">
            <MdOutlineKeyboardArrowRight size={20} className="text-primary" />
          </button>
        </Swiper>
      </div>
    </div>
  );
};

export default BrandSection