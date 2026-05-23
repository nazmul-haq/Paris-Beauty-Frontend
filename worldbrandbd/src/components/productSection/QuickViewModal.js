import { useStatus } from "@/context/contextStatus";
import hostname from "@/lib/config";
import request from "@/lib/request";
import Link from "next/link";
import { setCookie } from "nookies";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { BiLeftArrowAlt, BiLinkAlt, BiMinus, BiRightArrowAlt } from "react-icons/bi";
import { BsInstagram, BsPlusLg } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { toast } from "react-toastify";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { ClipLoader } from 'react-spinners';
import { FiCopy } from "react-icons/fi";
// import PdfModal from "./PdfModal";
import { useRouter } from "next/router";
import Image from "next/image";

const QuickViewModal = ({
  quickViewModal,
  setQuickViewModal,
  prodId,
  setProdId,
}) => {
 
  const [data,setData] = useState({});

  const router = useRouter();

  const wrapperRef = useRef(null);


   const [renderMe, setRenderMe] = useState(false);

   const [variationItem, setVariationItem] = useState([]);
   const [sizeVariation, setSizeVariation] = useState(null);
   const [count, setCount] = useState(1);

   const { cartItems, setCartItems, setIsCartOpen,phone } = useStatus();
   const [colorVariationID, setColorVariationID] = useState(null);

   const [matchedItem, setMatchedItem] = useState([]);

   const [select, setSelect] = useState(null);

   const [selectVariation, setSelectVariation] = useState(null);
   const [colorValue, setColorValue] = useState(null);
   const [colorArr, setColorArr] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
     const [colorImage, setColorImage] = useState(null);
     const [loading,setLoading] = useState(true);

       const [pdfUrl, setPdfUrl] = useState(null);
       const [pdfModalOpen, setPdfModalOpen] = useState(false);

       const [totalQty, setTotalQty] = useState(null);

       const { sellertype, sellerTotalDiscount,token } =
         useStatus();


  const handleClick = () => {
    setQuickViewModal(false);
    setProdId(null);
    setData({});
    setColorImage(null);
    setLoading(true);
    setSelectedItem(null);

  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
        !event.target.classList.contains("fullscreen-element-class")
      ) {
        setQuickViewModal(false);
        setProdId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, quickViewModal]);

  

 

  useEffect(() => {
    if (prodId !== null) {
      const getData = async () => {
        let res = await request(
          `get-product-details/${prodId}`,
          token,
          sellertype
        );
         if(res?.success){
             setData(res?.data);
             setLoading(false);

         }
      };
      getData();
    }
  }, [prodId]);


    const handleColorVariation = (index, id, name, variationItem) => {
      setColorVariationID(id);
      setColorValue(name);
      const numAscending = [...Object.values(variationItem)].sort(
        (a, b) => a.id - b.id
      );
      setVariationItem(numAscending);
      if (colorArr[index]?.color_image_item?.length > 0) {
        setColorImage(colorArr[index]?.color_image_item);
      }
      
    };

    useEffect(() => {
      if (data?.product_variation_status == 1) {
        if (data?.color_list?.length > 0) {
          setColorArr(data?.color_list);
          setColorValue(null);
          
          setColorImage(null);
          setColorVariationID(null);
        }
      } else {
        setColorImage(null);
      }
    }, [data]);

    useEffect(() => {
      if (data?.product_variation_status == 1) {
        if (data?.color_list?.length > 0) {
          const attrAscending = [...data?.available_attributes].sort(
            (a, b) => a.id - b.id
          );
          let mergedArr = attrAscending?.map((item) => {
            let obj = { ...item };
            let children = [];

            Object.values(variationItem)?.forEach((variant) => {
              if (variant?.attribute_id === item?.id) {
                children.push({
                  ...variant,
                  isMatch: false,
                });
              }
            });

            obj.children = children;
            return obj;
          });

          setMatchedItem(mergedArr);
        } else {
          const attrAscending = [...data?.available_attributes].sort(
            (a, b) => a.id - b.id
          );
          let mergedArr = attrAscending?.map((item) => {
            let obj = { ...item };
            let children = [];

            data?.attributes_types?.forEach((variant) => {
              if (variant?.attribute_id === item?.id) {
                // children.push({
                //   ...variant?.applied_attributes,
                //   isMatch: false,
                // });
                variant?.applied_attributes?.forEach(
                  (childItem, childIndex) => {
                    children.push({
                      ...childItem,
                      isMatch: false,
                    });
                  }
                );
              }
            });

            obj.children = children;
            return obj;
          });

          setMatchedItem(mergedArr);
        }
      } else {
        setMatchedItem([]);
      }
    }, [variationItem, data?.available_attributes]);

    const handleSizeVariation = (index, indexChild) => {
      setSizeVariation(
        `${matchedItem[index].children[indexChild].id}-${matchedItem[index].children[indexChild].id}`
      );
      matchedItem[index].children[indexChild].isMatch = true;

      matchedItem[index].children?.map((attr, attrIndex) => {
        if (indexChild !== attrIndex) {
          attr.isMatch = false;
        }
      });

      setRenderMe(!renderMe);
    };

    useEffect(() => {
      if (matchedItem?.length > 0) {
        let storeSelectValue = [];
        let storeSelectSizeValue = [];

        if (colorVariationID !== null) {
          storeSelectValue.push(String(colorVariationID));
          storeSelectSizeValue.push(String(`color - ${colorValue}`));
        }

        matchedItem?.map((item, index) => {
          item?.children?.map((subItem, index) => {
            if (subItem?.isMatch) {
              storeSelectValue.push(String(subItem?.id));
              storeSelectSizeValue.push(
                String(`${item?.name} - ${subItem?.value}`)
              );
            }
          });
        });

        if (colorVariationID !== null) {
          if (storeSelectValue.length === matchedItem.length + 1) {
            setSelect(storeSelectValue.join("-"));
            setSelectVariation(storeSelectSizeValue);
          } else {
            setSelect("");
          }
        } else {
          if (storeSelectValue.length === matchedItem.length) {
            setSelect(storeSelectValue.join("-"));
            setSelectVariation(storeSelectSizeValue);
          } else {
            setSelect("");
          }
        }
      }
    }, [matchedItem, renderMe, colorVariationID]);

  

    useEffect(() => {
      if (select) {
        let a = data?.product_variants?.filter(
          (item) => item?.attribute_id == select
        );

        setSelectedItem(a[0]);
        setCount(1);
      }
    }, [select]);

     const handleCart = () => {
       if (
         (data?.product_variation_status == 1 && selectedItem !== null) ||
         data?.product_variation_status == 0
       ) {
         let item = {
           product_id: data?.id,
           slug: data?.slug,
           variant_id:
             data?.product_variation_status == 1 ? selectedItem?.id : null,
           name: data?.product_name,
           image:
             data?.product_variation_status == 1
               ? colorImage
                 ? colorImage[0]
                 : data?.image[0]
               : data?.image[0],
           sellingPrice:
             sellertype == "reseller" && sellerTotalDiscount
               ? data?.product_variation_status == 1
                 ? Math.round(
                     selectedItem?.regular_price -
                       (selectedItem?.regular_price * sellerTotalDiscount) / 100
                   )
                 : Math.round(
                     data?.regular_price -
                       (data?.regular_price * sellerTotalDiscount) / 100
                   )
               : data?.product_variation_status == 1
               ? selectedItem?.sale_price
               : data?.sale_price,
           regularPrice:
             data?.product_variation_status == 1
               ? selectedItem?.regular_price
               : data?.regular_price,
           quantity: count,
           variations:
             data?.product_variation_status == 1 && selectVariation
               ? selectVariation
               : null,
           stock:
             data?.product_variation_status == 1
               ? selectedItem
                 ? selectedItem?.qty
                 : null
               : data?.qty,
           discount:
             data?.product_variation_status == 1
               ? selectedItem
                 ? selectedItem?.discount
                 : null
               : data?.discount,
           sale_unit_id: data?.unit_id,
           discount_type:
             data?.product_variation_status == 1
               ? selectedItem
                 ? selectedItem?.discount_type
                 : null
               : data?.discount_type,
         };

          const ecommerce = {
            currency: "BDT",
            customer_phone: phone,
            items: [
              {
                item_id: data?.sku,
                item_name: data?.product_name,
                item_brand: data?.brands?.length ? data?.brands[0]?.name : "",
                item_category: data?.categories?.length
                  ? data?.categories[0]
                  : "",
                item_variant: selectVariation ? selectVariation : null,
                price: selectVariation
                  ? selectedItem?.sale_price
                  : data?.sale_price,
                quantity: count,
              },
            ],
          };

         const is_exist = cartItems.find(
           (variation) =>
             variation.product_id == item.product_id &&
             variation.variant_id == item.variant_id
         );

         if (is_exist) {
           const index = cartItems.findIndex(
             (variation) =>
               variation?.product_id == is_exist.product_id &&
               variation.variant_id == is_exist.variant_id
           );

           if (data?.product_variation_status == 1) {
             if (
               cartItems[index].quantity + item?.quantity <=
               selectedItem?.qty
             ) {
               cartItems[index].quantity += count;

               setCartItems(cartItems);
               setCookie(null, "parisBd", JSON.stringify(cartItems), {
                 maxAge: 30 * 24 * 60 * 60,
                 path: "/",
               });
                 window.dataLayer = window.dataLayer || [];
                 dataLayer.push({
                   event: "add_to_cart",
                   ecommerce,
                 });
               setIsCartOpen(true);
               setQuickViewModal(false);
                
             } else {
               toast.error("Out of stock");
             }
           } else {
             if (cartItems[index].quantity + item?.quantity <= data?.qty) {
               cartItems[index].quantity += count;

               setCartItems(cartItems);
               setCookie(null, "parisBd", JSON.stringify(cartItems), {
                 maxAge: 30 * 24 * 60 * 60,
                 path: "/",
               });
                 window.dataLayer = window.dataLayer || [];
                 dataLayer.push({
                   event: "add_to_cart",
                   ecommerce,
                 });
               setIsCartOpen(true);
               setQuickViewModal(false);
              
             } else {
               toast.error("Out of stock");
             }
           }
         }

         if (is_exist === undefined) {
           if (data?.product_variation_status == 1) {
             if (selectedItem?.qty > 0) {
               setCartItems((cartItems) => [...cartItems, item]);
               setCookie(
                 null,
                 "parisBd",
                 JSON.stringify([...cartItems, item]),
                 {
                   maxAge: 30 * 24 * 60 * 60,
                   path: "/",
                 }
               );

               
               setIsCartOpen(true);
               setQuickViewModal(false);
                 window.dataLayer = window.dataLayer || [];
                 dataLayer.push({
                   event: "add_to_cart",
                   ecommerce,
                 });
             } else {
               toast.error("Out of stock");
             }
           } else {
             if (data?.qty > 0) {
               setCartItems((cartItems) => [...cartItems, item]);
               setCookie(
                 null,
                 "parisBd",
                 JSON.stringify([...cartItems, item]),
                 {
                   maxAge: 30 * 24 * 60 * 60,
                   path: "/",
                 }
               );

              
               setIsCartOpen(true);
               setQuickViewModal(false);
                  window.dataLayer = window.dataLayer || [];
                  dataLayer.push({
                    event: "add_to_cart",
                    ecommerce,
                  });
             } else {
               toast.error("Out of stock");
             }
           }
         }
       } else {
         toast.error(`please select a size`);
       }
     };

     
  const handleOrder = () => {
    if (
      (data?.product_variation_status == 1 && selectedItem !== null) ||
      data?.product_variation_status == 0
    ) {
      let item = {
        product_id: data?.id,
        slug: data?.slug,
        variant_id:
          data?.product_variation_status == 1 ? selectedItem?.id : null,
        name: data?.product_name,
        image:
          data?.product_variation_status == 1
            ? colorImage
              ? colorImage[0]
              : data?.image[0]
            : data?.image[0],
        regularPrice:
          data?.product_variation_status == 1
            ? selectedItem?.regular_price
            : data?.regular_price,

        sellingPrice:
          sellertype == "reseller" && sellerTotalDiscount
            ? data?.product_variation_status == 1
              ? Math.round(
                  selectedItem?.regular_price -
                    (selectedItem?.regular_price * sellerTotalDiscount) / 100
                )
              : Math.round(
                  data?.regular_price -
                    (data?.regular_price * sellerTotalDiscount) / 100
                )
            : data?.product_variation_status == 1
            ? selectedItem?.sale_price
            : data?.sale_price,
        quantity: count,
        variations:
          data?.product_variation_status == 1 && selectVariation
            ? selectVariation
            : null,
        stock:
          data?.product_variation_status == 1
            ? selectedItem
              ? selectedItem?.qty
              : null
            : data?.qty,
        discount:
          data?.product_variation_status == 1
            ? selectedItem
              ? selectedItem?.discount
              : null
            : data?.discount,
        sale_unit_id: data?.unit_id,
        discount_type:
          data?.product_variation_status == 1
            ? selectedItem
              ? selectedItem?.discount_type
              : null
            : data?.discount_type,
      };

          const ecommerce = {
            currency: "BDT",
            customer_phone: phone,
            items: [
              {
                item_id: data?.sku,
                item_name: data?.product_name,
                item_brand: data?.brands?.length ? data?.brands[0]?.name : "",
                item_category: data?.categories?.length
                  ? data?.categories[0]
                  : "",
                item_variant: selectVariation ? selectVariation : null,
                price: selectVariation
                  ? selectedItem?.sale_price
                  : data?.sale_price,
                quantity: count,
              },
            ],
          };
      const is_exist = cartItems.find(
        (variation) =>
          variation.product_id == item.product_id &&
          variation.variant_id == item.variant_id
      );

      if (is_exist) {
        const index = cartItems.findIndex(
          (variation) =>
            variation?.product_id == is_exist.product_id &&
            variation.variant_id == is_exist.variant_id
        );

        if (data?.product_variation_status == 1) {
          if (cartItems[index].quantity + item?.quantity <= selectedItem?.qty) {
            cartItems[index].quantity += count;

            setCartItems(cartItems);
            setCookie(null, "parisBd", JSON.stringify(cartItems), {
              maxAge: 30 * 24 * 60 * 60,
              path: "/",
            });
            window.dataLayer = window.dataLayer || [];
            dataLayer.push({
              event: "add_to_cart",
              ecommerce,
            });
            setQuickViewModal(false);
            router.push(`/checkout`);
          } else {
            toast.error("Out of stock");
          }
        } else {
          if (cartItems[index].quantity + item?.quantity <= data?.qty) {
            cartItems[index].quantity += count;

            setCartItems(cartItems);
            setCookie(null, "parisBd", JSON.stringify(cartItems), {
              maxAge: 30 * 24 * 60 * 60,
              path: "/",
            });
            window.dataLayer = window.dataLayer || [];
            dataLayer.push({
              event: "add_to_cart",
              ecommerce,
            });
            setQuickViewModal(false);
            router.push(`/checkout`);
          } else {
            toast.error("Out of stock");
          }
        }
      }

      if (is_exist === undefined) {
        if (data?.product_variation_status == 1) {
          if (selectedItem?.qty > 0) {
            setCartItems((cartItems) => [...cartItems, item]);
            setCookie(
              null,
              "parisBd",
              JSON.stringify([...cartItems, item]),
              {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
              }
            );
            window.dataLayer = window.dataLayer || [];
            dataLayer.push({
              event: "add_to_cart",
              ecommerce,
            });
            setQuickViewModal(false);
            toast.success("Product Added");
            router.push(`/checkout`);
          } else {
            toast.error("Out of Stock");
          }
        } else {
          if (data?.qty > 0) {
            setCartItems((cartItems) => [...cartItems, item]);
            setCookie(
              null,
              "parisBd",
              JSON.stringify([...cartItems, item]),
              {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
              }
            );
            window.dataLayer = window.dataLayer || [];
            dataLayer.push({
              event: "add_to_cart",
              ecommerce,
            });
           setQuickViewModal(false);
            toast.success("Product Added");
            router.push(`/checkout`);
          } else {
            toast.error("Out of stock");
          }
        }
      }
    } else {
       toast.error(`please select a size`);
    }
  };


     const handleDisabled = () => {
       if (
         data?.product_variation_status == 1 &&
         selectedItem == null &&
         selectVariation?.length > 0
       ) {
         toast.error(`There is no product in this variation`);
       }
     };
  
    

    

     const handleCopyClick = async () => {
       try {
         await navigator.clipboard.writeText(data?.sku);
         toast.success("SKU number copied to clipboard");
       } catch (error) {
         console.error("Failed to copy text: ", error);
       }
     };

      const handleSizeModal = () => {
        setPdfModalOpen(true);
        setPdfUrl(data?.pdf_file);
        setQuickViewModal(false);
      }; 

  
      useEffect(() => {
        if (data?.product_variation_status == 1) {
          let dd = data?.product_variants?.reduce((a, b) => a + b?.qty, 0);
          setTotalQty(dd);
        } else {
          setTotalQty(data?.qty);
        }
      }, [data]);

  return (
    <>
      {quickViewModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-10 z-40" />
      )}
      <div
        className={`${
          quickViewModal
            ? "translate-x-[16px] duration-500 z-50 fixed top-[0px] bottom-0 bg-white w-[560px] xls:w-[350px] xms:w-[310px] xs:w-[280px] right-[15px]  shadow-lg drop-shadow-sm text-black"
            : "translate-x-[606px] duration-500 z-50 fixed top-[0px] bottom-0 bg-white w-[560px] xls:w-[350px] xms:w-[310px] xs:w-[280px]  right-[15px] shadow-lg drop-shadow-sm text-black"
        } `}
        ref={wrapperRef}
      >
        <div className=" h-full w-full top-[0px] left-0 right-0 bottom-0 overflow-y-auto">
          <div
            onClick={() => handleClick()}
            className="cursor-pointer absolute top-[15px] left-[-25px] bg-white group hover:bg-red-600 duration-300 py-2 px-2 flex justify-center items-center h-12 w-12 rounded-full shadow-md"
          >
            <AiOutlineRight
              size={20}
              className="text-black group-hover:text-white"
            />
          </div>
          {loading ? (
            <div className="h-full flex justify-center items-center">
              <ClipLoader color="#dc2626" size={50} />
            </div>
          ) : (
            <div className="dark:text-black px-6 py-4">
              <div className="relative  cursor-pointer">
                {Object.keys(data)?.length > 0 ? (
                  <>
                    {colorImage !== null &&
                    data?.product_variation_status == 1 ? (
                      <>
                        <Swiper
                          slidesPerView={1}
                          navigation={{
                            nextEl: ".button-next-slide",
                            prevEl: ".button-prev-slide",
                          }}
                          modules={[Navigation]}
                        >
                          {colorImage?.map((item, index) => (
                            <SwiperSlide
                              className="flex justify-center"
                              key={index}
                            >
                              <Image
                                src={`${
                                  hostname.ImageHostName
                                }/storage/product/${encodeURIComponent(item)} `}
                                height={250}
                                width={250}
                                loading="lazy"
                                className="object-contain h-auto"
                              />
                            </SwiperSlide>
                          ))}

                          <div className="button-prev-slide w-[30px] h-[30px] rounded-full shadow-xl drop-shadow-lg hover:scale-150 transition duration-200 bg-slate-50 text-black grid place-items-center absolute top-[47%] z-10 left-[30px] cursor-pointer">
                            <BiLeftArrowAlt
                              size={20}
                              className="text-primary"
                            />
                          </div>

                          <div className="button-next-slide w-[30px] h-[30px] rounded-full shadow-xl drop-shadow-lg hover:scale-150 transition duration-200 bg-slate-50 text-black grid place-items-center absolute top-[47%] z-10 right-[30px] cursor-pointer">
                            <BiRightArrowAlt
                              size={20}
                              className="text-primary"
                            />
                          </div>
                        </Swiper>
                      </>
                    ) : (
                      <>
                        <Swiper
                          slidesPerView={1}
                          navigation={{
                            nextEl: ".button-next-slide",
                            prevEl: ".button-prev-slide",
                          }}
                          modules={[Navigation]}
                        >
                          {data?.image?.map((item, index) => (
                            <SwiperSlide key={index}>
                              <Image
                                src={`${hostname.ImageHostName}/storage/product/${encodeURIComponent(item)}`}
                                height={250}
                                width={250}
                                loading="lazy"
                                className="object-contain h-auto"
                                alt="product"
                              />
                            </SwiperSlide>
                          ))}

                          <div className="button-prev-slide w-[30px] h-[30px] rounded-full shadow-xl drop-shadow-lg hover:scale-150 transition duration-200 bg-slate-50 text-black grid place-items-center absolute top-[47%] z-10 left-[30px] cursor-pointer">
                            <BiLeftArrowAlt
                              size={20}
                              className="text-primary"
                            />
                          </div>

                          <div className="button-next-slide w-[30px] h-[30px] rounded-full shadow-xl drop-shadow-lg hover:scale-150 transition duration-200 bg-slate-50 text-black grid place-items-center absolute top-[47%] z-10 right-[30px] cursor-pointer">
                            <BiRightArrowAlt
                              size={20}
                              className="text-primary"
                            />
                          </div>
                        </Swiper>
                      </>
                    )}
                  </>
                ) : null}
              </div>
              <div className="relative flex justify-center cursor-pointer"></div>

              <div className="text-2xl xls:text-base xms:text-base xs:text-base font-semibold pt-5">
                {data?.product_name}
              </div>
              <div className="text-2xl mt-1 font-semibold font-sans flex items-center space-x-3">
                TK.{" "}
                <>
                  {data?.product_variation_status == 0 ? (
                    <>
                      {data?.sale_price == data?.regular_price ? null : (
                        <div className="line-through">
                          <span className="pl-2">
                            {data?.regular_price * count}
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {data?.product_variants[0]?.sale_price ==
                      data?.product_variants[0]?.regular_price ? null : (
                        <div className="line-through">
                          <span className="pl-2">
                            {data?.product_variants[0]?.regular_price * count}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </>
                <span className="pl-2">
                  {data?.product_variation_status == 1 ? (
                    <>
                      {selectedItem == null
                        ? Math.round(
                            data?.product_variants[0]?.sale_price * count
                          )
                        : Math.round(selectedItem?.sale_price) * count}
                    </>
                  ) : (
                    data?.sale_price * count
                  )}
                </span>
              </div>
              <div className="mt-2 flex items-center space-x-3">
                <span className="font-semibold ">SKU:</span>{" "}
                <span className="text-sm text-gray-600">{data?.sku}</span>
                <span
                  className="bg-gray-200 rounded-full px-2 py-2 cursor-pointer"
                  onClick={handleCopyClick}
                >
                  <FiCopy size={14} className="text-black" />
                </span>
              </div>
              {data?.pdf_file !== null ? (
                <div className="mt-3" onClick={() => handleSizeModal()}>
                  <button className="bg-gray-100 shadow-sm text-blue-500 px-4 py-2 rounded-md text-sm">
                    View size guide
                  </button>
                </div>
              ) : null}
              <div className="grid grid-cols-4  gap-4 w-full">
                {data?.color_list?.map((item, index) => (
                  <div
                    className={` ${
                      colorVariationID == item?.id
                        ? "bg-black text-white text-sm"
                        : "bg-white border border-black text-black text-sm"
                    }  py-2 cursor-pointer text-center`}
                    key={index}
                    onClick={() =>
                      handleColorVariation(
                        index,
                        item?.id,
                        item?.name,
                        item?.current_color_variations
                      )
                    }
                  >
                    <div>{item?.name}</div>
                  </div>
                ))}
              </div>
              <div>
                {matchedItem?.length > 0 ? (
                  <>
                    {matchedItem?.map((item, index) => (
                      <div className="mt-0" key={index}>
                        {item?.children?.length > 0 ? (
                          <span>{item?.name} :</span>
                        ) : null}

                        <div className="grid grid-cols-4  gap-4 w-full">
                          {item?.children?.map((variationItem, indexChild) => (
                            <div key={indexChild}>
                              {variationItem?.isMatch &&
                              selectedItem?.qty == 0 ? (
                                <span className="text-red-500 text-xs">
                                  Out of stock
                                </span>
                              ) : (
                                <p className="mt-2"></p>
                              )}

                              <div
                                className={`${
                                  variationItem?.isMatch
                                    ? selectedItem?.qty === 0
                                      ? "border border-red-500 bg-red-500 text-white text-sm"
                                      : "bg-black text-white text-sm"
                                    : "bg-white border border-black text-black text-sm"
                                } py-2 cursor-pointer text-center`}
                                onClick={() =>
                                  handleSizeVariation(
                                    index,
                                    indexChild,
                                    item?.id,
                                    variationItem?.id
                                  )
                                }
                              >
                                <div>{variationItem?.value}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </>
                ) : null}
              </div>

              {totalQty == 0 ? (
                <div className=" text-red-500 pt-4">Out of stock</div>
              ) : null}

              <div className="grid grid-cols-12 gap-x-4 mt-4 w-full">
                <div className="col-span-5 flex items-center justify-center border border-gray-200 py-3 rounded-xl  outline-none">
                  <div
                    className=" cursor-pointer"
                    onClick={() => setCount(count > 1 ? count - 1 : 1)}
                  >
                    <BiMinus size={15} color="#000" className="font-semibold" />
                  </div>
                  <input
                    type="text"
                    value={count}
                    className=" w-[50px] text-center dark:bg-white font-semibold focus:outline-none"
                    readOnly
                  />

                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      data?.product_variation_status == 1
                        ? selectedItem !== null
                          ? count < selectedItem?.qty
                            ? setCount((c) => c + 1)
                            : toast.error("You cant add more than product!")
                          : toast.error("Must select variation !")
                        : count < data?.qty
                        ? setCount((c) => c + 1)
                        : toast.error("You cant add more than product!")
                    }
                  >
                    <BsPlusLg
                      size={15}
                      color="#000"
                      className="font-semibold"
                    />
                  </div>
                </div>
              </div>

              {data?.product_variation_status == 1 &&
              selectedItem == null &&
              selectVariation?.length > 0 ? (
                <div className="grid grid-cols-2 gap-5 w-2/3 md:w-full sm:w-full xls:w-full xms:w-full xs:w-full mt-3">
                  <div
                    className="bg-gray-900 cursor-pointer  tracking-wider text-center py-2 font-semibold text-base text-black "
                    onClick={() => handleDisabled()}
                  >
                    <div>Add to cart</div>
                  </div>
                  <div
                    className="bg-tahiti-500 cursor-pointer  tracking-wider text-center py-2 font-semibold text-base text-black "
                    onClick={() => handleDisabled()}
                  >
                    <div>Order now</div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-5 w-2/3 md:w-full sm:w-full xls:w-full xms:w-full xs:w-full mt-3">
                  <div
                    className="bg-gray-900 cursor-pointer  tracking-wider text-center py-3 font-semibold text-base text-white rounded-md"
                    onClick={() => handleCart()}
                  >
                    <div>Add to cart</div>
                  </div>
                  <div
                    className="bg-tahiti-500 cursor-pointer  tracking-wider text-center py-3 font-semibold text-base text-white rounded-md"
                    onClick={() => handleOrder()}
                  >
                    <div>Order now</div>
                  </div>
                </div>
              )}

              {/* <div className="mt-6 w-2/3 flex justify-start space-x-4">
                <div className="text-lg font-semibold">Share to: </div>

                <FaFacebookF size={25} className="text-black" />

                <BsInstagram size={25} className="text-black" />
              </div> */}

              {/* {Object.keys(data)?.length > 0 &&
              data?.stock_visibility_state == 1 ? (
                <div className="mt-6 flex justify-center ">
                  <button className="font-semibold uppercase text-lg px-4 py-2 border-2 border-black flex justify-center">
                    Check in store availability
                  </button>
                </div>
              ) : null} */}
              {/* {deliveryData !== null ? (
                <div className="mt-6 ">
                  <div className="text-center font-semibold text-2xl pb-4">
                    Super Fast Home Delivery
                  </div>

                  <div className="flex space-x-2 items-center justify-center">
                    <button className="px-3 py-2 bg-gray-200 text-black rounded-md">
                      Inside Dhaka
                    </button>
                    <div className="font-semibold">
                      After confirm order within 24 hours - (
                      {deliveryData[0]?.value} Taka )
                    </div>
                  </div>
                  <div className="flex space-x-2 items-center justify-center mt-3">
                    <button className="px-3 py-2 bg-gray-200 text-black rounded-md">
                      Outside Dhaka
                    </button>
                    <div className=" font-semibold">
                      After confirm order within 72 hours - (
                      {deliveryData[1]?.value} Taka )
                    </div>
                  </div>
                </div>
              ) : null} */}
            </div>
          )}
        </div>
        {/* <PdfModal
          pdfModalOpen={pdfModalOpen}
          setPdfModalOpen={setPdfModalOpen}
          pdfUrl={pdfUrl}
        /> */}
      </div>
    </>
  );
};

export default QuickViewModal;
