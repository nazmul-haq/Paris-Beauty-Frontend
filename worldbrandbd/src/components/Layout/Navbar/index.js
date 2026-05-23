import React, { useEffect, useState, Fragment, useRef } from "react";
import { BsFillCameraFill, BsSearch } from "react-icons/bs";
import { FiHeart, FiShoppingCart, FiRefreshCw } from "react-icons/fi";
import { IoCallOutline } from "react-icons/io5";
import TopNavbar from "@/components/Layout/TopNavbar";
import CategoryNavbar from "@/components/Layout/CategoryNavbar";
import { useRouter } from "next/router";
import { useStatus } from "@/context/contextStatus";
import hostname from "@/lib/config";
import { toast } from "react-toastify";

import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";

import { LuShoppingBag } from "react-icons/lu";

const Navbar = ({ catData, allCampaign ,brands}) => {
  const router = useRouter();
  const wrapperRef = useRef(null);
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    token,

    wishCount,
    setaccountMenu,
    contactInfo,
  } = useStatus();

  const [words, setWords] = useState([]);

  useEffect(() => {
    setWords(
      contactInfo?.search_box_word_text?.split(",").map((text) => text.trim())
    );
  }, [contactInfo]);

  const [serachboxOpen, setSearchboxOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // hooks used for type write effects
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [word, setWord] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const displayDuration = 3000;
  const idleDuration = 250; // 1 second

  // type write effect in search bar
  useEffect(() => {
    if (words?.length > 0) {
      if (subIndex < words[index].length) {
        const timeout = setTimeout(() => {
          setWord((prevWord) => prevWord + words[index][subIndex]);
          setSubIndex((prevSubIndex) => prevSubIndex + 1);
        }, 150);
        return () => clearTimeout(timeout);
      } else if (word.length > 0 && isVisible) {
        const timeout = setTimeout(() => {
          setIsVisible(false);
        }, displayDuration);
        return () => clearTimeout(timeout);
      } else if (!isVisible && word.length > 0) {
        const timeout = setTimeout(() => {
          setWord((prevWord) => prevWord.slice(0, -1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setSubIndex(0);
          setWord("");
          setIsVisible(true);
          setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, idleDuration);
        return () => clearTimeout(timeout);
      }
    }
  }, [subIndex, index, word, isVisible, words]);

  const handleRoute = () => {
    if (!token) {
      toast.warning("Login First");
      return;
    }
    router.push("/dashboard");
    setaccountMenu("wishlist");
  };

  const handleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const search = (val) => {
    if (val !== "") {
      const encodedVal = encodeURIComponent(val);
      router.push(`/search/${encodedVal}`);
    } else {
      router.push(`/`);
    }
  };

  const handleSearchClick = () => {
    setSearchboxOpen(!serachboxOpen);
  };

  return (
    <div className="fixed w-full z-20">
      {/* top navbar section */}

      <TopNavbar isScrolled={isScrolled} />

      {/* middle navbar section */}
      <div className="bg-white   tracking-[0.4px] ">
        <div className="max-w-[85rem] mx-auto h-full  xs:hidden xms:hidden xls:hidden sm:hidden">
          <div
            className={` grid grid-cols-12 px-2 py-3 items-center h-full xs:py-2 md:grid-cols-12 lg:grid-cols-12`}
          >
            <div className="col-span-3 cursor-pointer xs:col-span-11 md:col-span-3 lg:col-span-3 ">
              <div
                onClick={() => router.push("/")}
                className="w-[220px] h-[100px]  relative"
              >
                <Image
                  src={`${hostname.ImageHostName}/storage/${contactInfo?.logo}`}
                  height={500}
                  width={500}
                  className="h-full w-full object-fill"
                  priority
                  alt="logo"
                />
              </div>
            </div>

            {/* <div
              onClick={() => router.push("/")}
              className={`text-[25px] font-extrabold text-tahiti-500 font-serif col-span-3 cursor-pointer xs:col-span-11 md:col-span-3 lg:col-span-3 `}
            >
              Logo
            </div> */}
            <div className=" w-full col-span-7 relative border border-tahiti-500 rounded-md  md:col-span-6 lg:col-span-6 ">
              <div className="flex items-center relative">
                <input
                  className="h-10 w-full text-black px-3 rounded-md bg-white outline-none placeholder:text-[#898b92] placeholder:text-[14px] xs:h-9"
                  placeholder={`Search by keyword ${word}`}
                  onChange={(e) => search(e.target.value)}
                  type="text"
                />
                {/* <div
                  className="absolute top-2 right-[65px] cursor-pointer"
                  onClick={() => setsearchKey("")}
                >
                  <TiDeleteOutline className="text-red-500" size={25} />
                </div> */}
                <div className="flex items-center h-10 bg-tahiti-500 rounded-r-sm py-2 px-6 cursor-pointer z-30 xs:h-9">
                  <BsSearch className="text-tahiti-700" />
                </div>
              </div>
            </div>
            {router?.pathname == "/blog" ||
            router?.pathname == "/blog/[slug]" ? (
              <div className="col-span-2 flex justify-end">
                <button
                  className=" flex items-center bg-tahiti-500 px-3 py-1 space-x-2 rounded-md"
                  onClick={() => router.push(`/`)}
                >
                  <div>
                    <LuShoppingBag size={15} className="text-white" />
                  </div>
                  <p className="text-white">shop</p>
                </button>
              </div>
            ) : (
              <div
                className={`text-[25px] text-tahiti-500 flex gap-8  col-span-2 items-end justify-end md:col-span-3 md:gap-2 lg:col-span-3 lg:gap-5`}
              >
                <div className="border border-tahiti-500 p-2 rounded-lg">
                  <div className="relative">
                    <FiShoppingCart
                      onClick={() => handleCart()}
                      className="cursor-pointer text-[20px]"
                    />
                    <div className="bg-black rounded-full text-white text-[10px] w-[18px] h-[18px] flex items-center justify-center absolute top-[-13px] right-[-9px]">
                      {cartItems?.length}
                    </div>
                  </div>
                </div>
                <div className="border border-tahiti-500 p-2 rounded-lg">
                  <div className="relative">
                    <FiRefreshCw
                      onClick={() => router.push("/cart")}
                      className="cursor-pointer text-[20px]"
                    />
                    <div className="bg-black rounded-full text-white text-[10px] w-[18px] h-[18px] flex items-center justify-center absolute top-[-13px] right-[-9px]">
                      0
                    </div>
                  </div>
                </div>
                <div className="border border-tahiti-500 p-2 rounded-lg">
                  <div className="relative">
                    <FiHeart
                      onClick={() => handleRoute()}
                      className="cursor-pointer text-[20px]"
                    />
                    <div className="bg-black rounded-full text-white text-[10px] w-[18px] h-[18px] flex items-center justify-center absolute top-[-13px] right-[-9px]">
                      {wishCount}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="hidden xs:block  items-end justify-end">
              <div>
                <BsSearch />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={` xls:grid items-center bg-[#fff]  xms:grid xs:grid sm:block hidden`}
      >
        <div className="relative">
          <div className="flex justify-between items-center px-3 sm:pt-5 py-3">
            <div className="flex justify-center lg:w-auto lg:flex-1">
              <Link href={`/`} className="flex justify-start w-[150px] h-[60px]">
                <Image
                  src={`${hostname.ImageHostName}/storage/${contactInfo?.logo}`}
                  height={500}
                  width={500}
                  className="h-full w-full object-fill"
                  priority
                  alt="logo"
                />
              </Link>
            </div>

            <div
              className="flex items-center space-x-4"
              onClick={handleSearchClick}
            >
              <BiSearch size={25} color="#000" />
            </div>
          </div>

          <div
            className={`${
              serachboxOpen ? " translate-y-[0px]" : "translate-y-[-140px]"
            }  duration-500 absolute top-[0px] left-0 w-full px-3 pt-1 sm:pt-5 pb-4 h-[90px] bg-white`}
          >
            <div
              onClick={handleSearchClick}
              className="cursor-pointer flex justify-end"
            >
              <RxCross2 size={20} color="#CD6727" />
            </div>
            <div className="pt-1 relative w-full">
              <input
                placeholder="Looking for something? ...."
                className={`w-full px-4 py-1 bg-[#EBEEEE]  outline-none placeholder:text-sm border border-gray-300`}
                onChange={(e) => search(e.target.value)}
                type="text"
              />

              {/* <div
                className="absolute top-2 right-[10px] cursor-pointer"
                onClick={() => setsearchKey("")}
              >
                <TiDeleteOutline className="text-red-500" size={25} />
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* category navbar section */}
      <CategoryNavbar
        catData={catData}
        brands={brands}
        allCampaign={allCampaign}
      />
    </div>
  );
};

export default Navbar;
