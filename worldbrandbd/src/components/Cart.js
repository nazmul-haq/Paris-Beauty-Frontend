import { useStatus } from "@/context/contextStatus";
import hostname from "@/lib/config";

import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const Cart = ({ cartItems, setCartItems }) => {
  const { isCartOpen, setIsCartOpen, renderMe, setIsRenderMe } =
    useStatus();

  const wrapperRef = useRef(null);



  const router = useRouter();
  const [count, setCount] = useState(1);

   const [deleteItems, setDeleteItems] = useState([]);

  const handleClick = () => {
    setIsCartOpen(false);
  };

  useEffect(() => {
    setCartItems(cartItems);
  }, [renderMe]);

  const handleRoute = () => {
    router.push(`/checkout`);
    setIsCartOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, isCartOpen]);


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
 
 
    useEffect(() => {
      const ecommerce = {
        currency: "BDT",
        items: deleteItems,
      };

      window.dataLayer = window.dataLayer || [];
      dataLayer.push({
        event: "remove_from_cart",
        ecommerce,
      });
    }, [deleteItems]);


    
  // console.log("cartItems", cartItems);
  

  return (
    <div
      className={`${
        isCartOpen
          ? "translate-x-[16px] duration-500 z-50 fixed top-[0px] bottom-0 bg-white w-[360px] xls:w-[340px] xms:w-[340px]  xs:w-full right-[15px]  shadow-lg text-black"
          : "translate-x-[420px] duration-500 z-50 fixed top-[0px] bottom-0 bg-white w-[360px] xls:w-[340px]  xms:w-[340px]  xs:w-full  right-[15px] shadow-lg text-black"
      } `}
      ref={wrapperRef}
    >
      <div className="relative h-full w-full top-[0px] left-0 right-0 bottom-0">
        <div
          onClick={() => handleClick()}
          className="cursor-pointer absolute top-[0px] left-[0px] xs:left-0 bg-tahiti-500 py-2 px-2"
        >
          <svg
            className="fill-current text-white hover:rotate-180 duration-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
          </svg>
        </div>
        {cartItems?.length > 0 ? (
          <div className="absolute overflow-y-auto top-[40px] bottom-[140px] font-sans">
            <div className="mt-4 space-y-4">
              {cartItems?.map((item, index) => (
                <div className="flex items-center space-x-2 px-2" key={index}>
                  <div className="h-36 w-40 bg-gray-300">
                    <img
                      src={`${
                        hostname.ImageHostName
                      }/storage/product/${encodeURIComponent(item?.image)}`}
                      className="h-full w-full object-fill"
                      onError={(e) => {
                        e.target.onerror = null; // Prevents an infinite loop in case the placeholder fails
                        e.target.src = "/assets/placeholder_600x.webp"; // Placeholder image
                      }}
                    />
                  </div>
                  <div className="w-full flex items-center">
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
                      <svg
                        className="fill-current text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 font-sans">
            <div className="text-black text-sm text-center pt-7 pb-3">
              Your Shopping Bag is Empty
            </div>
            <div className="space-y-3 border-t border-gray-200 pt-7">
              <div className="flex justify-between items-center">
                <div className="text-sm">Sub-Total</div>
                <div className="text-sm">TK. 0.00</div>
              </div>
              {/* <div className="flex justify-between items-center">
                <div className="text-sm">Eco Tax (0.00)</div>
                <div className="text-sm text-red-500">TK. 0.00</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm">VAT (0%)</div>
                <div className="text-sm text-red-500">TK. 0.00</div>
              </div> */}
            </div>
            <div className="border-t border-gray-200 pt-7 px-4 mt-7">
              {/* <div className="flex justify-center">
                <button className="flex items-center space-x-2 bg-black justify-center px-20 py-4 mb-4 rounded-full">
                  <div>
                    <svg
                      className="h-4 w-4 fill-current text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6.00488 9H19.9433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V9ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path>
                    </svg>{" "}
                  </div>
                  <div className="text-white uppercase text-xs">view cart</div>
                </button>
              </div> */}

              <div
                className="flex justify-center"
                onClick={() => router.push("/checkout")}
              >
                <button className="flex items-center space-x-2 bg-tahiti-500 justify-center px-20 py-4 rounded-full">
                  <div>
                    <svg
                      className="h-4 w-4 fill-current text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13 14H11C7.54202 14 4.53953 15.9502 3.03239 18.8107C3.01093 18.5433 3 18.2729 3 18C3 12.4772 7.47715 8 13 8V3L23 11L13 19V14Z"></path>
                    </svg>
                  </div>
                  <div className="text-white uppercase text-xs">checkout</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {cartItems?.length > 0 ? (
          <div className="absolute h-[120px] bottom-0 left-0 w-full bg-white border-t border-gray-300 px-2">
            <div className=" border-t border-gray-200">
              <div className="flex justify-between items-center py-3">
                <div className="text-sm">Sub-Total</div>
                <div className="text-sm">
                  TK.{" "}
                  {cartItems?.reduce(
                    (a, b) =>
                      a +
                      (b?.sellingPrice
                        ? Math.round(b?.sellingPrice * b?.quantity)
                        : Math.round(b?.sellingPrice * b?.quantity)),
                    0
                  )}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-3 px-4">
              <div
                className="flex justify-center"
                onClick={() => handleRoute()}
              >
                <button className="flex items-center space-x-2 bg-black justify-center px-20 py-4 rounded-full">
                  <div>
                    <svg
                      className="h-4 w-4 fill-current text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13 14H11C7.54202 14 4.53953 15.9502 3.03239 18.8107C3.01093 18.5433 3 18.2729 3 18C3 12.4772 7.47715 8 13 8V3L23 11L13 19V14Z"></path>
                    </svg>
                  </div>
                  <div className="text-white uppercase text-xs">checkout</div>
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Cart;

