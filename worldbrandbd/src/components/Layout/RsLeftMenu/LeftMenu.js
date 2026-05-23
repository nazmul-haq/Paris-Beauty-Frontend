import Link from "next/link";
import React, { useState } from "react";
import SubSubMenu from "./SubSubMenu";
import { useStatus } from "@/context/contextStatus";
import { useRouter } from "next/router";

const LeftMenu = ({ item }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setSideCategory } = useStatus();

  const router = useRouter();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


   const handleCat = (id) => {
     router.push(`/product-list/${id}`);
     setSideCategory(false);
     
   };

   const handleRoute = (id) => {

     router.push(`/product-list/${id}`);
      setSideCategory(false);
   }; 



  return (
    <>
      <button className="flex items-center justify-between list-none w-full text-sm font-medium">
        <span
          className="text-black uppercase font-semibold text-sm"
          onClick={() => handleCat(item?.slug)}
        >
          {item?.name}
        </span>

        {item?.nav_sub_categories?.length > 0 ? (
          <>
            {isDropdownOpen ? (
              <svg
                onClick={() => toggleDropdown()}
                className="h-5 w-5 fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5 11V13H19V11H5Z"></path>
              </svg>
            ) : (
              <svg
                onClick={() => toggleDropdown()}
                className="h-5 w-5 fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
              </svg>
            )}
          </>
        ) : null}
      </button>
      {isDropdownOpen && (
        <ul className="pl-4 mt-2 space-y-2 transition-all duration-300">
          {item?.nav_sub_categories?.length > 0 ? (
            <>
              {item?.nav_sub_categories?.map((subItem, subIndex) => (
                <div key={subIndex}>
                  {subItem?.nav_sub_categories?.length > 0 ? (
                    <li  className={`list-none text-sm py-2`}>
                      <SubSubMenu item={subItem} />
                    </li>
                  ) : (
                    <li
                   
                      className={`list-none text-sm  py-2`}
                      onClick={() => handleRoute(subItem?.slug)}
                    >
                      <SubSubMenu item={subItem} />
                    </li>
                  )}
                </div>
              ))}
            </>
          ) : null}
        </ul>
      )}
    </>
  );
};

export default LeftMenu;
