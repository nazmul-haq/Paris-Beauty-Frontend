import ProductCard from "@/components/productSection/productCard";
import Slider from "@/components/Slider";
import hostname from "@/lib/config";
import request from "@/lib/request";
import { Inter } from "next/font/google";
import Image from "next/image";
import {
  MdOutlineDoubleArrow,
} from "react-icons/md";


import Link from "next/link";
import { useRouter } from "next/router";

import Head from "next/head";

import CategorySection from "@/components/CategorySection";
import ProductCategorySection from "@/components/ProductCategorySection";
import { useEffect, useState } from "react";
import ConcernSection from "@/components/ConcernSection";
import HighlightSection from "@/components/Layout/HighlightSection";
import BrandSection from "@/components/BrandSection";



const inter = Inter({ subsets: ["latin"] });

export default function Home({
  // CatData,
  // prod,
  // slide,

  // brands,
  // campaign,
  // category_section,
}) {
  const router = useRouter();

  const [CatData, setCatData] = useState([]);
  const [prod, setProd] = useState([]);
  const [slide, setSlide] = useState([]);
  const [brands, setBrands] = useState([]);
  const [Campaign, setCampaign] = useState([]);
  const [category_section, setCategory_section] = useState([]);

  useEffect(() => {
    let fetchData = async () => {
      let [res,newProd, campaign, categorySection] = await Promise.all([
        request(`get-categories`),
        request(`get-product-section`),
       
        request(`get-campaign`),
        request(`get-category-section`),
      ]);

      setCatData(res || null);

      setProd(newProd?.data || []);
      setSlide(res?.sliders || null);

      setCampaign(campaign?.data || []);

      setBrands(res?.brands || []);
      setCategory_section(categorySection || null);
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>{`World Brand BD.| Lets Do Beauty & Grooming Together`}</title>
        <meta
          name="description"
          content="World Brand BD. is one of the best Online Shopping platforms in Bangladesh: Buy Skincare items, Color cosmetics, Perfumes, Foods &amp; Food supplements at the best price. Buy today &amp; get FREE home delivery!"
        />
        <meta
          name="google-site-verification"
          content="Rs4Z64F-tR24cZMRvFdmZ7v5tSc1aPhiIOglN1S29mA"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main
        className={` min-h-screen pt-[150px] xs:pt-[120px] xms:pt-[130px] xls:pt-[130px] sm:pt-[140px]`}
      >
        <div>
          <Slider slide={slide} />
        </div>
        <div className="max-w-[85rem] lg:max-w-[70rem] md:max-w-[60rem] sm:max-w-[42rem] xls:max-w-[22rem] xms:max-w-[20rem] xs:max-w-[17rem] mx-auto tracking-[0.4px]">
          {CatData?.product_categories?.length > 0 && (
            <div>
              <div className="py-5 flex items-center justify-between px-2">
                <div className="text-[18px] font-semibold border-b cursor-pointer xs:text-[14px] xms:text-[14px] xls:text-[14px] sm:text-[16px]">
                  Product Categories{" "}
                  <span className="text-[14px] font-medium text-gray-500 xs:text-[10px] xms:text-[10px] xls:text-[10px] sm:text-[12px]">
                    {" "}
                    Get Your Product from Category
                  </span>
                </div>
                <div
                  onClick={() => router.push("/product_categories")}
                  className="animate-bounce cursor-pointer z-10"
                >
                  <>
                    <div className="relative flex flex-column group">
                      <MdOutlineDoubleArrow className="text-[26px] text-tahiti-500 " />

                      <div className="absolute left-[-60px] top-[30px] hidden flex items-baseline  ml-2 group-hover:flex">
                        <span className="text-white px-2 py-1 w-[120px] bg-tahiti-500 border-2 border-[#f36eae]  rounded-md  hover:shadow-2xl hover:shadow-gray-500/50">
                          Click for more
                        </span>
                      </div>
                    </div>
                  </>
                </div>
              </div>
              <div>
                <ProductCategorySection catData={CatData} />
              </div>
            </div>
          )}
          {category_section && (
            <CategorySection category_section={category_section} />
          )}

          <>
 
            {Campaign?.length > 0 &&
              Campaign?.map((item, index) => (
                <div key={index}>
                  <div className="py-5 flex items-center justify-between px-2">
                    <div className="text-[18px] font-semibold border-b cursor-pointer xs:text-[14px] xms:text-[14px] xls:text-[14px] sm:text-[16px]">
                      {item?.name}
                      <span className="text-[14px] font-medium text-gray-500 xs:text-[10px] xms:text-[10px] xls:text-[10px] sm:text-[12px]">
                        {" "}
                        Get Your Product from Category
                      </span>
                    </div>
                    <Link
                      href={`/campaign-products/${item?.slug}`}
                      className="animate-bounce cursor-pointer z-10"
                    >
                      <>
                        <div className="relative flex flex-column group">
                          <MdOutlineDoubleArrow className="text-[26px] text-tahiti-500 " />

                          <div className="absolute left-[-60px] top-[30px] hidden flex items-baseline  ml-2 group-hover:flex">
                            <span className="text-white px-2 py-1 w-[120px] bg-tahiti-500 border-2 border-[#f36eae]  rounded-md  hover:shadow-2xl hover:shadow-gray-500/50">
                              Click for more
                            </span>
                          </div>
                        </div>
                      </>
                    </Link>
                  </div>
                  <div>
                    <ProductCard productList={item?.campaign_products} />
                  </div>
                </div>
              ))}
          </>

          <>
            {" "}
            {CatData?.combo?.length > 0 && (
              <div>
                <div className="py-5 flex items-center justify-between px-2">
                  <div className="text-[18px] font-semibold border-b cursor-pointer xs:text-[14px] xms:text-[14px] xls:text-[14px] sm:text-[16px]">
                    Combo{" "}
                    <span className="text-[14px] font-medium text-gray-500 xs:text-[10px] xms:text-[10px] xls:text-[10px] sm:text-[12px]">
                      {" "}
                      Check & Get Your Desired Product
                    </span>
                  </div>
                  <Link
                    href={`/combo`}
                    className="animate-bounce cursor-pointer z-10"
                  >
                    <>
                      <div className="relative flex flex-column group">
                        <MdOutlineDoubleArrow className="text-[26px] text-tahiti-500 " />

                        <div className="absolute left-[-60px] top-[30px] hidden flex items-baseline  ml-2 group-hover:flex">
                          <span className="text-white px-2 py-1 w-[120px] bg-tahiti-500 border-2 border-[#f36eae]  rounded-md  hover:shadow-2xl hover:shadow-gray-500/50">
                            Click for more
                          </span>
                        </div>
                      </div>
                    </>
                  </Link>
                </div>
                <div>
                  <ProductCard productList={CatData?.combo} />
                </div>
              </div>
            )}
          </>

          <>
            {CatData?.todays_deal?.length > 0 && (
              <div>
                <div className="py-5 flex items-center justify-between px-2">
                  <div className="text-[18px] font-semibold border-b cursor-pointer xs:text-[14px] xms:text-[14px] xls:text-[14px] sm:text-[16px]">
                    Todays Deals{" "}
                    <span className="text-[14px] font-medium text-gray-500 xs:text-[10px] xms:text-[10px] xls:text-[10px] sm:text-[12px]">
                      {" "}
                      Check & Get Your Desired Product
                    </span>
                  </div>
                  <Link
                    href={`/todays-deal`}
                    className="animate-bounce cursor-pointer z-10"
                  >
                    <>
                      <div className="relative flex flex-column group ">
                        <MdOutlineDoubleArrow className="text-[26px] text-tahiti-500 " />

                        <div className="absolute left-[-60px] top-[30px] hidden flex items-baseline  ml-2 group-hover:flex ">
                          <span className=" text-white px-2 py-1 w-[120px] bg-tahiti-500 border-2 border-[#f36eae]   rounded-md  hover:shadow-2xl hover:shadow-gray-500/50">
                            Click for more
                          </span>
                        </div>
                      </div>
                    </>
                  </Link>
                </div>
                <div>
                  <ProductCard productList={CatData?.todays_deal} />
                </div>
              </div>
            )}
          </>

          <>
            {CatData?.new_arrival?.length > 0 && (
              <div>
                <div className="py-5 flex items-center justify-between px-2">
                  <div className="text-[18px] font-semibold border-b cursor-pointer xs:text-[14px] xms:text-[14px] xls:text-[14px] sm:text-[16px]">
                    New Products{" "}
                    <span className="text-[14px] font-medium text-gray-500 xs:text-[10px] xms:text-[10px] xls:text-[10px] sm:text-[12px]">
                      {" "}
                      Check & Get Your Desired Product
                    </span>
                  </div>
                  <Link
                    href={`/new-arrival`}
                    className="animate-bounce cursor-pointer z-10"
                  >
                    <>
                      <div className="relative flex flex-column group">
                        <MdOutlineDoubleArrow className="text-[26px] text-tahiti-500 " />

                        <div className="absolute left-[-60px] top-[30px] hidden flex items-baseline  ml-2 group-hover:flex">
                          <span className="text-white px-2 py-1 w-[120px] bg-tahiti-500 border-2 border-[#f36eae]  rounded-md  hover:shadow-2xl hover:shadow-gray-500/50">
                            Click for more
                          </span>
                        </div>
                      </div>
                    </>
                  </Link>
                </div>
                <div>
                  <ProductCard productList={CatData?.new_arrival} />
                </div>
              </div>
            )}
          </>

          {CatData?.banner && (
            <div className="px-2 pt-8 pb-2">
              <div className=" w-full ">
                <Image
                  className="object-cover xls:object-contain xms:object-contain xs:object-contain h-full w-full"
                  src={`${hostname.ImageHostName}/storage/${CatData?.banner?.image_path}${CatData?.banner?.image}`}
                  width={1400}
                  height={600}
                  alt="poster"
                  priority
                />
              </div>
            </div>
          )}

          <>
            {CatData?.featured_products?.length > 0 && (
              <div>
                <div className="py-5 flex items-center justify-between px-2">
                  <div className="text-[18px] font-semibold border-b cursor-pointer xs:text-[14px] xms:text-[14px] xls:text-[14px] sm:text-[16px]">
                    Featured Products{" "}
                    <span className="text-[14px] font-medium text-gray-500 xs:text-[10px] xms:text-[10px] xls:text-[10px] sm:text-[12px]">
                      {" "}
                      Check & Get Your Desired Product
                    </span>
                  </div>
                  <Link
                    href={`/featured`}
                    className="animate-bounce cursor-pointer z-10"
                  >
                    <>
                      <div className="relative flex flex-column group">
                        <MdOutlineDoubleArrow className="text-[26px] text-tahiti-500 " />

                        <div className="absolute left-[-60px] top-[30px] hidden flex items-baseline  ml-2 group-hover:flex">
                          {/* <div className="w-3 h-3 -mr-2 rotate-45 bg-black"></div> */}
                          <span className="text-white px-2 py-1 w-[120px] bg-tahiti-500 border-2 border-[#f36eae]  rounded-md  hover:shadow-2xl hover:shadow-gray-500/50">
                            Click for more
                          </span>
                        </div>
                      </div>
                    </>
                  </Link>
                </div>
                <div>
                  <ProductCard productList={CatData?.featured_products} />
                </div>
              </div>
            )}
          </>

          <>
            {" "}
            {CatData?.best_selling_products?.length > 0 && (
              <div>
                <div className="py-5 flex items-center justify-between px-2">
                  <div className="text-[18px] font-semibold  cursor-pointer xs:text-[14px] xms:text-[14px] xls:text-[14px] sm:text-[16px]">
                    Best Selling Products{" "}
                    <span className="text-[14px] font-medium text-gray-500 xs:text-[10px] xms:text-[10px] xls:text-[10px] sm:text-[12px]">
                      {" "}
                      Check & Get Your Desired Product
                    </span>
                  </div>
                  <Link
                    href={`/best-selling-products`}
                    className="animate-bounce cursor-pointer z-10"
                  >
                    <>
                      <div className="relative flex flex-column group">
                        <MdOutlineDoubleArrow className="text-[26px] text-tahiti-500 " />

                        <div className="absolute left-[-60px]  hidden top-[30px]  ml-2 group-hover:flex">
                          {/* <div className="w-3 h-3 -mr-2 rotate-45 bg-black"></div> */}
                          <span className="text-white px-2 py-1 w-[120px] bg-tahiti-500 border-2 border-[#f36eae]  rounded-md  hover:shadow-2xl hover:shadow-gray-500/50">
                            Click for more
                          </span>
                        </div>
                      </div>
                    </>
                  </Link>
                </div>
                <div>
                  <ProductCard productList={CatData?.best_selling_products} />
                </div>
              </div>
            )}
          </>

          {prod?.length > 0 &&
            prod?.map((item, index) => (
              <div key={index}>
                <div className="py-5 flex items-center justify-between px-2">
                  <div className="text-[18px] font-semibold border-b cursor-pointer xs:text-[14px] xms:text-[14px] xls:text-[14px] sm:text-[16px]">
                    {item?.name}{" "}
                    <span className="text-[14px] font-medium text-gray-500 xs:text-[10px] xms:text-[10px] xls:text-[10px] sm:text-[12px]">
                      {" "}
                      {item?.meta_name}
                    </span>
                  </div>
                  <Link
                    href={`/category/${item?.slug}`}
                    className="animate-bounce cursor-pointer z-10"
                  >
                    <>
                      <div className="relative flex flex-column group">
                        <MdOutlineDoubleArrow className="text-[26px] text-tahiti-500 " />

                        <div className="absolute left-[-60px] top-[30px] hidden flex items-baseline  ml-2 group-hover:flex">
                          <span className="text-white px-2 py-1 w-[120px] bg-tahiti-500 border-2 border-[#f36eae]  rounded-md  hover:shadow-2xl hover:shadow-gray-500/50">
                            Click for more
                          </span>
                        </div>
                      </div>
                    </>
                  </Link>
                </div>
                <div>
                  <ProductCard productList={item?.section_product_list} />
                </div>
              </div>
            ))}

          <>
            {CatData?.categories?.length > 0 &&
              CatData?.categories?.map((item, index) => (
                <div key={index}>
                  {item?.products?.length > 0 && (
                    <div className="py-5 flex items-center justify-between px-2">
                      <div className="text-[18px] font-semibold border-b cursor-pointer xs:text-[14px] xms:text-[14px] xls:text-[14px] sm:text-[16px]">
                        {item?.name}
                        <span className="text-[14px] font-medium text-gray-500 xs:text-[10px] xms:text-[10px] xls:text-[10px] sm:text-[12px]">
                          {" "}
                          Get Your Product from Category
                        </span>
                      </div>
                      <Link
                        href={`/product-list/${item?.slug}`}
                        className="animate-bounce cursor-pointer z-10"
                      >
                        <>
                          <div className="relative flex flex-column group">
                            <MdOutlineDoubleArrow className="text-[26px] text-tahiti-500 " />

                            <div className="absolute left-[-60px] top-[30px] hidden flex items-baseline  ml-2 group-hover:flex">
                              <div className="w-3 h-3 -mr-2 rotate-45 bg-black"></div>
                              <span className="text-white px-2 py-1 w-[120px] bg-tahiti-500 border-2 border-[#f36eae]  rounded-md  hover:shadow-2xl hover:shadow-gray-500/50">
                                Click for more
                              </span>
                            </div>
                          </div>
                        </>
                      </Link>
                    </div>
                  )}
                  <div>
                    <ProductCard productList={item?.products} />
                  </div>
                </div>
              ))}
          </>

          {category_section !== null && (
            <div>
              <div className="py-5 flex items-center justify-between px-2">
                <div className="text-[18px] font-semibold border-b-[2px] cursor-pointer pb-1 border-tahiti-500 xs:text-[14px] xms:text-[14px] xls:text-[14px] sm:text-[16px]">
                  {category_section?.bottom_category_section?.name}{" "}
                </div>

                <div
                  onClick={() => router.push("/product_categories")}
                  className=" cursor-pointer text-[15px] px-2 bg-tahiti-500 py-2 rounded-sm text-white shadow-md hover:bg-black transition duration-500 xs:py-1 xms:py-1 xls:py-1"
                >
                  View All Categories
                </div>
              </div>
              <ConcernSection category_section={category_section} />
            </div>
          )}

          <HighlightSection category_section={category_section} />

          {brands.length > 0 && <BrandSection brands={brands} />}
        </div>
      </main>
    </>
  );
}


// export async function getServerSideProps(context) {
//   let res = await request(`get-categories`);
//   let newProd = await request(`get-product-section`);
//   let categories = await request(`navbar-categories`);
//   let campaign = await request(`get-campaign`);
//   let categorySection = await request(`get-category-section`);
  
//   return {
//     props: {
//       CatData: res || null,
    
//       prod: newProd?.data || [],
//       slide: res?.sliders || null,
//       feature_product: res?.featuredProducts || null,
//       campaign: campaign?.data || [],
//       category: categories?.categories || [],
//       brands: res?.brands || [],
//       category_section: categorySection || null,
//     },
//   };
// }
