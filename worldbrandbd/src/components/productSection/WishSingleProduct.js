import hostname from "@/lib/config";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import QuickViewModal from "./QuickViewModal";
import { RiDeleteBinLine } from "react-icons/ri";
import postRequest from "@/lib/postRequest";

const SingleProduct = ({ item,addWish }) => {
    const [quickViewModal, setQuickViewModal] = useState(false);

    const [prodId, setProdId] = useState(null);
  
  
    const handleQuickView = (id) => {
      setQuickViewModal(true);
      setProdId(id);
    };

  const router = useRouter();



  

  return (
    <>
      <div
        // onClick={() => router.push("/products/poloshirt")}

        className="bg-white  border rounded-lg shadow-md cursor-pointer relative"
      >
        {item?.image?.length > 0 ? (
          <div
            onClick={() => router.push(`/products/${item?.slug}`)}
            className="relative w-full h-[320px] xs:h-[180px] xms:h-[200px] xls:h-[180px] sm:h-[240px] md:h-[270px] lg:h-[300px]"
          >
            <Image
              className="object-fill h-full w-full"
              src={`${hostname.ImageHostName}/storage/product/${item?.image[0]}`}
              width={100}
              height={100}
              priority
              alt="category"
            />
          </div>
        ) : (
          <div
            className="relative w-full h-[320px] xs:h-[180px] xms:h-[200px] xls:h-[180px] sm:h-[260px] md:h-[270px] lg:h-[300px] "
            onClick={() => router.push(`/products/${item?.slug}`)}
          >
            <Image
              className="object-fill h-full w-full"
              src={`/assets/category/product1.webp`}
              width={100}
              height={100}
              priority
              alt="category"
            />
          </div>
        )}
        <div className=" text-center py-1 bg-[#ECF0F3]">
          <div
            onClick={() => router.push(`/products/${item?.slug}`)}
            className="px-1 text-[13px] font-semibold overflow-hidden line-clamp-2  py-1 cursor-pointer"
          >
            {item?.product_name}
          </div>
          <div className="font-semibold text-black text-center font-sans">
            {(item?.product_variation_status == 0 &&
              (item?.discount || item?.campaign_id)) ||
            (item?.product_variation_status == 1 &&
              (item?.product_variants[0]?.discount ||
                (item?.discount_type && item?.campaign_id))) ? (
              <span className="line-through">
                ৳
                {item?.product_variation_status == 1
                  ? Math.round(item?.product_variants[0]?.regular_price)
                  : Math.round(item?.regular_price)}
              </span>
            ) : null}
            <span className="pl-2 text-tahiti-500">
              ৳
              {item?.product_variation_status == 1
                ? Math.round(item?.product_variants[0]?.sale_price)
                : Math.round(item?.sale_price)}
            </span>
          </div>
        </div>
        <div
          onClick={() => addWish(item?.id)}
          className="absolute top-4 left-0 z-10 w-[40px] "
        >
          <div className="bg-tahiti-500 flex items-center justify-center px-1 py-1 rounded-r-full shadow-md">
            <RiDeleteBinLine className="text-[20px] text-white" />
          </div>
        </div>
        <div className="absolute top-4 right-1 z-10  ">
          <div
            onClick={() => handleQuickView(item?.slug)}
            className=" w-8 h-8 grid items-center justify-center text-[14px] font-semibold text-white  rounded-full bg-tahiti-500 hover:bg-white hover:text-tahiti-500"
          >
            <HiPlus />
          </div>
        </div>
      </div>
      <QuickViewModal
        quickViewModal={quickViewModal}
        setQuickViewModal={setQuickViewModal}
        prodId={prodId}
        setProdId={setProdId}
      />
    </>
  );
};

export default SingleProduct;
