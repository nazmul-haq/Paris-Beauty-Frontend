/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-undef */
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import styles from "./RsLeftMenu.module.css";

import request from "@/lib/request";
import { useStatus } from "@/context/contextStatus";
import { useRouter } from "next/router";
import LeftMenu from "./LeftMenu";
import { FaRegUserCircle } from "react-icons/fa";
import { ImExit } from "react-icons/im";

function ResLeftMenu({ catData }) {
  const router = useRouter();
  const { token, setTabIndex } = useStatus();

  const { sideCategory, setSideCategory } = useStatus();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogin = () => {
    router.push("/auth");
  };

  const handleSignUp = () => {
    router.push("/auth");
    setTabIndex(0);
  };

  const handleLogout = () => {
    toast("Successfully logged out!");
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
    // <div className={`${sideCategory ? styles.main__wrapper : ``}`}>
    <div
      className={`
							md:hidden bg-white fixed top-0 
							duration-500 h-[100vh] sm:p-10 xls:p-1 xms:p-1 xs:p-1  z-50 ${
                sideCategory ? "left-0 w-[70%]" : "left-[-100%]"
              }
        			`}
    >
      <div className={styles.header} onClick={() => setSideCategory(false)}>
        {/* <Image
            onClick={() => setSideCategory(false)}
            priority={true}
            height={16}
            width={16}
            src="/assets/images/icons/cancel.svg"
            alt="Close"
          /> */}
        <svg
          className="h-7 w-7 fill-current text-red-600"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"></path>
        </svg>
        <h4 className="font-semibold tracking-wider dark:text-black">
          Category
        </h4>
      </div>
      <ul className="p-4 overflow-y-auto h-[600px]">
        {catData?.map((item, index) => (
          <div key={index}>
            {item?.nav_sub_categories?.length > 0 ? (
              <li
                className="list-none py-2 border-b border-gray-300 text-black"
             
              >
                <LeftMenu item={item} />
              </li>
            ) : (
              <Link
                href={`/categories/${item?.slug}`}
                onClick={() => setSideCategory(false)}
              
              >
                <li className="list-none py-2 border-b border-gray-300 text-black">
                  <LeftMenu item={item} />
                </li>
              </Link>
            )}
          </div>
        ))}
      </ul>
    </div>
    // </div>
  );
}

export default ResLeftMenu;
