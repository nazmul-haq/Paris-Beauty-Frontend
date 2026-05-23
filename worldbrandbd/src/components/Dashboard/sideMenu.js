import React, { useState } from "react";
import { BiHomeAlt, BiArchive, BiDollar } from "react-icons/bi";
import { TbTruckDelivery, TbLogout } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { useStatus } from "@/context/contextStatus";
import Image from "next/image";
import { destroyCookie } from "nookies";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const SideMenu = () => {


  const {
    userNo,
    userData,
    image,
    accountMenu,
    setaccountMenu,
    setToken,
    setUserData,
  } = useStatus();

  const [isOptimized, setIsOptimized] = useState(true);

  const router = useRouter()

  const handleLogout = () => {
    toast.success("Successfully logged out!");
    setToken(null);
    setUserData(null);
    destroyCookie({}, "token", {
      path: "/",
    });
    destroyCookie({}, "user", {
      path: "/",
    });
    destroyCookie({}, "userId", {
      path: "/",
    });

    router.push("/");
  };

  return (
    <div className="col-span-2 xs:col-span-full xms:col-span-full xls:col-span-full sm:col-span-full">
      <div className="shadow-md">
        <div className="py-4  bg-tahiti-500 rounded-t-md">
          <div className="flex items-center justify-center">
            {image ? (
              <div className="w-[70px] h-[70px] relative bg-[#AAAAAA] text-white rounded-full flex items-center justify-center">
                <Image
                  className="rounded-full h-full w-full"
                  src={isOptimized ? image : "/assets/placeholder_600x.webp"}
                  width={100}
                  height={100}
                  alt="profile image"
                  unoptimized={!isOptimized}
                  onError={() => setIsOptimized(false)} // Handle image error
                />
              </div>
            ) : (
              <div className="w-[70px] h-[70px] bg-[#AAAAAA] text-white rounded-full flex items-center justify-center">
                A
              </div>
            )}
          </div>
          <div className="text-center text-[14px] font-serifs font-semibold mt-3 text-[#fff]">
            {userData}
          </div>
          <div className="text-center text-[14px] font-serifs font-semibold py-1 text-[#fff]">
            {userNo}
          </div>
        </div>
        <div className="bg-white py-5 px-2 rounded-b-md">
          <div
            onClick={() => setaccountMenu("dashboard")}
            className={`${
              accountMenu == "dashboard" ? " bg-tahiti-500" : ""
            } flex items-center py-3 text-[12px] pl-3 rounded-md hover:bg-tahiti-500 hover:rounded-md cursor-pointer`}
          >
            <div className="text-[12px]">
              <BiHomeAlt />
            </div>
            <div className="text-[12px] ml-3">Dashboard</div>
          </div>
          <div
            onClick={() => setaccountMenu("orders")}
            className={`${
              accountMenu == "orders" ? " bg-tahiti-500" : ""
            } flex items-center py-3 text-[12px] pl-3 rounded-md hover:rounded-md hover:bg-tahiti-500 cursor-pointer`}
          >
            <div className="text-[12px]">
              <BiArchive />
            </div>
            <div className="text-[12px] ml-3">Purchase List</div>
          </div>

          <div
            onClick={() => setaccountMenu("profile")}
            className={`${
              accountMenu == "profile" ? " bg-tahiti-500" : ""
            } flex items-center py-3 text-[12px] pl-3 rounded-md hover:rounded-md hover:bg-tahiti-500 cursor-pointer`}
          >
            <div className="text-[12px]">
              <FiSettings />
            </div>
            <div className="text-[12px] ml-3">Manage Profile</div>
          </div>
          <div
              onClick={handleLogout}
            className="flex items-center py-3  text-[12px] pl-3 rounded-md hover:rounded-md hover:bg-tahiti-500 cursor-pointer"
          >
            <div className="text-[12px]">
              <TbLogout />
            </div>
            <div className="text-[12px] ml-3">Logout</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
