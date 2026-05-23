
import { useEffect, useState } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import hostname from '@/lib/config'

const Slide = ({ slide, loading }) => {


  return (
    <div>
      <div>
        <Swiper
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          effect={"fade"}
          navigation={false}
          pagination={{
            clickable: true,
            dynamicBullets: false,
            // el: ".swiper-pagination",
          }}
          modules={[Autoplay, Pagination]}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 1,
            },
            1440: {
              slidesPerView: 1,
            },
          }}
        >
          {slide?.map((item, index) => (

            <SwiperSlide key={index}>
              <div className="h-[500px]  md:h-[200px]  sm:h-[170px] lg:h-[350px]  xls:h-[140px]  xms:h-[130px]  xs:h-[120px] w-screen relative">
                <Image
                  src={
                    item?.image_path && item?.image
                      ? `${hostname.ImageHostName}/storage/${item?.image_path}${item?.image}`
                      : '/assets/placeholder_600x.webp'
                  }
                  // src={`/assets/slider/slider2.webp`}
                  className="object-fill h-full w-full"
                  width={2000}
                  height={100}
                  alt="slider"
                  onError={(e) => {
                    e.target.src = '/assets/placeholder_600x.webp';
                  }}
                  priority
                />
              </div>
            </SwiperSlide>

          ))}
        </Swiper>
      </div>
      {/* )} */}
    </div>
  );
};

export default Slide;