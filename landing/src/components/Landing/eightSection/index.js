import { imagePath } from "@/lib/config";
import postRequest from "@/lib/postRequest";
import request from "@/lib/request";
import { customAlphabet } from "nanoid";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RiStarFill } from "react-icons/ri";
import { TiLockClosed } from "react-icons/ti";
import { toast } from "react-toastify";
import Image from "next/image";



const EightSection = ({eightSectionRef}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();


  // const eightSectionRef = useRef(null);
  const [productList, setproductList] = useState();
  const [count, setcount] = useState(1);
  const [renderMe, setrenderMe] = useState(false);
  const [renderMe1, setrenderMe1] = useState(false);
  const [newproduct, setnewproduct] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        let res = await request(`get-landing-products`);

        let value = res?.data?.product_variants.map((item, index) => {
          return {
            ...item,
            checked: false,
            product_image: res?.data?.product_image,
            qty: 1,
            name: res?.data?.product_name,
            product_id: res?.data?.id,
          };
        });
        setproductList(value);
        // setParcelWholeInfo(res);
      } catch (error) {}
    };
    getData();
  }, [renderMe1]);

  const subQty = (index) => {
    const arr = [...productList];
    if (arr[index]?.qty > 1) {
      arr[index].qty -= 1;
      setproductList(arr);
      setrenderMe(!renderMe);
    }
  };
  const addQty = (index) => {
    const arr = [...productList];
    arr[index].qty += 1;
    setproductList(arr);
    setrenderMe(!renderMe);
  };

  const CheckBox = async (index) => {
    let arr = productList;
    arr[index].checked
      ? (arr[index]["checked"] = false)
      : (arr[index]["checked"] = true);

    const checkedProducts = arr.filter((product) => product.checked);

    setproductList(arr);
    setnewproduct(checkedProducts);
    setrenderMe(!renderMe);
  };

  const onLoginSubmit = async (data) => {


    
    if(newproduct?.length == 0){
      toast.error("you must have to add atleast 1 product");
      return;

   }

    let products = newproduct.map((item, index) => {
      return {
        product_id: item?.product_id,
        variant_id: item?.id,
        qty: item?.qty,
        net_unit_price: item?.sale_price,
      };
    });

    const nanoAllowed = `0123456789`;
    const nanoid = customAlphabet(nanoAllowed, 10);
    let invoiceNo = nanoid(6)

    let payLoad = {
      invoice_no: `INV-LND-${invoiceNo}`,
      item: products?.length,
      total_qty: newproduct?.reduce(
        (a, b) => a + (b?.qty ? b?.qty : b?.qty),
        0
      ),
      total_discount: 0,
      shipping_cost: 0,
      net_total: newproduct?.reduce(
        (a, b) =>
          a + (b?.sale_price ? b?.sale_price * b?.qty : b?.sale_price * b?.qty),
        0
      ),
      grand_total: newproduct?.reduce(
        (a, b) =>
          a + (b?.sale_price ? b?.sale_price * b?.qty : b?.sale_price * b?.qty),
        0
      ),
      sale_date:new Date().toISOString().split('T')[0],
      coupon_id: null,
      name: data?.name,
      phone: data?.phone,
      information: data?.address,
      optional_information: data?.otherInfo,
      products: products,
    };
    try {
      let res = await postRequest('landing-checkout',payLoad)
      if(res){
        toast(res?.message)
        setnewproduct([])
       setrenderMe1(!renderMe1)
      }
    } catch (error) {
      toast.warning(error?.message);
    }
  };

  // console.log("newList1", newproduct);
  return (
    <div className="px-2" ref={eightSectionRef}>
      <div className="text-[34px] font-bold text-center pt-[40px] text-[#D0868B] xs:text-[16px] xms:text-[16px] xls:text-[16px] sm:text-[20px]">
        এই পুরো প্যাকেজটি পাচ্ছেন মাত্র ১১৯৯ টাকায়।
      </div>
      <div className=" py-[40px] ">
        <div className="max-w-6xl mx-auto mt-[20px]">
          <div className="flex items-center justify-center">
            <div className="bg-[#b08020] px-4 py-2 text-[24px] font-bold text-white rounded-3xl xs:text-[16px] xms:text-[16px] xls:text-[16px] sm:text-[20px]">
              অর্ডার করতে নিচের ফর্মটি সম্পূর্ন পূরন করুন।
            </div>
          </div>
          <div className="rounded-xl w-full bg-[#f6ecb8] min-h-[500px] mt-[-25px]">
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
                          <span className="text-red-300 text-[14px]">
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
                            <span className="text-red-300 text-[14px]">
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
                          <span className="text-red-300 text-[14px]">
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
                        {errors.otherInfo && errors.otherInfo.type === "required" && (
                          <span className="text-red-300 text-[14px]">
                            This field is required
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <div className="text-[20px] font-semibold py-4">
                      সাইজ সিলেক্ট করুন
                    </div>
                    <div>
                      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                          <thead className="text-xs text-gray-700 uppercase bg-[#F3F3F3] dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                              <th scope="col" className="p-4"></th>
                              <th scope="col" className="px-2 py-3">
                                Product name
                              </th>
                              <th scope="col" className="px-2 py-3 text-center">
                                Quantity
                              </th>

                              <th scope="col" className="px-3 py-3 text-center">
                                Price
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {productList?.map((item, index) => (
                              <tr
                                key={index}
                                className="bg-[#F3F3F3] border-b dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-600"
                              >
                                <td className="w-4 p-4">
                                  <div className="flex items-center">
                                    <input
                                      id="checkbox-table-3"
                                      type="checkbox"
                                      checked={productList[index]?.checked}
                                      onChange={() => CheckBox(index)}
                                      className="w-4 h-4  bg-gray-100 border-gray-300 rounded  dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label
                                      for="checkbox-table-3"
                                      className="sr-only"
                                    >
                                      checkbox
                                    </label>
                                  </div>
                                </td>
                                <th
                                  scope="row"
                                  className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  <div className="text-[14px] font-bold">
                                    {item?.name}
                                  </div>
                                  <div className="text-[12px] text-[#1249]">
                                    Size: {item?.size}
                                  </div>
                                </th>
                                <td className="px-2 py-4">
                                  <div className=" flex items-center justify-center border">
                                    <div
                                      onClick={() => subQty(index)}
                                      className=" rounded-sm text-[18px] text-tahiti-50 w-full h-[30px] font-extrabold flex items-center justify-center cursor-pointer"
                                    >
                                      -
                                    </div>
                                    <input
                                      readOnly
                                      className="outline-none w-[30px] h-[30px] text-center"
                                      value={productList[index]?.qty}
                                    />
                                    <div
                                      onClick={(e) => addQty(index, e)}
                                      className=" rounded-sm text-[18px] text-tahiti-50 w-full h-[30px] font-extrabold flex items-center justify-center cursor-pointer"
                                    >
                                      +
                                    </div>
                                  </div>
                                </td>
                                <td className="px-3 py-4 text-center">
                                  ৳{item?.sale_price * item?.qty}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="text-[20px] font-semibold py-6">
                      Your order
                    </div>
                    <div>
                      <div className="relative overflow-x-auto ">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                          <thead className="text-xs text-gray-700 uppercase border-b border-dashed border-white  dark:bg-gray-700 dark:text-gray-400">
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
                            {newproduct.map((item, index) => (
                              <tr
                                key={index}
                                className={` ${
                                  index == newproduct?.length - 1
                                    ? "border-b border-dashed border-white"
                                    : ""
                                } dark:bg-gray-800 dark:border-gray-700`}
                              >
                                <th
                                  scope="row"
                                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  <Image
                                    className="w-10 h-10 "
                                    src={`${imagePath}/${item?.product_image}`}
                                    alt="Jese image"
                                    width={40}
                                    height={40}
                                  />
                                  <div className="pl-3">
                                    <div className="text-base font-semibold">
                                      {item?.name}
                                    </div>
                                    <div className="font-normal text-gray-500 text-[12px]">
                                      Package - {item?.size}
                                    </div>
                                  </div>
                                </th>
                                <td className="px-6 py-4">
                                  <div className="flex items-center">
                                    × {item?.qty} ৳ {" "}
                                    {item?.sale_price * item?.qty}
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
                                  <div className="text-base text-[13px]">
                                    Sub Total
                                  </div>
                                </div>
                              </th>
                              <td className="px-6 py-0">
                                <div className="flex items-center">
                                  × {" "}
                                  {newproduct?.reduce(
                                    (a, b) => a + (b?.qty ? b?.qty : b?.qty),
                                    0
                                  )}{" "}
                                  ৳ {" "}
                                  {newproduct?.reduce(
                                    (a, b) =>
                                      a +
                                      (b?.sale_price
                                        ? b?.sale_price * b?.qty
                                        : b?.sale_price * b?.qty),
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
                                  <div className="text-base text-[13px]">
                                    Shipping
                                  </div>
                                </div>
                              </th>
                              <td className="px-6 py-0">
                                <div className="flex items-center text-[13px]">
                                  ফ্রি ডেলিভারি
                                </div>
                              </td>
                            </tr>
                            <tr className="  dark:bg-gray-800 dark:border-gray-700  ">
                              <th
                                scope="row"
                                className="flex items-center px-6 py-3 text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                <div className="pl-3">
                                  <div className="text-base text-[13px]">
                                    Total
                                  </div>
                                </div>
                              </th>
                              <td className="px-6 py-0">
                                <div className="flex items-center text-[13px]">
                                  ৳{" "}
                                  {newproduct?.reduce(
                                    (a, b) =>
                                      a +
                                      (b?.sale_price
                                        ? b?.sale_price * b?.qty
                                        : b?.sale_price * b?.qty),
                                    0
                                  )}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="bg-white px-10 py-6 rounded-lg">
                      <div className="text-[14px]">Cash On Delivery</div>
                      <div className="text-[14px] bg-[#b08020] py-2 px-2 mt-3 text-white">
                        পণ্য হাতে পেয়ে সম্পূর্ণ মূল্য পরিশোধ করতে হবে।
                      </div>
                    </div>
                    <div className="text-[12px] py-3">
                      Your personal data will be used to process your order,
                      support your experience throughout this website, and for
                      other purposes described in our{" "}
                      <span className="text-red-500">privacy policy.</span>
                    </div>

                    <button
                      type="submit"
                      className="bg-[#b08020] flex items-center justify-center py-2 rounded-3xl mb-5 w-full"
                    >
                      <div className="text-[26px] text-white">
                        <TiLockClosed />
                      </div>
                      <div className="text-[22px] font-bold  px-2  text-white">
                        অর্ডার করুন ৳{" "}
                        {newproduct?.reduce(
                          (a, b) =>
                            a +
                            (b?.sale_price
                              ? b?.sale_price * b?.qty
                              : b?.sale_price * b?.qty),
                          0
                        )}
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

export default EightSection;
