import { useStatus } from "@/context/contextStatus";
import postRequest from "@/lib/postRequest";
import request from "@/lib/request";
import dayjs from "dayjs";
import Head from "next/head";
import { useRouter } from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import { TiDeleteOutline } from "react-icons/ti";
import hostname from "@/lib/config";
import { AiTwotoneDelete } from "react-icons/ai";
import Image from "next/image";

const Checkout = () => {
  const {
    renderMe,
    cartItems,
    type,
    setType,
    promoValue,
    setPromoValue,
    userId,
    couponId,
    setCouponId,
    setCartItems,
    setIsRenderMe,
    setOrderObj,
  } = useStatus();

  const [deliveryData, setDeliveryData] = useState([]);

  const router = useRouter();

  const [total, setTotal] = useState(0);
  const [promo, setPromo] = useState("");

  const [totalQty, setTotalQty] = useState(0);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [payment, setPayment] = useState("cod");

  const [districts, setDistricts] = useState([]);

  const [allUpozilas, setAllUpozilas] = useState([]);

  const [selctedDistrict, setSelectedDistrict] = useState("");

  const [selectUpozila, setSelectUpozila] = useState("Select Area");

  const [upozilaList, setUpozilaList] = useState([]);

  const [shippingOption, setShippingOption] = useState("Out Side Dhaka");
  const [deliveryFee, setDeliveryFee] = useState(null);

  const [count, setCount] = useState(1);

  const [deleteItems, setDeleteItems] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      let res = await request(`delivery-charge`);
      setDeliveryData(res?.data);
    };
    getData();
  }, []);

  useEffect(() => {
    if (deliveryData) {
      setDeliveryFee(deliveryData[1]?.value);
    }
  }, [deliveryData]);

  useEffect(() => {
    const getData = async () => {
      let res = await request(`district-with-upozila`);

      setDistricts(res?.districts);
      setAllUpozilas(res?.upozilas);
    };
    getData();
  }, []);

  const handleDistrictChange = (value) => {
    setSelectedDistrict(districts[value]?.name);

    setSelectUpozila("Select Area");

    const filteredupozila = allUpozilas?.filter(
      (upazila, index) => upazila?.district_id == districts[value]?.id
    );

    if (filteredupozila) setUpozilaList(filteredupozila);
  };

  useEffect(() => {
    if (selctedDistrict == "Dhaka") {
      if (selectUpozila == "Dhaka Sadar") {
        setShippingOption("In Side Of Dhaka");
        setDeliveryFee(deliveryData[0]?.value);
      } else {
        setShippingOption("Dhaka Sub Area");
        setDeliveryFee(deliveryData[2]?.value);
      }
    } else {
      setShippingOption("Out Side Dhaka");
      setDeliveryFee(deliveryData[1]?.value);
    }
  }, [selctedDistrict, selectUpozila]);

  useEffect(() => {
    let dd = cartItems?.reduce(
      (a, b) =>
        a +
        (b?.sellingPrice
          ? b?.sellingPrice * b?.quantity
          : b?.sellingPrice * b?.quantity),
      0
    );

    setTotal(Number(dd));
  }, [renderMe]);

  const handleChange = (value) => {
    setPromo(value);
  };

  const handlePromo = async () => {
    const res = await postRequest(`coupon-code-check`, {
      coupon_code: promo,
    });

    if (res?.success) {
      setPromo("");
      toast.success(`${res?.message}`);

      setType(res?.data?.type);
      setCookie(null, "type", res?.data?.type, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      setPromoValue(res?.data?.value);
      setCookie(null, "promovalue", res?.data?.value, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      setCouponId(res?.data?.id);
      setCookie(null, "couponid", res?.data?.id, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    } else {
      toast.error(`${res?.message}`);
    }
  };

  useEffect(() => {
    let totalQuantity = cartItems?.reduce((a, b) => a + b?.quantity, 0);

    setTotalQty(Number(totalQuantity));
  }, [renderMe]);

  let arr = [];
  let layerArr = [];
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
    layerArr.push({
      item_id: item?.sku,
      item_name: item?.name,
      index: index,

      item_variant: item?.variations,
      price: item?.sellingPrice,
      quantity: item?.quantity,
    });
  });

  useEffect(() => {
    let layerArr = [];

    cartItems?.map((item, index) => {
      layerArr.push({
        item_id: item?.sku,
        item_name: item?.name,
        index: index,
        item_variant: item?.variations,
        price: item?.sellingPrice,
        quantity: item?.quantity,
      });
    });
    const ecommerce = {
      currency: "BDT",
      value: cartItems?.reduce(
        (a, b) =>
          a +
          (b?.sellingPrice
            ? b?.sellingPrice * b?.quantity
            : b?.sellingPrice * b?.quantity),
        0
      ),

      coupon: type ? Math.round(Number(promoValue).toFixed(2)) : "",
      items: layerArr,
    };

    window.dataLayer = window.dataLayer || [];
    dataLayer.push({
      event: "begin_checkout",
      ecommerce,
    });
  }, [renderMe]);

  const handleOrder = async () => {
    let validation = false;

    if (cartItems?.length == 0) {
      validation = true;
      toast.error("you must have to add atleast 1 product");
      return;
    }

    if (name == "" || name == undefined) {
      toast.error("name is required");
      return;
    }

    if (phone == "" || phone == undefined) {
      toast.error("Phone number is required");
      return;
    }

    if (phone) {
      var bdMobilePattern = /^(\+)?(88)?01[3-9]\d{8}$/;
      if (bdMobilePattern.test(phone)) {
      } else {
        toast.error("Not a valid phone number");

        return;
      }
    }

    if (selctedDistrict == "") {
      toast.error("City is required");
      return;
    }

    if (selectUpozila == "" || selectUpozila == "Select Area") {
      toast.error("Area is required");
      return;
    }

    if (address == "") {
      validation = true;
      toast.error("Address is required");
      return;
    }

    let uniqueId =
      "ECOM-" + (Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000);

    setIsLoading(true);
    let obj = {
      invoice_no: uniqueId,
      customer_id: userId ? Number(userId) : null,
      item: Number(cartItems?.length),
      total_qty: Number(totalQty),
      coupon_type: type ? Number(type) : null,
      coupon_discount: type ? Math.round(Number(promoValue).toFixed(2)) : null,
      coupon_rate: type
        ? type == 1
          ? Math.round(Number(promoValue).toFixed(2))
          : Math.round((Number(total) * Number(promoValue)) / 100)
        : null,
      shipping_cost: deliveryFee,
      net_total: Math.round(total),
      grand_total:
        type == 1
          ? Number(Number(total) - Number(promoValue) + deliveryFee)
          : type == 2
          ? Number(
              Number(total) -
                (Number(total) * Number(promoValue)) / 100 +
                deliveryFee
            )
          : Number(total + deliveryFee),
      sale_date: dayjs(new Date()).format("YYYY-MM-DD"),
      coupon_id: couponId ? Number(couponId) : null,
      name: name,
      phone: phone,
      information: address,
      s_product: arr,
      payment_via: payment == "bkash" ? "bkash" : "cod", //cod,bkash,rocket,nagad
    };

    let res = await postRequest(`checkout`, obj);

    if (res?.success) {
      const ecommerce = {
        transaction_id: "",
        currency: "BDT",
        name: name,
        address: address,
        phone: phone,
        coupon: type ? Math.round(Number(promoValue).toFixed(2)) : "",
        value: Math.round(total),
        shipping: deliveryFee,
        items: layerArr,
      };

      window.dataLayer = window.dataLayer || [];
      dataLayer.push({
        event: "purchase",
        ecommerce,
      });

      destroyCookie([], "parisBd", {
        path: "/",
      });
      setCartItems([]);
      setType(null);
      setOrderObj(res?.product_details);
      setCookie(null, "orderObj", JSON.stringify(res?.product_details), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      destroyCookie(null, "type", {
        path: "/",
      });
      setType(null);

      setPromoValue(null);
      destroyCookie(null, "promovalue", {
        path: "/",
      });
      setCouponId("");
      destroyCookie(null, "couponid", {
        path: "/",
      });

      setIsRenderMe(!renderMe);
      setIsLoading(false);
      if (payment == "bkash") {
        window.location.href = res?.bkash_url;
      } else {
        router.push(`/order-successful`);
      }

      toast.success(`${res?.message}`);
    } else {
      toast.error(`${res?.message}`);
      setIsLoading(false);
    }
  };

  const handleCouponDelete = () => {
    setPromo("");
    setType(null);

    destroyCookie(null, "type", {
      path: "/",
    });

    setPromoValue(null);
    destroyCookie(null, "promovalue", {
      path: "/",
    });
    setCouponId("");
    destroyCookie(null, "couponid", {
      path: "/",
    });

    toast.success("Coupon successfully Deleted!");
  };

  const AddCart = (index) => {
    if (cartItems[index]?.quantity < cartItems[index]?.stock) {
      cartItems[index].quantity += count;
      setCartItems(cartItems);
      setCookie(null, "marsCart", JSON.stringify(cartItems), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      setIsRenderMe(!renderMe);
    } else {
      toast.error(`Out of stock`);
    }
  };

  const SubCart = (index) => {
    if (cartItems[index]?.quantity > 0) {
      cartItems[index].quantity -= count;
      setCartItems(cartItems);
      setCookie(null, "parisBd", JSON.stringify(cartItems), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    }
    if (cartItems[index]?.quantity === 0) {
      cartItems?.splice(index, 1);
      setCartItems(cartItems);
      setCookie(null, "parisBd", JSON.stringify(cartItems), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      toast(`product removed successfully`);
    }
    setIsRenderMe(!renderMe);
  };

  const DeleteItem = (index) => {
    setDeleteItems((prevData) => prevData.concat(cartItems[index]));

    setCartItems(cartItems.filter((item, idx) => idx !== index));
    setCookie(null, "parisBd", JSON.stringify(cartItems), {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    setIsRenderMe(!renderMe);
  };

  return (
    <>
      <Head>
        <title>ParisBd/checkout</title>
        <meta name="description" content="ParisBd" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-[600px] bg-white pt-[170px] sm:pt-14 xls:pt-[40px] xms:pt-[40px] xs:pt-[40px] font-sans">
        <div className="max-w-7xl lg:max-w-[70rem] md:max-w-[60rem] sm:max-w-[45rem] xls:max-w-[25rem] xms:max-w-[22rem] xs:max-w-[19rem] mx-auto">
          <div className="grid grid-cols-12 gap-5 pb-10">
            <div className="col-span-7 sm:col-span-full xls:col-span-full xms:col-span-full xs:col-span-full sm:pt-24 xls:pt-24 xms:pt-24 xs:pt-24">
              <div>
                <div className="font-semibold text-2xl uppercase">
                  billing & shipping
                </div>

                <div className="mt-3">
                  <div className="grid grid-cols-2 xls:grid-cols-1 xms:grid-cols-1 xs:grid-cols-1 gap-4">
                    <div>
                      <input
                        className="border-2 border-gray-300 h-[25px] w-full pl-2 py-5 rounded-md outline-none bg-white text-sm text-black placeholder:text-sm"
                        value={name}
                        placeholder="Name"
                        onChange={(event) => setName(event.target.value)}
                      />
                    </div>

                    <div>
                      <input
                        className="border-2 border-gray-300 h-[25px] w-full pl-2 py-5 rounded-md outline-none bg-white text-sm text-black placeholder:text-sm"
                        value={phone}
                        placeholder="Phone"
                        onChange={(event) => setPhone(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 xls:grid-cols-1 xms:grid-cols-1 xs:grid-cols-1 gap-4 mt-3">
                    <div>
                      <select
                        className="bg-white border-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        onChange={(e) => handleDistrictChange(e.target.value)}
                      >
                        <option value="" disabled selected>
                          Select city
                        </option>
                        {districts?.map((item, index) => (
                          <option value={index} key={index}>
                            {item?.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <select
                        className="bg-white border-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        onChange={(e) => {
                          setSelectUpozila(e.target.value);
                        }}
                        value={selectUpozila}
                      >
                        <option value="" selected>
                          Select Area
                        </option>
                        {upozilaList?.map((item, index) => (
                          <option value={item?.name} key={index}>
                            {item?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-3">
                    <input
                      className="border-2 border-gray-300 h-[25px] w-full pl-2 py-5 rounded-md outline-none bg-white text-sm text-black placeholder:text-sm"
                      value={address}
                      placeholder="Address"
                      onChange={(event) => setAddress(event.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 ">
                <div className="font-semibold text-2xl uppercase">
                  Product Details
                </div>
                {cartItems?.length > 0 ? (
                  <div className=" font-sans">
                    <div className=" space-y-4 ">
                      {cartItems?.map((item, index) => (
                        <div
                          className={`flex items-center space-x-2 ${
                            index !== cartItems.length - 1
                              ? "border-b border-gray-200 pb-2"
                              : ""
                          }`}
                          key={index}
                        >
                          <div className="h-36 w-40 bg-gray-300">
                            <Image
                              height={144}
                              width={160}
                              src={`${
                                hostname.ImageHostName
                              }/storage/product/${encodeURIComponent(
                                item?.image
                              )}`}
                              className="h-full w-full object-fill"
                              onError={(e) => {
                                e.target.onerror = null; // Prevents an infinite loop in case the placeholder fails
                                e.target.src = "/assets/placeholder_600x.webp"; // Placeholder image
                              }}
                              alt="product"
                            />
                          </div>
                          <div className="w-full flex items-center justify-between">
                            <div>
                              <div className="text-sm uppercase font-medium">
                                {item?.name}
                              </div>

                              <div className="flex items-center space-x-2">
                                <div className=" flex  items-center justify-center ">
                                  <button
                                    className="bg-gray-700 rounded-sm text-[18px] text-white w-[30px] h-[30px] font-extrabold"
                                    onClick={() => SubCart(index)}
                                  >
                                    -
                                  </button>
                                  <input
                                    value={item?.quantity}
                                    className=" outline-none w-[60px] xls:w-[40px] xms:w-[40px] xs:w-[30px]  h-[30px] text-center border-t-[2px] border-b-[2px] border-tahiti-500"
                                    readOnly
                                  />
                                  <button
                                    onClick={() => AddCart(index)}
                                    className="bg-tahiti-500 rounded-sm text-[18px] text-white w-[30px] h-[30px] font-extrabold"
                                  >
                                    +
                                  </button>
                                </div>
                                <div className="text-sm uppercase font-medium">
                                  <span className="uppercase text-red-600">
                                    {" "}
                                    TK.{" "}
                                    {Number(item?.sellingPrice) *
                                      Number(item?.quantity)}
                                  </span>
                                </div>
                              </div>

                              {item?.variations == null ? null : (
                                <div className="mt-3">
                                  <div className="text-xs tracking-wider font-semibold pb-1">
                                    {item?.variations}
                                  </div>
                                </div>
                              )}
                            </div>
                            <div
                              className="cursor-pointer "
                              onClick={() => DeleteItem(index)}
                              title="Delete"
                            >
                              <AiTwotoneDelete
                                size={22}
                                className="text-red-500"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-black text-2xl xls:text-xl xms:text-base xs:text-sm text-center font-semibold pt-7 pb-3">
                    Your Shopping Bag is Empty
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-5 sm:col-span-full xls:col-span-full xms:col-span-full xs:col-span-full mt-3 pl-5 sm:pl-0 xls:pl-0 xms:pl-0 xs:pl-0 border-l-2 sm:border-none xls:border-none xms:border-none xs:border-none border-gray-300">
              <div>
                <p className="capitalize text-lg text-red-500">
                  have coupon / voucher?
                </p>

                <div className="flex items-center space-x-3 mt-2">
                  <div className="w-full">
                    <input
                      type="text"
                      className="rounded-md py-2 w-full  px-3 bg-white border-2 border-gray-300 outline-none placeholder:text-sm"
                      placeholder="Coupon Code"
                      onChange={(event) => handleChange(event.target.value)}
                      value={promo}
                    />
                  </div>
                  <div>
                    <button
                      className="bg-red-500 px-4 h-10 text-white tracking-wide text-base rounded-lg"
                      onClick={() => handlePromo()}
                    >
                      Apply
                    </button>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="capitalize font-semibold text-lg">
                    Choose Shipping Method
                  </p>

                  <div className="my-3">
                    <div>
                      <label
                        htmlFor="Out Side Dhaka"
                        className="flex items-center cursor-pointer justify-between w-full"
                      >
                        <div className="flex items-center ">
                          <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                            <input
                              checked={shippingOption == "Out Side Dhaka"}
                              type="radio"
                              id="Out Side Dhaka"
                              className="appearance-none focus:opacity-100 focus:ring-indigo-700 focus:outline-none border rounded-full border-indigo-600 absolute cursor-pointer w-full h-full checked:border-none"
                            />
                            <div
                              className={`check-icon ${
                                shippingOption === "Out Side Dhaka"
                                  ? "block"
                                  : "hidden"
                              } border-4 border-indigo-700 rounded-full w-full h-full z-1`}
                            ></div>
                          </div>
                          <p className="ml-2  text-black text-base">
                            {deliveryData[1]?.name}
                          </p>
                        </div>
                        <p className=" text-black pl-1">
                          ৳ {deliveryData[1]?.value}
                        </p>
                      </label>
                    </div>
                    <div className="pt-2">
                      <label
                        htmlFor="Dhaka Sub Area"
                        className="flex items-center cursor-pointer justify-between w-full"
                      >
                        <div className="flex items-center ">
                          <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                            <input
                              checked={shippingOption === "Dhaka Sub Area"}
                              type="radio"
                              id="Dhaka Sub Area"
                              name="shippingOption"
                              className="appearance-none focus:opacity-100 focus:ring-indigo-700 focus:outline-none border rounded-full border-indigo-600 absolute cursor-pointer w-full h-full checked:border-none"
                            />
                            <div
                              className={`check-icon ${
                                shippingOption === "Dhaka Sub Area"
                                  ? "block"
                                  : "hidden"
                              } border-4 border-indigo-700 rounded-full w-full h-full z-1`}
                            ></div>
                          </div>
                          <p className="ml-2  text-black text-base">
                            {deliveryData[2]?.name}
                          </p>
                        </div>
                        <p className=" text-black pl-1">
                          ৳ {deliveryData[2]?.value}
                        </p>
                      </label>
                    </div>
                    <div className="pt-2">
                      <label
                        htmlFor="In Side Of Dhaka"
                        className="flex items-center cursor-pointer justify-between w-full"
                      >
                        <div className="flex items-center ">
                          <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                            <input
                              checked={shippingOption === "In Side Of Dhaka"}
                              type="radio"
                              id="In Side Of Dhaka"
                              name="shippingOption"
                              className="appearance-none focus:opacity-100 focus:ring-indigo-700 focus:outline-none border rounded-full border-indigo-600 absolute cursor-pointer w-full h-full checked:border-none"
                            />
                            <div
                              className={`check-icon ${
                                shippingOption === "In Side Of Dhaka"
                                  ? "block"
                                  : "hidden"
                              } border-4 border-indigo-700 rounded-full w-full h-full z-1`}
                            ></div>
                          </div>
                          <p className="ml-2  text-black text-base">
                            {deliveryData[0]?.name}
                          </p>
                        </div>
                        <p className=" text-black pl-1">
                          ৳ {deliveryData[0]?.value}
                        </p>
                      </label>
                    </div>
                    {type == 1 ? (
                      <div className="flex justify-between items-center py-4 ">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-black">Discount</p>
                          <button onClick={() => handleCouponDelete()}>
                            <TiDeleteOutline
                              size={22}
                              className="text-red-500 cursor-pointer"
                            />
                          </button>
                        </div>
                        <h2 className="font-semibold text-base text-black">
                          ৳ {Number(promoValue).toFixed(2)}
                        </h2>
                      </div>
                    ) : type == 2 ? (
                      <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-black">Discount</p>
                          <button onClick={() => handleCouponDelete()}>
                            <TiDeleteOutline
                              size={22}
                              className="text-red-500 cursor-pointer"
                            />
                          </button>
                        </div>
                        <h2 className="font-semibold text-base text-black">
                          ৳{" "}
                          {Math.round(
                            (Number(total) * Number(promoValue)) / 100
                          )}
                        </h2>
                      </div>
                    ) : null}
                    <div>
                      <div
                        className={`flex items-center justify-between pb-3 ${
                          type ? "mt-0" : "mt-3"
                        } border-b-2 border-gray-300`}
                      >
                        <p>Total MRP</p>
                        <p className=" text-black pl-1">৳ {total}</p>
                      </div>

                      <div className="flex items-center justify-between pt-3">
                        <p className="font-semibold text-xl capitalize">
                          Total amount
                        </p>
                        {deliveryFee == null ? (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <ThreeDots
                              height="30"
                              width="30"
                              radius="9"
                              color="#1F2937"
                              ariaLabel="three-dots-loading"
                              wrapperStyle={{}}
                              visible={true}
                            />
                          </div>
                        ) : (
                          <p className=" text-red-600 font-semibold text-xl">
                            ৳{" "}
                            {type == 1
                              ? Math.round(total) + deliveryFee - promoValue
                              : type == 2
                              ? Math.round(total) +
                                deliveryFee -
                                Math.round(
                                  (Number(total) * Number(promoValue)) / 100
                                )
                              : Math.round(total) + deliveryFee}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="my-3">
                  <p className="capitalize font-semibold text-lg">
                    Choose Shipping Method
                  </p>

                  <div className="my-3">
                    <div>
                      <label
                        htmlFor="cod"
                        className="flex items-center cursor-pointer justify-between w-full"
                      >
                        <div className="flex items-center ">
                          <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                            <input
                              checked={payment === "cod"}
                              type="radio"
                              id="cod"
                              name="payment"
                              className="appearance-none focus:opacity-100 focus:ring-indigo-700 focus:outline-none border rounded-full border-indigo-600 absolute cursor-pointer w-full h-full checked:border-none"
                              onChange={() => setPayment("cod")}
                            />
                            <div
                              className={`check-icon ${
                                payment === "cod" ? "block" : "hidden"
                              } border-4 border-indigo-700 rounded-full w-full h-full z-1`}
                            ></div>
                          </div>
                          <p className="ml-2  text-black text-base capitalize">
                            cash on delivery
                          </p>
                        </div>
                      </label>
                    </div>
                    <div className="pt-2">
                      <label
                        htmlFor="bkash"
                        className="flex items-center cursor-pointer justify-between w-full"
                      >
                        <div className="flex items-center ">
                          <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                            <input
                              checked={payment === "bkash"}
                              type="radio"
                              id="bkash"
                              name="payment"
                              className="appearance-none focus:opacity-100 focus:ring-indigo-700 focus:outline-none border rounded-full border-indigo-600 absolute cursor-pointer w-full h-full checked:border-none"
                              onChange={() => setPayment("bkash")}
                            />
                            <div
                              className={`check-icon ${
                                payment === "bkash" ? "block" : "hidden"
                              } border-4 border-indigo-700 rounded-full w-full h-full z-1`}
                            ></div>
                          </div>
                          <p className="ml-2  text-black text-base">Bkash</p>
                        </div>
                      </label>
                    </div>

                    {/* <div className="pt-2">
                      <label
                        htmlFor="card"
                        className="flex items-center cursor-pointer justify-between w-full"
                      >
                        <div className="flex items-center ">
                          <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                            <input
                              checked={payment === "card"}
                              type="radio"
                              id="card"
                              name="payment"
                              className="appearance-none focus:opacity-100 focus:ring-indigo-700 focus:outline-none border rounded-full border-indigo-600 absolute cursor-pointer w-full h-full checked:border-none"
                              onChange={() => setPayment("card")}
                            />
                            <div
                              className={`check-icon ${
                                payment === "card" ? "block" : "hidden"
                              } border-4 border-indigo-700 rounded-full w-full h-full z-1`}
                            ></div>
                          </div>
                          <p className="ml-2  text-black text-base">
                            Pay with Card/Mobile Wallet
                          </p>
                        </div>
                      </label>
                    </div> */}
                  </div>
                </div>
                {isLoading ? (
                  <button className="bg-myBlue-700 w-full bg-red-500  px-8 py-3 rounded-md cursor-pointer flex space-x-1 disabled justify-center items-center">
                    <svg
                      className="fill-current text-white animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C12.5523 2 13 2.44772 13 3V6C13 6.55228 12.5523 7 12 7C11.4477 7 11 6.55228 11 6V3C11 2.44772 11.4477 2 12 2ZM12 17C12.5523 17 13 17.4477 13 18V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V18C11 17.4477 11.4477 17 12 17ZM22 12C22 12.5523 21.5523 13 21 13H18C17.4477 13 17 12.5523 17 12C17 11.4477 17.4477 11 18 11H21C21.5523 11 22 11.4477 22 12ZM7 12C7 12.5523 6.55228 13 6 13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H6C6.55228 11 7 11.4477 7 12ZM19.0711 19.0711C18.6805 19.4616 18.0474 19.4616 17.6569 19.0711L15.5355 16.9497C15.145 16.5592 15.145 15.9261 15.5355 15.5355C15.9261 15.145 16.5592 15.145 16.9497 15.5355L19.0711 17.6569C19.4616 18.0474 19.4616 18.6805 19.0711 19.0711ZM8.46447 8.46447C8.07394 8.85499 7.44078 8.85499 7.05025 8.46447L4.92893 6.34315C4.53841 5.95262 4.53841 5.31946 4.92893 4.92893C5.31946 4.53841 5.95262 4.53841 6.34315 4.92893L8.46447 7.05025C8.85499 7.44078 8.85499 8.07394 8.46447 8.46447ZM4.92893 19.0711C4.53841 18.6805 4.53841 18.0474 4.92893 17.6569L7.05025 15.5355C7.44078 15.145 8.07394 15.145 8.46447 15.5355C8.85499 15.9261 8.85499 16.5592 8.46447 16.9497L6.34315 19.0711C5.95262 19.4616 5.31946 19.4616 4.92893 19.0711ZM15.5355 8.46447C15.145 8.07394 15.145 7.44078 15.5355 7.05025L17.6569 4.92893C18.0474 4.53841 18.6805 4.53841 19.0711 4.92893C19.4616 5.31946 19.4616 5.95262 19.0711 6.34315L16.9497 8.46447C16.5592 8.85499 15.9261 8.85499 15.5355 8.46447Z"></path>
                    </svg>
                    <p className="text-white">Proceeding To Payment...</p>
                  </button>
                ) : (
                  <div className="w-full mt-6" onClick={() => handleOrder()}>
                    <button className="w-full flex justify-center text-white bg-red-500  text-lg py-3 rounded-lg capitalize">
                      place order
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
