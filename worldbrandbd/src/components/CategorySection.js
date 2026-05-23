import Image from 'next/image';
import Link from 'next/link';
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

const CategorySection = ({ category_section }) => {



  return (
    <div>
      <div className="py-5 flex items-center justify-between px-2">
        <div className="text-[18px] font-semibold border-b-[2px] cursor-pointer pb-1 border-tahiti-500 xs:text-[14px] xms:text-[14px] xls:text-[14px] sm:text-[16px]">
          {category_section?.top_category_section?.name}{" "}
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
              slidesPerView: 3,
              spaceBetween: 10,
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
          {category_section?.top_category_section?.section_category_list
            ?.length > 0 &&
            category_section?.top_category_section?.section_category_list?.map(
              (item, index) => (
                <SwiperSlide key={index}>
                  <Link
                    href={`/product-list/${item?.slug}`}
                    className="bg-white  border rounded-lg hover:shadow-md"
                  >
                    <div className="grid items-center justify-center">
                      <div className="my-2 relative w-[200px] lg:w-[180px]  h-[160px] xs:w-[100px] xs:h-[80px] xms:w-[100px] xms:h-[90px] xls:w-[100px] xls:h-[100px] sm:w-[110px] sm:h-[100px] md:w-[150px] md:h-[110px]">
                        <Image
                          src={
                            item?.image_path && item?.image
                              ? `${hostname.ImageHostName}/storage/${item?.image_path}${item?.image}`
                              : '/assets/placeholder_600x.webp'
                          } width={500}
                          height={100}
                          className="h-full w-full object-fill"
                          alt="category"
                          priority
                          onError={(e) => {
                            e.target.src = '/assets/placeholder_600x.webp';
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-[15px] sm:text-[12px] xls:text-[9px] xms:text-[9px] xs:text-[9px] text-center py-1">
                      {item?.name?.length > 30 ? (
                        <span>{item?.name?.substring(0, 30) + "...."}</span>
                      ) : (
                        <span>{item?.name}</span>
                      )}
                    </div>
                  </Link>
                </SwiperSlide>
              )
            )}
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

export default CategorySection