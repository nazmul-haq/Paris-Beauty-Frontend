
import { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { RiCoupon2Line } from "react-icons/ri";
import { TiDeleteOutline } from "react-icons/ti";
import CouponModal from "./CouponModal";
import { useStatus } from "@/context/contextStatus";
import hostname from "@/lib/config";
import { destroyCookie, setCookie } from "nookies";
import { toast } from "react-toastify";



const CartoverviewSection = ({
  areaAmount,
  type,
  setType,
  promoValue,
  handlePromo,
}) => {
  const { cartItems, setCartItems, setIsRenderMe, renderMe } = useStatus();

  const [count, setCount] = useState(1);

  const [couponModalOpen, setCouponModalOpen] = useState(false);

  const [total, setTotal] = useState(0);

  const handleClick = () => {
    setCouponModalOpen(true);
  };

  const AddCart = (index) => {
    if (cartItems[index]?.quantity < cartItems[index]?.stock) {
      cartItems[index].quantity += count;
      setType(null);
      destroyCookie({}, "type", {
        path: "/",
      });
      setCartItems(cartItems);

      setCookie(null, "parisBd", JSON.stringify(cartItems), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      setIsRenderMe(!renderMe);
    } else {
      toast.error(`You cant add more product`);
    }
  };

  const SubCart = (index) => {
    if (cartItems[index]?.quantity > 0) {
      cartItems[index].quantity -= count;
      setType(null);
      destroyCookie({}, "type", {
        path: "/",
      });
      setCartItems(cartItems);

      setCookie(null, "parisBd", JSON.stringify(cartItems), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    }
    if (cartItems[index]?.quantity === 0) {
      cartItems?.splice(index, 1);
      setType(null);
      destroyCookie({}, "type", {
        path: "/",
      });
      setCartItems(cartItems);

      setCookie(null, "parisBd", JSON.stringify(cartItems), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      toast.success(`product removed successfully`);
    }
    setIsRenderMe(!renderMe);
  };

  const DeleteItem = (index) => {
    cartItems?.splice(index, 1);

    setCartItems(cartItems);
    setType(null);
    destroyCookie({}, "type", {
      path: "/",
    });
    setCookie(null, "parisBd", JSON.stringify(cartItems), {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    toast.success(`product removed successfully`);
    setIsRenderMe(!renderMe);
  };

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

  return (
    <>
      <div className="bg-white mt-0 xls:mt-1 xms:mt-1 xs:mt-1 px-6 xs:px-2 rounded-md">
        <div className="flex justify-between items-center py-2 border-b border-tahiti-500">
          <div className="text-xl font-semibold dark:text-black">
            Cart Overview
          </div>
          <div className="text-black font-semibold tracking-wider">
            {cartItems?.length} <span className="text-sm">items</span>
          </div>
        </div>
        <div className="mt-3 space-y-3 h-[350px] sm:h-auto xls:h-auto xms:h-auto xs:h-auto overflow-y-auto">
          {cartItems?.map((item, index) => (
            <div key={index} className="border-b border-tahiti-500 pb-3">
              <div className="text-sm text-black pb-2">
                <p>{item?.name}</p>
              </div>
              <div>
                {item?.variations == null ? null : (
                  <div className="mt-3">
                    <div className="text-xs tracking-wider font-semibold pb-1">
                      {item?.variations}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center xs:space-x-2">
                <div className="h-16 w-16 xms:h-14 xms:w-14 xs:h-14 xs:w-14">
                  <img
                    src={`${hostname.ImageHostName}/storage/product/${item?.image}`}
                    className="h-full w-full object-fill"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mt-2 space-x-3">
                    <div className="flex items-center">
                      <div
                        className="bg-tahiti-500 px-3 py-2 cursor-pointer"
                        onClick={() => SubCart(index)}
                      >
                        <BiMinus
                          size={15}
                          color="#fff"
                          className="font-semibold "
                        />
                      </div>
                      <input
                        value={item?.quantity}
                        style={{ outline: "none" }}
                        className="border-2 border-tahiti-500 p-[1px] h-[31px] w-[50px] text-center text-black dark:bg-white"
                      />
                      <div
                        className="bg-tahiti-500 px-3 py-2 cursor-pointer"
                        onClick={() => AddCart(index)}
                      >
                        <BiPlus
                          size={15}
                          color="#fff"
                          className="font-semibold"
                        />
                      </div>
                    </div>
                    <h2 className="font-semibold text-lg">
                      <span className="text-sm dark:text-black">
                        ৳{" "}
                        {Math.round(item?.sellingPrice) *
                          Number(item?.quantity)}
                      </span>
                    </h2>
                    <p
                      className="cursor-pointer text-black text-sm underline flex justify-center pl-4 xs:pl-0"
                      onClick={() => DeleteItem(index)}
                    >
                      <TiDeleteOutline
                        size={25}
                        className="font-semibold text-red-500"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className=" space-y-2">
          <div className="flex justify-between  items-center mt-3">
            <div className="text-base font-semibold dark:text-black block ">
              Subtotal :
            </div>
            {/* <div
              className="hidden justify-end sm:flex xls:flex xms:flex xs:flex items-center space-x-1 pr-3 py-3 cursor-pointer"
              onClick={() => handleClick()}
            >
              <div>
                <RiCoupon2Line
                  size={20}
                  className="text-red-500 fill-current font-bold"
                />
              </div>
              <div className="text-red-500 font-semibold">Apply coupon </div>
            </div> */}
            <div className="text-base text-right font-semibold dark:text-black">
              ৳ {Math.round(total)}
            </div>
          </div>
        </div>

        {areaAmount ? (
          <div className="flex justify-between items-center py-4 ">
            <p className="font-medium text-black">Delivery charge</p>
            <h2 className="font-semibold text-base text-black">
              ৳ {Number(areaAmount)}
            </h2>
          </div>
        ) : null}

        {type == 1 ? (
          <div className="flex justify-between items-center py-4 ">
            <div className="flex items-center space-x-2">
              <p className="font-medium text-black">discount</p>
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
              <p className="font-medium text-black">Dissscount</p>
              <button onClick={() => handleCouponDelete()}>
                <TiDeleteOutline
                  size={22}
                  className="text-red-500 cursor-pointer"
                />
              </button>
            </div>

            <h2 className="font-semibold text-base text-black">
              ৳ {Math.round((Number(total) * Number(promoValue)) / 100)}
            </h2>
          </div>
        ) : null}

        <div className="flex justify-between border-t border-gray-300 mt-3 pt-2 xls:hidden xms:hidden xs:hidden">
          <div className="text-base font-semibold dark:text-black">
            Total price :
          </div>

          <div className="text-base font-semibold dark:text-black">
            ৳{" "}
            {type == 1
              ? Math.round(total) + areaAmount - promoValue
              : type == 2
              ? Math.round(total) +
                areaAmount -
                Math.round((Number(total) * Number(promoValue)) / 100)
              : Math.round(total) + areaAmount}
          </div>
        </div>
      </div>

      <CouponModal
        couponModalOpen={couponModalOpen}
        setCouponModalOpen={setCouponModalOpen}
        handlePromo={handlePromo}
      />
    </>
  );
};

export default CartoverviewSection;
