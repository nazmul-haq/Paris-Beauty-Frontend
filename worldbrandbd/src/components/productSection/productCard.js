import { useStatus } from "@/context/contextStatus";
import hostname from "@/lib/config";
import Image from "next/image";
import { useRouter } from "next/router";
import { HiPlus } from "react-icons/hi";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import Link from "next/link";
import { useState } from "react";

const ProductCard = ({ productList }) => {
  const { setQuickViewModal, setProdId, setRequestStockModal, setId } =
    useStatus();
  // const [totalQty, setTotalQty] = useState(0);

  const [campaingName,setCampaign] = useState('');

  const handleQuickView = (id) => {
    setQuickViewModal(true);
    setProdId(id);
  };

  const handleRequestStock = (slug, id) => {
    setProdId(slug);
    setId(id);
    setRequestStockModal(true);
  };

  const router = useRouter();


 
  

  return (
    <div className="relative  section">
      <Swiper
        slidesPerView={5}
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
            slidesPerView: 1.5,
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
            slidesPerView: 5,
            spaceBetween: 18,
          },
        }}
      >
        {productList?.map((item, index) => (
          <SwiperSlide
            // onClick={() => router.push("/products/poloshirt")}
            key={index}
          >
            <div className="bg-[#ECF0F3] w-full  border rounded-2xl shadow-lg cursor-pointer relative">
              <div className="relative  flex items-end justify-center">
                {item?.image && item?.image?.length > 0 ? (
                  <div className="relative w-full h-[300px] xs:h-[100px] xms:h-[130px] xls:h-[130px] sm:h-[240px] md:h-[270px] lg:h-[300px]">
                    <Link href={`/products/${item?.slug}`}>
                      <Image
                        className="object-fill h-full w-full rounded-t-lg"
                        src={`${hostname.ImageHostName}/storage/product/${encodeURIComponent(item?.image[0])}`}
                        width={450}
                        height={50}
                        alt="category"
                        priority
                      />
                    </Link>
                  </div>
                ) : (
                  <div className="relative w-full h-[300px] xs:h-[130px] xms:h-[130px] xls:h-[130px] sm:h-[240px] md:h-[270px] lg:h-[300px]">
                    <Link href={`/products/${item?.slug}`}>
                      <Image
                        className="object-fill h-full w-full"
                        src={`/assets/category/product1.webp`}
                        width={450}
                        height={50}
                        alt="category"
                        priority
                      />
                    </Link>
                  </div>
                )}
                {item?.campaign_name ? (
                  <p className="absolute bottom-2 text-center text-white bg-[#00254a]  grid justify-center text-sm xls:text-[10px] xms:text-[10px] xs:text-[8px]  px-2 rounded-md py-1 ">
                    {item?.campaign_name}
                  </p>
                ) : null}
              </div>

              <div className=" text-center py-1 bg-[#ECF0F3] rounded-b-lg">
                <Link
                  href={`/products/${item?.slug}`}
                  className="px-1 text-[12px] xls:text-[9px]  xms:text-[9px] xs:text-[9px] font-semibold overflow-hidden line-clamp-2  py-1 cursor-pointer xls:h-[50px] xms:h-[50px] xs:h-[50px] h-[45px]  "
                >
                  {item?.product_name?.length > 45 ? (
                    <h2>{item?.product_name?.substring(0, 45) + "...."}</h2>
                  ) : (
                    <h2>{item?.product_name}</h2>
                  )}
                </Link>
                <div className="font-semibold text-black text-center xls:text-[9px]  xms:text-[9px] xs:text-[9px] font-sans">
                  TK.{" "}
                  {item?.product_variation_status == 0 ? (
                    <>
                      {item?.regular_price == item?.sale_price ? null : (
                        <span className="line-through">
                          {Math.round(item?.regular_price)}
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      {item?.product_variants[0]?.regular_price ==
                      item?.product_variants[0]?.sale_price ? null : (
                        <span className="line-through">
                          {Math.round(item?.product_variants[0]?.regular_price)}
                        </span>
                      )}
                    </>
                  )}
                  {item?.product_variation_status == 0 ? (
                    <span className="pl-2 text-tahiti-500">
                      {Math.round(item?.sale_price)}
                    </span>
                  ) : (
                    <span className="pl-2 text-tahiti-500">
                      {Math.round(item?.product_variants[0]?.sale_price)}
                    </span>
                  )}
                </div>
                {item?.stock_products?.length == 0 ? (
                  <div
                    className="uppercase mt-1 text-white  bg-[#DE606B] text-xs xls:text-[10px] xms:text-[9px] xs:text-[7px] py-[2px] rounded-full mx-2"
                    onClick={() => handleRequestStock(item?.slug, item?.id)}
                  >
                    request stock
                  </div>
                ) : (
                  <div className="h-[22px]"></div>
                )}
              </div>
              <div
                onClick={() => router.push(`/products/${item?.slug}`)}
                className="absolute top-4 xls:top-3 xms:top-3 left-0 z-10 w-[60px] xls:w-[55px]"
              >
                <div className="bg-tahiti-500 flex items-center justify-between px-1 py-1 rounded-r-full shadow-md">
                  <div className="text-[12px] xls:text-[9px] xms:text-[9px] xs:text-[9px] font-bold text-white ">
                    OFF
                  </div>

                  <div className=" w-6 h-6 grid items-center justify-center text-[10px] font-semibold text-tahiti-500  rounded-full bg-white">
                    {item?.product_variation_status == 1
                      ? Math.round(
                          ((item?.product_variants[0]?.regular_price -
                            item?.product_variants[0]?.sale_price) *
                            100) /
                            item?.product_variants[0]?.regular_price
                        )
                      : Math.round(
                          ((item?.regular_price - item?.sale_price) * 100) /
                            item?.regular_price
                        )}
                    %
                  </div>
                </div>
              </div>
              <div className="absolute top-4 right-1 z-10  ">
                <div
                  onClick={() => handleQuickView(item?.slug)}
                  className=" w-8 h-8 xls:w-6 xls:h-6 xms:w-5 xms:h-5 xs:w-5 xs:h-5 grid items-center justify-center text-[14px] font-semibold text-white  rounded-full bg-tahiti-500 hover:bg-white hover:text-tahiti-500"
                >
                  <HiPlus />
                </div>
              </div>
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
  );
};

export default ProductCard;
