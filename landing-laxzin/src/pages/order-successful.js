import { useStatus } from "@/context/contextStatus";
import Link from "next/link";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";

const PaymentSuccessful = () => {
  const cookie = parseCookies();

  const { setCartItems, cartItems, renderMe, orderObj } = useStatus();

  const [orderDetail, setOrderDetail] = useState({});

  useEffect(() => {
    setCartItems(cartItems);
  }, [renderMe]);

  useEffect(() => {
    if (cookie?.hasOwnProperty("orderObj")) {
      setOrderDetail(JSON.parse(cookie.orderObj));
      // setOrderDetail(JSON.parse(orderObj));
    }
  }, [orderObj]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl  py-4 sm:max-w-[40rem] xls:mx-w-[24rem] xms:max-w-[22rem] xs:max-w-[16rem] mx-auto h-full font-sans">
        <div className="flex justify-center items-center h-full pt-48">
          <div className="space-y-3">
            <div className="flex justify-center">
              <BsFillCheckCircleFill size={40} className="text-green-500 " />
            </div>
            <div className="text-3xl font-semibold text-center dark:text-black">
              Thank you we have received your Order
            </div>
            <div className="text-center text-black">
              Your order is placed with{" "}
              <span className="font-semibold">Cash on delivery.</span>
            </div>
            <div className="text-center text-black">
              You will receive an SMS notification regarding the order.
            </div>
            <div className="text-center text-black">
              Your order ID is{" "}
              <span className="font-semibold">{orderDetail?.invoice_no}</span>{" "}
              and total value is{" "}
              <span className="font-semibold">{orderDetail?.grand_total}</span>
            </div>
            <div className="text-center text-black">
              Your shipping address is{" "}
              <span className="font-semibold">{orderDetail?.information}</span>
            </div>
            <div className="text-center text-black">
              Please remembar this information for any kind of future
              inconvenience regarding your order.
            </div>
          </div>
        </div>
        <Link className="flex justify-center mt-10" href={`/`}>
          <button className="bg-gray-800 text-white text-base px-4 py-2 rounded-md">
            Return to home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessful;
