import hostname from "@/lib/config";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import QuickViewModal from "./QuickViewModal";
import { useStatus } from "@/context/contextStatus";
import Link from "next/link";

const SingleProduct = ({ item }) => {
  const {
    
    setQuickViewModal,

    setProdId,
    setId,
    setRequestStockModal,
  } = useStatus();

    // const [quickViewModal, setQuickViewModal] = useState(false);

    // const [prodId, setProdId] = useState(null);
  
  
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
    <>
      <div className="bg-[#ECF0F3]  border rounded-lg shadow-md cursor-pointer relative">
        <div className="relative  flex items-end justify-center">
          {item?.image && item?.image?.length > 0 ? (
            <div className="relative w-full h-[300px] xs:h-[140px] xms:h-[150px] xls:h-[160px] sm:h-[240px] md:h-[270px] lg:h-[300px]">
              <Link href={`/products/${item?.slug}`}>
                <Image
                  className="object-fill h-full w-full rounded-t-lg"
                  src={`${hostname.ImageHostName}/storage/product/${encodeURIComponent(item?.image[0])}`}
                  width={500}
                  height={100}
                  alt="category"
                  priority
                />
              </Link>
            </div>
          ) : (
            <div className="relative w-full h-[300px] xs:h-[140px] xms:h-[150px] xls:h-[160px] sm:h-[240px] md:h-[270px] lg:h-[300px]">
              <Link href={`/products/${item?.slug}`}>
                <Image
                  className="object-fill w-full h-full"
                  src={`/assets/category/product1.webp`}
                  width={600}
                  height={100}
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

        <div className=" text-center py-1 bg-[#ECF0F3] h-[75px] rounded-b-lg">
          <Link
            href={`/products/${item?.slug}`}
            className="px-1 text-[12px] xls:text-[9px] xms:text-[9px] xs:text-[9px] font-semibold overflow-hidden line-clamp-2  py-1 cursor-pointer xls:h-[50px] xms:h-[50px] xs:h-[50px] h-[45px]"
          >
            {item?.product_name?.length > 45 ? (
              <span>{item?.product_name?.substring(0, 45) + "...."}</span>
            ) : (
              <span>{item?.product_name}</span>
            )}
          </Link>
          <div className="font-semibold text-black text-center xls:text-xs xms:text-xs xs:text-xs font-sans">
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
        </div>
        {item?.stock_products?.length == 0 ? (
          <div
            className="uppercase mt-1 text-white  bg-[#DE606B] text-xs xls:text-[10px] xms:text-[9px] xs:text-[7px] py-[2px] flex justify-center rounded-full h-[22px] mb-2 mx-2"
            onClick={() => handleRequestStock(item?.slug, item?.id)}
          >
            request stock
          </div>
        ) : (
          <div className="h-[22px] mb-2"></div>
        )}
        <div
          onClick={() => router.push(`/products/${item?.slug}`)}
          className="absolute top-4 left-0 z-10 w-[60px] "
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
      {/* <QuickViewModal
        quickViewModal={quickViewModal}
        setQuickViewModal={setQuickViewModal}
        prodId={prodId}
        setProdId={setProdId}
      /> */}
    </>
  );
};

export default SingleProduct;
