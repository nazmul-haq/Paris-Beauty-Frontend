import { useStatus } from "@/context/contextStatus";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const SubSubMenu = ({ item }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  const { setSideCategory } = useStatus();

  const router = useRouter();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleRoute = (id) => {

    router.push(`/product-list/${id}`);
  }; 



  return (
    <>
      <button className="flex items-center justify-between list-none w-full text-sm font-medium">
        <span
          className="text-black uppercase text-sm"
          onClick={() => handleRoute(item?.slug)}
        >
          {item?.name}
        </span>

        {item?.subsubcategories?.length > 0 ? (
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
          {item?.subsubcategories?.length > 0 ? (
            <>
              {item?.subsubcategories?.map((subItem, subIndex) => (
                <div key={subIndex}>
                  <li
                    className={`list-none text-sm  py-2`}
                    onClick={() => handleRoute(subItem?.slug)}
                  >
                    {subItem?.name}
                  </li>
                </div>
              ))}
            </>
          ) : null}
        </ul>
      )}
    </>
  );
};

export default SubSubMenu;
