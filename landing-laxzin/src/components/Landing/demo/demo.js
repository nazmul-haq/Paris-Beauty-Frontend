import { useStatus } from "@/context/contextStatus";
import { imagePath } from "@/lib/config";
import postRequest from "@/lib/postRequest";
import request from "@/lib/request";
import Image from "next/image";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiMinus } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import { RiStarFill } from "react-icons/ri";
import { TiLockClosed } from "react-icons/ti";
import { toast } from "react-toastify";

const DemoNine = ({ eightSectionRef, deliveryCharge }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const [data, setdata] = useState([]);

  const [renderMe, setrenderMe] = useState(false);
  const [renderMe1, setrenderMe1] = useState(false);
  const [renderMe2, setrenderMe2] = useState(false);
  const [promo, setPromo] = useState(null);
  const [type, setType] = useState();
  const [promoValue, setPromoValue] = useState();
  const [couponId, setCouponId] = useState();



  const [indexNo, setindexNo] = useState(0);

  const [variationItem, setVariationItem] = useState([]);
  const [sizeVariation, setSizeVariation] = useState(null);
  const [count, setCount] = useState(1);

  const { cartItems, setCartItems, setOrderObj } = useStatus();
  const [colorVariationID, setColorVariationID] = useState(null);
  const [matchedItem, setMatchedItem] = useState([]);
  const [select, setSelect] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectVariation, setSelectVariation] = useState(null);
  const [colorValue, setColorValue] = useState(null);
  const [colorArr, setColorArr] = useState([]);
  const [colorImage, setColorImage] = useState(null);
 const [sizeIndexes, setSizeIndexes] = useState({});

   const [shippingCost, setShippingCost] = useState(null);

   const [error,setError] = useState('')

   const [selectedButton, setSelectedButton] = useState(null);

   const router = useRouter();

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

  const handleSizeVariation = (index,indexMatch, indexChild) => {
    setSizeVariation(
      `${matchedItem[indexMatch].children[indexChild].id}-${matchedItem[indexMatch].children[indexChild].id}`
    );
    matchedItem[indexMatch].children[indexChild].isMatch = true;

    matchedItem[indexMatch].children?.map((attr, attrIndex) => {
      if (indexChild !== attrIndex) {
        attr.isMatch = false;
      }
    });

    

    setSizeIndexes((prev) => ({
      ...prev,
      [index]: indexChild, // Store size index per product
    }));

    setrenderMe(!renderMe);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        let res = await request(`get-landing-products`);
        let value = res?.data?.map((item, index) => {
          return {
            ...item,
            isMatchFirst: false,
          };
        });
        setdata(value);
        // setParcelWholeInfo(res);
      } catch (error) {}
    };
    getData();
  }, [renderMe1]);

  useEffect(() => {
    setCartItems(cartItems);
  }, [renderMe2]);

  useEffect(() => {
    if (data[indexNo]?.product_variation_status == 1) {
      if (data[indexNo]?.color_list?.length > 0) {
        setColorArr(data[indexNo]?.color_list);
        setColorValue(null);
        setColorImage(null);
        setColorVariationID(null);
      }
    } else {
      setColorImage(null);
    }
  }, [data, indexNo, data[indexNo]?.isMatchFirst]);

  useEffect(() => {
    if (data[indexNo]?.product_variation_status == 1) {
      if (data[indexNo]?.color_list?.length > 0) {
        const attrAscending = [...data[indexNo]?.available_attributes].sort(
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
        const attrAscending = [...data[indexNo]?.available_attributes].sort(
          (a, b) => a.id - b.id
        );
        let mergedArr = attrAscending?.map((item) => {
          let obj = { ...item };
          let children = [];

          data[indexNo]?.attributes_types?.forEach((variant) => {
            if (variant?.attribute_id === item?.id) {
              // children.push({
              //   ...variant?.applied_attributes,
              //   isMatch: false,
              // });
              variant?.applied_attributes?.forEach((childItem, childIndex) => {
                children.push({
                  ...childItem,
                  isMatch: false,
                });
              });
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
  }, [
    variationItem,
    data?.available_attributes,
    indexNo,
    data[indexNo]?.isMatchFirst,
  ]);

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
            storeSelectSizeValue.push(String(`${subItem?.value}`));
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
  }, [
    matchedItem,
    renderMe,
    colorVariationID,
    indexNo,
    data[indexNo]?.isMatchFirst,
  ]);

 
  // console.log("data[indexNo]", data[indexNo]);
  

  const handleDisabled = () => {
    if (
      data[indexNo]?.product_variation_status == 1 &&
      selectedItem == null &&
      selectVariation?.length > 0
    ) {
      toast.error(`There is no product in this variation`);
    }
  };

  useEffect(() => {
    if (select) {
      let a = data[indexNo]?.product_variants?.filter(
        (item) => item?.attribute_id == select
      );
      if (a?.length > 0) {
        setSelectedItem(a[0]);
        setCount(1);
      }
    }
  }, [select, indexNo]);

  const CheckBox = (index) => {
     setindexNo(index);

    let arr = [...data];

    // Toggle isMatchFirst value
    const isChecked = !arr[index].isMatchFirst;
    arr[index].isMatchFirst = isChecked;

    // Uncheck all other checkboxes
    arr.forEach((attr, attrIndex) => {
      if (index !== attrIndex) {
        attr.isMatchFirst = false;
      }
    });

    // Only call handleCart if checkbox is checked and product_variation_status is NOT 1
    if (isChecked && data[index]?.product_variation_status == 0) {
      handleCart(index);
    }

    setCount(1);
    setSelectedItem(null);
    setMatchedItem([]);
    setSelectVariation(null);
    setColorVariationID(null);

    setdata(arr);
    setrenderMe(!renderMe);
  };



 

  const handleCart = (mainIndex) => {
    
    
    
    if (data[mainIndex]?.product_variation_status == 1) {
      // console.log("called", data[indexNo]);

      if (selectedItem !== null) {
        let item = {
          product_id: data[mainIndex]?.id,
          variant_id: selectedItem?.id,

          name: data[mainIndex]?.product_name,
          image:
            data[mainIndex]?.product_variation_status == 1
              ? colorImage
                ? colorImage[0]
                : data[mainIndex]?.image[0]
              : data[mainIndex]?.image[0],
          sellingPrice: selectedItem?.sale_price,

          regularPrice: selectedItem?.regular_price,

          quantity: count,
          variations: selectVariation,

          stock:
            data[mainIndex]?.product_variation_status == 1
              ? selectedItem
                ? selectedItem?.qty
                : null
              : data[mainIndex]?.qty,
          discount:
            data[mainIndex]?.product_variation_status == 1
              ? selectedItem
                ? selectedItem?.discount
                : null
              : data[mainIndex]?.discount,
          sale_unit_id: data[mainIndex]?.unit_id,
          discount_type:
            data[mainIndex]?.product_variation_status == 1
              ? selectedItem
                ? selectedItem?.discount_type
                : null
              : data[mainIndex]?.discount_type,
        };

        const ecommerce = {
          currency: "BDT",

          items: [
            {
              item_id: data[mainIndex]?.id,
              item_name: data[mainIndex]?.product_name,
              item_brand: data[mainIndex]?.brands?.length
                ? data[mainIndex]?.brands[0]?.name
                : "",
              item_category: data[mainIndex]?.categories?.length
                ? data?.categories[0]
                : "",
              item_variant: selectVariation ? selectVariation : null,
              price: selectVariation
                ? selectedItem?.sale_price
                : data[mainIndex]?.sale_price,
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

          if (data[mainIndex]?.product_variation_status == 1) {
            // if (cartItems[index].quantity + item?.quantity <= selectedItem?.qty) {
            cartItems[index].quantity += count;

            setCartItems(cartItems);
            setrenderMe2(!renderMe2);

            toast.success("Product Added");
            setCount(1);

            window.dataLayer = window.dataLayer || [];
            dataLayer.push({
              event: "add_to_cart",
              ecommerce,
            });
          } else {
            cartItems[index].quantity += count;

            setCartItems(cartItems);
            setrenderMe2(!renderMe2);

            toast.success("Product Added");
            setCount(1);

            window.dataLayer = window.dataLayer || [];
            dataLayer.push({
              event: "add_to_cart",
              ecommerce,
            });
          }
        }

        if (is_exist === undefined) {
          if (data[mainIndex]?.product_variation_status == 1) {
            setCartItems((cartItems) => [...cartItems, item]);
            setCookie(null, "paris", JSON.stringify([...cartItems, item]), {
              maxAge: 30 * 24 * 60 * 60,
              path: "/",
            });
            window.dataLayer = window.dataLayer || [];
            dataLayer.push({
              event: "add_to_cart",
              ecommerce,
            });
          } else {
            setCartItems((cartItems) => [...cartItems, item]);
            setCookie(null, "paris", JSON.stringify([...cartItems, item]), {
              maxAge: 30 * 24 * 60 * 60,
              path: "/",
            });
            window.dataLayer = window.dataLayer || [];
            dataLayer.push({
              event: "add_to_cart",
              ecommerce,
            });
          }
        }
      } else {
        toast.error("Please select a variation");
      }
    } else {
      let item = {
        product_id: data[mainIndex]?.id,
        variant_id:
          data[mainIndex]?.product_variation_status == 1
            ? selectedItem?.id
            : null,
        name: data[mainIndex]?.product_name,
        image:
          data[mainIndex]?.product_variation_status == 1
            ? colorImage
              ? colorImage[0]
              : data[mainIndex]?.image[0]
            : data[mainIndex]?.image[0],
        sellingPrice:
          data[mainIndex]?.product_variation_status == 1
            ? selectedItem?.sale_price
            : data[mainIndex]?.sale_price,
        regularPrice:
          data[mainIndex]?.product_variation_status == 1
            ? selectedItem?.regular_price
            : data[mainIndex]?.regular_price,
        quantity: count,
        variations:
          data[mainIndex]?.product_variation_status == 1 && selectVariation
            ? selectVariation
            : null,
        stock:
          data[mainIndex]?.product_variation_status == 1
            ? selectedItem
              ? selectedItem?.qty
              : null
            : data[mainIndex]?.qty,
        discount:
          data[mainIndex]?.product_variation_status == 1
            ? selectedItem
              ? selectedItem?.discount
              : null
            : data[mainIndex]?.discount,
        sale_unit_id: data[mainIndex]?.unit_id,
        discount_type:
          data[mainIndex]?.product_variation_status == 1
            ? selectedItem
              ? selectedItem?.discount_type
              : null
            : data[mainIndex]?.discount_type,
      };

       const ecommerce = {
         currency: "BDT",

         items: [
           {
             item_id: data[mainIndex]?.id,
             item_name: data[mainIndex]?.product_name,
             item_brand: data[mainIndex]?.brands?.length
               ? data[mainIndex]?.brands[0]?.name
               : "",
             item_category: data[mainIndex]?.categories?.length
               ? data?.categories[0]
               : "",
             item_variant: selectVariation ? selectVariation : null,
             price: selectVariation
               ? selectedItem?.sale_price
               : data[mainIndex]?.sale_price,
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

        
        if (data[mainIndex]?.product_variation_status == 1) {
          // if (cartItems[index].quantity + item?.quantity <= selectedItem?.qty) {
          cartItems[index].quantity += count;

          setCartItems(cartItems);
          setrenderMe2(!renderMe2);

          toast.success("Product Added");
           setCount(1);
            window.dataLayer = window.dataLayer || [];
            dataLayer.push({
              event: "add_to_cart",
              ecommerce,
            });
        } else {
          cartItems[index].quantity += count;

          setCartItems(cartItems);
          setrenderMe2(!renderMe2);

          toast.success("Product Added");
           setCount(1);
            window.dataLayer = window.dataLayer || [];
            dataLayer.push({
              event: "add_to_cart",
              ecommerce,
            });
        }
      }

      if (is_exist === undefined) {
        if (data[mainIndex]?.product_variation_status == 1) {
          setCartItems((cartItems) => [...cartItems, item]);
          setCookie(null, "paris", JSON.stringify([...cartItems, item]), {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });
           window.dataLayer = window.dataLayer || [];
           dataLayer.push({
             event: "add_to_cart",
             ecommerce,
           });
        } else {
          setCartItems((cartItems) => [...cartItems, item]);
          setCookie(null, "paris", JSON.stringify([...cartItems, item]), {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });
           window.dataLayer = window.dataLayer || [];
           dataLayer.push({
             event: "add_to_cart",
             ecommerce,
           });
        }
      }
    }
  };

  const DeleteItem = (index) => {
    cartItems?.splice(index, 1);
    setCartItems(cartItems);
    setCookie(null, "paris", JSON.stringify(cartItems), {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    toast(`product removed successfully`);
    setrenderMe2(!renderMe2);
  };

  const onLoginSubmit = async (data) => {
    if (cartItems?.length == 0) {
      toast.error("you must have to add atleast 1 product");
      return;
    }

    if (shippingCost == null) {
      setError("you must select a delivery option");
      return;
    }

    let arr = [];

    cartItems?.map((item, index) => {
      arr.push({
        variant_id: item?.variant_id,
        product_id: item?.product_id,
        qty: item?.quantity,
        sale_unit_id: item?.sale_unit_id,
        net_unit_price: item?.sellingPrice,
        regular_price: item?.regularPrice,
        discount_type: item?.discount_type == "amount" ? 1 : 2,
        discount: item?.discount,
        discount_rate:
          (item?.discount_type == "amount"
            ? item?.discount
            : (item?.regularPrice * item?.discount) / 100) * item?.quantity,
        total: item?.sellingPrice * item?.quantity,
      });
    });

    let uniqueId = "INV-LND-" + (Math.random() + 1).toString(36).substr(2, 6);

    let total = cartItems?.reduce(
      (a, b) =>
        a +
        (b?.sellingPrice
          ? b?.sellingPrice * b?.quantity
          : b?.sellingPrice * b?.quantity),
      0
    );

    let obj = {
      invoice_no: uniqueId,
      customer_id: null,
      item: Number(cartItems?.length),
      total_qty: cartItems?.reduce(
        (a, b) => a + (b?.quantity ? b?.quantity : b?.quantity),
        0
      ),
      total_discount: 0,
      shipping_cost: Number(shippingCost),
      net_total: cartItems?.reduce(
        (a, b) =>
          a +
          (b?.sellingPrice
            ? b?.sellingPrice * b?.quantity
            : b?.sellingPrice * b?.quantity),
        0
      ),

      grand_total:
        type == 1
          ? Number(Number(total) - Number(promoValue) + shippingCost)
          : type == 2
          ? Number(
              Number(total) -
                (Number(total) * Number(promoValue)) / 100 +
                shippingCost
            )
          : Number(total) + shippingCost,
      sale_date: new Date().toISOString().split("T")[0],
      coupon_id: couponId ? Number(couponId) : null,
      name: data?.name,
      phone: data?.phone,
      information: data?.address,
      optional_information: data?.otherInfo,
      products: arr,
      website: "laxzin-landing",
    };

    try {
      let res = await postRequest("landing-checkout", obj);
      if (res?.success) {
        toast.success(res?.message);
        setCartItems([]);
        setrenderMe1(!renderMe1);
        setShippingCost(null);
        setOrderObj(res?.product_details);
        setCookie(null, "orderObj", JSON.stringify(res?.product_details), {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });

         const ecommerce = {
           transaction_id: "",
           currency: "BDT",
           name: data?.name,
           address: data?.address,
           phone: data?.phone,
           coupon: type ? Math.round(Number(promoValue).toFixed(2)) : "",
           value: Number(total),
           shipping: Number(shippingCost),
           items: arr,
         };

         window.dataLayer = window.dataLayer || [];
         dataLayer.push({
           event: "purchase",
           ecommerce,
         });
         router.push(`/order-successful`);
      } else {
           toast.error(res?.message);
      }
    } catch (error) {
      toast.warning(error?.message);
    }
  };







  const handleChange = (value) => {
    setPromo(value);
  };

  const handlePromo = async () => {
    const res = await postRequest(`coupon-code-check`, {
      coupon_code: promo,
    });

    if (res?.success) {
      setPromo(null);
      toast.success(`${res?.message}`);
      setType(res?.data?.type);
      setPromoValue(res?.data?.value);
      setCouponId(res?.data?.id);
    } else {
      toast.error(`${res?.message}`);
    }
  };

const handledeliveryCharge = (value,name)=>{
  setShippingCost(Number(value));
  setError('')

  setSelectedButton(name)

}


const total = cartItems?.reduce(
  (a, b) =>
    a +
    (b?.sellingPrice
      ? b?.sellingPrice * b?.quantity
      : b?.sellingPrice * b?.quantity),
  0
);


useEffect(() => {
  if(cartItems?.length > 0){
    
    
    let layerArr = [];

    cartItems?.map((item, index) => {
      layerArr.push({
        item_id: item?.product_id,
        item_name: item?.name,
        price: item?.sellingPrice,
        qty: item?.quantity,
      });
    });

    const ecommerce = {
      currency: "BDT",
      value: Number(total),
      coupon: Number(promoValue) ? Number(promoValue) : "",
      items: layerArr,
    };

    window.dataLayer = window.dataLayer || [];
    dataLayer.push({
      event: "begin_checkout",
      ecommerce,
    });

  }
  
}, [cartItems,total]);






const decrement = (index) => {
  let item = {
    product_id: data[index]?.id,
    variant_id: null,
    name: data[index]?.product_name,
    image: data[index]?.image[0],
    sellingPrice: data[index]?.sale_price,
    regularPrice: data[index]?.regular_price,
    quantity: count,
    variations: null,
    stock: data[index]?.qty,
    discount: data[index]?.discount,
    sale_unit_id: data[index]?.unit_id,
    discount_type: data[index]?.discount_type,
  };

  const is_exist = cartItems.find(
    (variation) =>
      variation.product_id == item.product_id &&
      variation.variant_id == item.variant_id
  );

  if (is_exist) {
    const cartCopy = [...cartItems]; // Create a shallow copy
    const itemIndex = cartCopy.findIndex(
      (variation) =>
        variation.product_id == is_exist.product_id &&
        variation.variant_id == is_exist.variant_id
    );

    if (itemIndex !== -1) {
      // Ensure quantity does not go below 1
      if (cartCopy[itemIndex].quantity > 1) {
        cartCopy[itemIndex] = {
          ...cartCopy[itemIndex],
          quantity: cartCopy[itemIndex].quantity - 1,
        };

        setCartItems(cartCopy);
        setrenderMe2((prev) => !prev);
        toast.success("Product quantity decreased");

        // Properly decrement count
        setCount((prev) => prev - 1);
      } 
    }
  }
};


const increment = (index) => {
  let item = {
    product_id: data[index]?.id,
    variant_id: null,
    name: data[index]?.product_name,
    image: data[index]?.image[0],
    sellingPrice: data[index]?.sale_price,
    regularPrice: data[index]?.regular_price,
    quantity: count,
    variations: null,
    stock: data[index]?.qty,
    discount: data[index]?.discount,
    sale_unit_id: data[index]?.unit_id,
    discount_type: data[index]?.discount_type,
  };

  const is_exist = cartItems.find(
    (variation) =>
      variation.product_id == item.product_id &&
      variation.variant_id == item.variant_id
  );

  if (is_exist) {
    const cartCopy = [...cartItems]; // Create a shallow copy
    const itemIndex = cartCopy.findIndex(
      (variation) =>
        variation.product_id == is_exist.product_id &&
        variation.variant_id == is_exist.variant_id
    );

    if (itemIndex !== -1) {
      cartCopy[itemIndex] = {
        ...cartCopy[itemIndex],
        quantity: cartCopy[itemIndex].quantity + 1, // Increment quantity properly
      };

      setCartItems(cartCopy);
      setrenderMe2((prev) => !prev);
      toast.success("Product Added");

      // Ensure count is incremented properly
      setCount((prev) => prev + 1);
    }
  } else {
    setCartItems((prevCart) => [...prevCart, item]);
    setCookie(null, "paris", JSON.stringify([...cartItems, item]), {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    // Ensure count increments properly
    setCount((prev) => prev + 1);
  }
};



 
  

  return (
    <div className="px-2" ref={eightSectionRef}>
      {/* <div className="text-[34px] font-bold text-center pt-[40px] text-[#D0868B] xs:text-[16px] xms:text-[16px] xls:text-[16px] sm:text-[20px]">
        এই পুরো প্যাকেজটি পাচ্ছেন মাত্র ১১৯৯ টাকায়।
      </div> */}
      <div className=" py-[40px] ">
        <div className="max-w-7xl mx-auto mt-[20px]">
          <div className="flex items-center justify-center">
            <div className="bg-primary-500 px-4 py-2 text-[24px] font-bold text-white rounded-3xl xs:text-[16px] xms:text-[16px] xls:text-[16px] sm:text-[20px]">
              অর্ডার করতে নিচের ফর্মটি সম্পূর্ন পূরন করুন।
            </div>
          </div>
          <div className="rounded-xl w-full bg-gradient-to-b from-primary-100 via-primary-300 to-primary-500 min-h-[500px] mt-[-25px]">
            <div className="pt-[50px]">
              <form onSubmit={handleSubmit(onLoginSubmit)}>
                <div className="grid grid-cols-2 gap-14 px-5 xs:px-2 xs:grid-cols-1 xms:px-2 xms:grid-cols-1 xls:px-2 xls:grid-cols-1 sm:px-2 sm:grid-cols-1">
                  <div className="col-span-1">
                    <div className="text-[20px] font-semibold py-4">
                      Billing details
                    </div>
                    <div className="">
                      <div className="w-full py-2">
                        <div className="text-[12px] flex">
                          আপনার নাম লিখুন{" "}
                          <RiStarFill className="text-[10px] text-red-600" />
                        </div>
                        <input
                          type="text"
                          className="outline-none  border border-[#b08020] w-full py-3 rounded-3xl px-3 text-[12px]"
                          autoComplete="off"
                          {...register("name", { required: true })}
                        />
                        {errors.name && errors.name.type === "required" && (
                          <span className="text-red-600 text-[14px]">
                            This field is required
                          </span>
                        )}
                      </div>
                      <div className="w-full py-2">
                        <div className="text-[12px] flex">
                          আপনার ফুল ঠিকানা লিখুন{" "}
                          <RiStarFill className="text-[10px] text-red-600" />
                        </div>
                        <input
                          type="text"
                          className="outline-none  border border-[#b08020] w-full py-3 rounded-3xl px-3 text-[12px]"
                          placeholder="হাউজ নাম্বার, রোড, ইউনিয়ন, উপজেলা"
                          autoComplete="off"
                          {...register("address", { required: true })}
                        />
                        {errors.address &&
                          errors.address.type === "required" && (
                            <span className="text-red-600 text-[14px]">
                              This field is required
                            </span>
                          )}
                      </div>
                      <div className="w-full py-2">
                        <div className="text-[12px] flex">
                          আপনার মোবাইল নম্বর লিখুন{" "}
                          <RiStarFill className="text-[10px] text-red-600" />
                        </div>
                        <input
                          type="text"
                          className="outline-none  border border-[#b08020] w-full py-3 rounded-3xl px-3 text-[12px]"
                          autoComplete="off"
                          {...register("phone", { required: true })}
                        />
                        {errors.phone && errors.phone.type === "required" && (
                          <span className="text-red-600 text-[14px]">
                            This field is required
                          </span>
                        )}
                      </div>
                      <div className="w-full py-2">
                        <div className="text-[12px] flex">
                          Order notes (optional){" "}
                          {/* <RiStarFill className="text-[10px] text-red-600" /> */}
                        </div>
                        <textarea
                          type="text"
                          className="outline-none  border border-[#b08020] w-full py-3 rounded-3xl px-3 text-[12px]"
                          placeholder="Notes about your order, e.g. special notes for delivery."
                          autoComplete="off"
                          {...register("otherInfo", { required: false })}
                        />
                        {errors.otherInfo &&
                          errors.otherInfo.type === "required" && (
                            <span className="text-red-600 text-[14px]">
                              This field is required
                            </span>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <div className="text-[20px] font-semibold py-4">
                      প্রোডাক্ট সিলেক্ট করুন
                    </div>
                    <div>
                      <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-[#F3F3F3] ">
                        <div className="grid grid-cols-12 py-4 border-b">
                          <div className="col-span-1  px-2"></div>
                          <div className="col-span-8  pl-10">Product</div>

                          <div className="col-span-3  pl-4 items-center">
                            Price
                          </div>
                        </div>
                        {data?.map((item, index) => (
                          <div key={index} className="border-b">
                            <div
                              className="grid grid-cols-12 py-2 cursor-pointer"
                              onClick={() => CheckBox(index)} // Handling click at parent div level
                            >
                              <div className="flex items-center pl-8 col-span-1">
                                <div className="flex items-center">
                                  <input
                                    id={`checkbox-table-${index}`}
                                    type="checkbox"
                                    checked={data[index]?.isMatchFirst}
                                    readOnly // Making it readOnly so it doesn't interfere with parent onClick
                                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                  />
                                  <label
                                    htmlFor={`checkbox-table-${index}`}
                                    className="sr-only"
                                  >
                                    checkbox
                                  </label>
                                </div>
                              </div>

                              <div className="col-span-8 pl-10 flex items-center font-semibold text-sm ">
                                <Image
                                  className="object-contain aspect-[1/1] mr-2"
                                  src={`${imagePath}/storage/product/${item?.image[0]}`}
                                  width={40}
                                  height={40}
                                  alt={"landing"}
                                />
                                {item?.product_name}
                              </div>

                              <div className="col-span-3 pl-4 flex items-center">
                                ৳{" "}
                                {item?.product_variation_status == 0
                                  ? item?.sale_price
                                  : item?.product_variants[
                                      sizeIndexes[index] || 0
                                    ]?.sale_price}
                              </div>
                            </div>

                            {item?.isMatchFirst ? (
                              <div className="px-14 mb-2">
                                <div className="flex flex-wrap flex-row mt-3 gap-2 w-2/3 md:w-full sm:w-full xls:w-full xms:w-full xs:w-full">
                                  {item?.color_list?.map((item, index) => (
                                    <div
                                      className={` ${
                                        colorVariationID == item?.id
                                          ? "bg-black text-white text-sm"
                                          : "bg-white border border-black text-black text-sm"
                                      }  py-1 cursor-pointer text-center`}
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
                                      {matchedItem?.map((item, indexMatch) => (
                                        <div className="mt-1 " key={indexMatch}>
                                          {item?.children?.length > 0 ? (
                                            <span>{item?.name} :</span>
                                          ) : null}

                                          <div className="flex flex-wrap flex-row  mt-1 gap-2 w-full ">
                                            {item?.children?.map(
                                              (variationItem, indexChild) => (
                                                <div
                                                  className={` ${
                                                    variationItem?.isMatch
                                                      ? "bg-black text-white text-sm px-2"
                                                      : "bg-white border border-black text-black text-sm px-2"
                                                  }  py-1 cursor-pointer text-center`}
                                                  key={indexChild}
                                                  onClick={() =>
                                                    handleSizeVariation(
                                                      index,
                                                      indexMatch,
                                                      indexChild,
                                                      item?.id,
                                                      variationItem?.id
                                                    )
                                                  }
                                                >
                                                  <div>
                                                    {variationItem?.value}
                                                  </div>
                                                </div>
                                              )
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </>
                                  ) : null}
                                </div>
                                <div className="grid grid-cols-12 gap-4 gap-x-4 mt-1 w-2/3 md:w-full sm:w-full xls:w-full xms:w-full xs:w-full">
                                  <div className="col-span-5 flex items-center justify-center border border-gray-200 py-2   outline-none">
                                    <button
                                      type="button"
                                      className=" cursor-pointer"
                                      onClick={() =>
                                        setCount(count > 1 ? count - 1 : 1)
                                      }
                                    >
                                      <BiMinus
                                        size={15}
                                        color="#000"
                                        className="font-semibold"
                                      />
                                    </button>
                                    <input
                                      type="text"
                                      value={count}
                                      className=" w-[50px] text-center bg-[#F3F3F3] dark:bg-[#F3F3F3]te font-semibold focus:outline-none"
                                      readOnly
                                    />

                                    <button
                                      type="button"
                                      className="cursor-pointer"
                                      onClick={() =>
                                        item?.product_variation_status == 1
                                          ? selectedItem !== null
                                            ? count < selectedItem?.qty
                                              ? setCount((c) => c + 1)
                                              : //  toast.error(
                                                //     "You cant add more than product!"
                                                //   )
                                                setCount((c) => c + 1)
                                            : toast.error(
                                                "Must select variation !"
                                              )
                                          : count < data[index]?.qty
                                          ? setCount((c) => c + 1)
                                          : // toast.error(
                                            //     "You cant add more than product!"
                                            //   )
                                            setCount((c) => c + 1)
                                      }
                                    >
                                      <BsPlusLg
                                        size={15}
                                        color="#000"
                                        className="font-semibold"
                                      />
                                    </button>
                                  </div>

                                  <div className="col-span-7 ">
                                    <div className="grid grid-cols-2 gap-5 w-2/3 md:w-full sm:w-full xls:w-full xms:w-full xs:w-full mt-2">
                                      <button
                                        type="button"
                                        className="bg-black cursor-pointer  tracking-wider text-center py-1 font-semibold text-base text-white "
                                        onClick={() => handleCart(index)}
                                      >
                                        Add
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-[20px] font-semibold py-6 text-white">
                      Your order
                    </div>
                    <div>
                      <div className="relative overflow-x-auto bg-gray-800">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 text-white">
                          <thead className="text-xs text-white uppercase border-b border-dashed border-white  bg-gray-700 ">
                            <tr>
                              <th scope="col" className="px-6 py-3">
                                Product
                              </th>

                              <th scope="col" className="px-6 py-3">
                                SubTotal
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {cartItems?.map((item, index) => (
                              <tr
                                key={index}
                                className={` ${
                                  index == cartItems?.length - 1
                                    ? "border-b border-dashed border-white"
                                    : ""
                                } dark:bg-gray-800 dark:border-gray-700`}
                              >
                                <th
                                  scope="row"
                                  className="flex items-center  px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  <img
                                    className="w-10 h-10 "
                                    src={`${imagePath}/storage/product/${item?.image}`}
                                    alt="Jese image"
                                  />
                                  <div className="pl-3">
                                    <div className="text-sm text-white font-semibold xls:w-[150px] xms:w-[140px] xs:w-[120px] w-full overflow-hidden whitespace-normal word-wrap break-word">
                                      {item?.name}
                                    </div>
                                    <div className="font-normal text-white text-[12px]">
                                      {item?.variations &&
                                        `(${item.variations[0]})`}
                                    </div>
                                  </div>
                                </th>
                                <td className="px-6 py-4">
                                  <div className="flex items-center">
                                    <div className="flex items-center text-white">
                                      × {item?.quantity} ৳ {item?.sellingPrice}
                                    </div>
                                    <div
                                      className="cursor-pointer"
                                      onClick={() => DeleteItem(index)}
                                    >
                                      <svg
                                        className="fill-current text-white ml-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="18"
                                        height="18"
                                      >
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                                      </svg>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}

                            <tr className=" dark:bg-gray-800 dark:border-gray-700  ">
                              <th
                                scope="row"
                                className="flex items-center px-6 py-2 text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                <div className="pl-3">
                                  <div className="text-base text-[13px] text-white">
                                    Sub Total
                                  </div>
                                </div>
                              </th>
                              <td className="px-6 py-0">
                                <div className="flex items-center text-white">
                                  ৳
                                  {cartItems?.reduce(
                                    (a, b) =>
                                      a +
                                      (b?.sellingPrice
                                        ? b?.sellingPrice * b?.quantity
                                        : b?.sellingPrice * b?.quantity),
                                    0
                                  )}
                                </div>
                              </td>
                            </tr>
                            <tr className=" border-b border-dashed border-white dark:bg-gray-800 dark:border-gray-700  ">
                              <th
                                scope="row"
                                className="flex items-center px-6 pb-2 text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                <div className="pl-3">
                                  <div className="text-base text-[13px] text-white">
                                    Shipping
                                  </div>
                                </div>
                              </th>
                              <td className="px-2 py-0 ">
                                <div className="mt-1 flex flex-wrap gap-2">
                                  {deliveryCharge?.data?.map((item, index) => (
                                    <label
                                      key={index}
                                      className={`flex items-center gap-2 cursor-pointer border rounded-lg px-1 py-1 bg-white text-black`}
                                    >
                                      <input
                                        type="checkbox"
                                        name="deliveryCharge"
                                        value={item?.name}
                                        checked={selectedButton?.includes(
                                          item?.name
                                        )}
                                        onChange={() =>
                                          handledeliveryCharge(
                                            item?.value,
                                            item?.name
                                          )
                                        }
                                        className="w-4 h-4 accent-indigo-500"
                                      />
                                      {item?.name} (৳ {item?.value})
                                    </label>
                                  ))}
                                </div>

                                <span className="text-red-600 py-2">
                                  {error}
                                </span>
                              </td>
                            </tr>
                            <tr className="  dark:bg-gray-800 dark:border-gray-700  ">
                              <th
                                scope="row"
                                className="flex items-center px-6 py-3 text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                <div className="pl-3">
                                  <div className="text-base text-[13px] text-white">
                                    Total
                                  </div>
                                </div>
                              </th>
                              <td className="px-6 py-0">
                                <div className="flex items-center text-[13px] text-white">
                                  ৳{" "}
                                  {type == 1
                                    ? Number(
                                        Number(total) -
                                          Number(promoValue) +
                                          shippingCost
                                      )
                                    : type == 2
                                    ? Number(
                                        Number(total) -
                                          (Number(total) * Number(promoValue)) /
                                            100 +
                                          shippingCost
                                      )
                                    : Number(total) + shippingCost}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="bg-white px-4 py-6 rounded-lg">
                      <div className="text-[14px]">Cash On Delivery</div>
                      <div className="text-[18px] bg-primary-500 py-2 px-2 mt-3 text-white">
                        পণ্য হাতে পেয়ে সম্পূর্ণ মূল্য পরিশোধ করতে হবে।
                      </div>
                    </div>
                    <div className="flex mt-4 sm:hidden xls:hidden xms:hidden xs:hidden">
                      <div className="w-full">
                        <input
                          type="text"
                          className="rounded-l-md h-10 w-full  px-3 bg-gray-200 outline-none placeholder:text-sm placeholder:text-gray-400"
                          placeholder="If you have a Promo Code, Enter Here..."
                          onChange={(event) => handleChange(event.target.value)}
                        />
                      </div>
                      <div onClick={() => handlePromo()}>
                        <button className="bg-white px-4 h-10 text-black font-semibold tracking-wide text-sm rounded-tr-md rounded-br-md">
                          Apply
                        </button>
                      </div>
                    </div>
                    <div className="text-[12px] text-white py-3">
                      Your personal data will be used to process your order,
                      support your experience throughout this website
                    </div>

                    <button
                      type="submit"
                      className="bg-primary-500 flex items-center justify-center py-2 rounded-3xl mb-5 w-full border-2 border-white"
                    >
                      <div className="text-[26px] text-white">
                        <TiLockClosed />
                      </div>
                      <div className="text-[22px] font-bold  px-2  text-white">
                        অর্ডার করুন ৳{" "}
                        {type == 1
                          ? Number(
                              Number(total) - Number(promoValue) + shippingCost
                            )
                          : type == 2
                          ? Number(
                              Number(total) -
                                (Number(total) * Number(promoValue)) / 100 +
                                shippingCost
                            )
                          : Number(total) + shippingCost}
                      </div>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoNine;
