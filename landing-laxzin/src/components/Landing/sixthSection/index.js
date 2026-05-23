import { imagePath } from "@/lib/config";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const SixthSection = ({ review }) => {
 
  

  return (
    <div className="py-10">
      <div className="bg-gradient-to-b from-primary-100 via-primary-300 to-primary-500 max-w-7xl mx-auto px-6 xls:px-0 xms:px-0 xs:px-0 sm:px-0 rounded-md">
        <div className="text-[28px] text-center text-white py-8 font-bold xs:text-[20px] xms:text-[20px] xls:text-[20px] ">
          আমাদের কাস্টমারদের রিভিউ
        </div>
        <div className=" pb-10 ">
          <div className="">
            <div className="px-0 mb-4  group xs:px-2 xms:px-2 xls:px-2 sm:px-4">
              <Swiper
                spaceBetween={5}
                loop
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                modules={[Autoplay]}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 5,
                  },

                  375: {
                    slidesPerView: 1.2,
                    spaceBetween: 5,
                  },

                  425: {
                    slidesPerView: 1.5,
                    spaceBetween: 7,
                  },

                  480: {
                    slidesPerView: 1.5,
                    spaceBetween: 7,
                  },
                  530: {
                    slidesPerView: 2,
                    spaceBetween: 7,
                  },
                  640: {
                    slidesPerView: 2.4,
                    spaceBetween: 7,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 5,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 5,
                  },
                  1440: {
                    slidesPerView: 3,
                    spaceBetween: 5,
                  },
                }}
              >
                {review?.reviews?.map((item, index) => (
                  <div key={index}>
                    <SwiperSlide>
                      <div className="col-span-1 rounded-sm">
                        
                         <Image
                                                className="object-contain h-full  w-full aspect-[1/1] rounded-lg"
                                                src={`${imagePath}/storage/${item?.image}`}
                                                width={300}
                                                height={200}
                                                alt={"review"}
                                              />
                      </div>
                    </SwiperSlide>
                  </div>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SixthSection;
