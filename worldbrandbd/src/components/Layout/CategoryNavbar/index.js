import Link from "next/link";
import { useState } from "react";
import { useStatus } from "@/context/contextStatus";
import { useRouter } from "next/router";

const CategoryNavbar = ({ catData, brands, allCampaign }) => {
  const router = useRouter();
  const { setSideCategory } = useStatus();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [subcat, setsubcat] = useState([]);
  const [subcat1, setsubcat1] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  // const [allCampaign, setAllCampaign] = useState([]);


  const handleMouseEnter = (id) => {
    if (catData.length > 0) {
      let arr = catData;
      const filters = arr.filter((item) => item?.id === id);
      setsubcat(filters[0]?.nav_two_level_categories);
      setsubcat1(filters[0]?.nav_one_level_categories);
    }
  };

  const handleMouseEnterBrand = () => {
    if (brands.length > 0) {
      setAllBrands(brands.slice(0, 63));
    }
  };

  const handleMouseLeaveBrands = () => {
    setAllBrands([]);
  };

  return (
    <div className="bg-tahiti-500  h-[40px] tracking-[0.4px] xs:h-[40px] xms:h-[40px] xls:h-[40px] sm:h-[40px]">
      <div className="max-w-[85rem] lg:max-w-[70rem] md:max-w-[61rem] mx-auto h-full grid px-2 xs:hidden xms:hidden xls:hidden sm:hidden">
        <div className="flex items-center justify-between">
          <Link
            href={`/brand`}
            onMouseEnter={() => handleMouseEnterBrand()}
            // onMouseLeave={() => handleMouseLeaveBrands()}
            className="h-full group"
          >
            <div className="grid h-full items-center text-[11px] font-semibold text-white cursor-pointer md:text-[11px] lg:text-[11px]">
              BRAND
            </div>

            {allBrands.length > 0 && (
              <div className="hidden group-hover:block fixed  left-1/2 transform -translate-x-1/2 bg-white h-[400px] md:h-[600px] shadow-lg p-4 min-w-[85rem] lg:min-w-[70rem] md:min-w-[60rem]   rounded-b-lg z-0">
                <div className="grid grid-cols-7 md:grid-cols-5">
                  {allBrands.map((sub, subIndex) => (
                    <Link
                      href={`/brand/${sub?.slug}`}
                      key={subIndex}
                      className="max-h-[380px]  overflow-scroll left-side"
                    >
                      <div className="text-[12px] text-gray-500 font-bold py-2 px-2 cursor-pointer hover:bg-tahiti-500 hover:text-white">
                        {sub?.name}
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="flex items-center justify-center pt-4">
                  <div
                    onClick={() => router.push("/brand")}
                    className="text-[12px] px-2 py-2 text-white bg-tahiti-500 rounded-md"
                  >
                    All Brands
                  </div>
                </div>
              </div>
            )}
          </Link>

          {catData?.map((item, index) => (
            <Link
              key={index}
              className="h-full group"
              href={`/product-list/${item?.slug}`}
              onMouseEnter={() => handleMouseEnter(item?.id)}
            >
              <div className="grid h-full items-center text-[11px] font-semibold text-white cursor-pointer md:text-[11px] lg:text-[11px]">
                {item?.name}
              </div>
              {subcat.length > 0 && subcat1.length > 0 ? (
                <div className="hidden group-hover:block fixed  left-1/2 transform -translate-x-1/2 bg-white h-[400px] md:h-[650px] shadow-lg p-4 min-w-[85rem] lg:min-w-[70rem] md:min-w-[60rem] rounded-b-lg z-0">
                  <div className="flex  flex-wrap lg:flex-nowrap gap-5 ">
                    {subcat.map((sub, subIndex) => (
                      <Link
                        href={`/product-list/${sub?.slug}`}
                        key={subIndex}
                        className="max-h-[380px]  overflow-scroll left-side"
                      >
                        {sub?.subsubcategories.length > 0 ? (
                          <div className="text-[14px] text-gray-700 font-bold py-2 px-2 w-[200px] cursor-pointer hover:bg-tahiti-500 hover:text-white">
                            {sub?.name}
                          </div>
                        ) : null}

                        <div className="flex flex-col  flex-wrap  max-h-[300px]">
                          {sub?.subsubcategories.length > 0 &&
                            sub?.subsubcategories.map((subSub, subSubIdx) => (
                              <Link
                                key={subSubIdx}
                                href={`/product-list/${subSub?.slug}`}
                                className="text-[12px] text-gray-500 py-2 px-2 w-[200px] font-semibold cursor-pointer hover:bg-tahiti-500 hover:text-white"
                              >
                                {subSub?.name}
                              </Link>
                            ))}
                        </div>
                      </Link>
                    ))}

                    {subcat1.length > 0 && (
                      <div>
                        <div className="text-[14px] text-gray-700 font-bold py-2 px-2 w-[200px] cursor-pointer hover:bg-tahiti-500 hover:text-white">
                          Other
                        </div>
                        <div className="flex flex-col md:flex-col-reverse flex-wrap max-h-[300px]">
                          {subcat1?.map((subSub, subSubIdx) => (
                            <Link
                              key={subSubIdx}
                              href={`/product-list/${subSub?.slug}`}
                              className="text-[12px] text-gray-500 py-2 px-2 w-[200px] font-semibold cursor-pointer hover:bg-tahiti-500 hover:text-white"
                            >
                              {subSub?.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : subcat1.length > 0 ? (
                <div className="hidden group-hover:block fixed  left-1/2 transform -translate-x-1/2 bg-white h-[500px] shadow-lg p-4 min-w-[85rem] lg:min-w-[70rem] md:min-w-[60rem] rounded-b-lg z-0">
                  <div className="flex  flex-wrap gap-5  ">
                    {subcat1.map((sub, subIndex) => (
                      <Link
                        href={`/product-list/${sub?.slug}`}
                        key={subIndex}
                        className="max-h-[380px]  overflow-scroll left-side"
                      >
                        <div className="text-[14px] text-gray-500 font-bold py-2 px-2 w-[200px] cursor-pointer hover:bg-tahiti-500 hover:text-white">
                          {sub?.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </Link>
          ))}
          <Link href={`/combo`} className="h-full group">
            <div className="grid h-full items-center text-[11px] font-semibold text-white cursor-pointer md:text-[11px] lg:text-[11px]">
              Combo
            </div>
          </Link>

          {allCampaign?.length > 0 &&
            allCampaign?.map((item, index) => (
              <Link
                href={`/campaign-products/${item?.slug}`}
                className="h-full group"
                key={index}
              >
                <div className="grid h-full items-center text-[11px] font-semibold text-white cursor-pointer md:text-[11px] lg:text-[11px]">
                  {item?.name}
                </div>
              </Link>
            ))}
        </div>
      </div>
      <div className="">
        <div
          className=" items-center h-full px-2 py-2 hidden xs:block xms:block xls:block sm:block"
          onClick={() => {
            setSideCategory(true);
          }}
        >
          <svg
            className="text-white h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M3 4H21V6H3V4ZM9 11H21V13H9V11ZM3 18H21V20H3V18Z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CategoryNavbar;
