import React, { useEffect, useState } from "react";

// import request from "@/lib/request";
import Link from "next/link";

import CategoryCard from "@/components/CategoryCard/CategoryCard";
import hostname from "@/lib/config";
import request from "@/lib/request";


const Product_categories = () => {

  const [Data,setData] = useState([])

  useEffect(()=>{
        const getData = async()=>{
               let res = await request(`get-category-container`);
 
               setData(res.categories);

        }
        getData()
  },[1])
 
 


  return (
    <div className="min-h-screen pt-[150px] xs:pt-[120px] xms:pt-[130px] xls:pt-[130px] sm:pt-[140px]">
      <div className="max-w-[95rem] lg:max-w-[70rem] md:max-w-[60rem] sm:max-w-[45rem] xls:max-w-[25rem] xms:max-w-[22rem] xs:max-w-[19rem]  mx-auto">
        <div className="flex items-center justify-between py-2 px-2">
          <p className="text-[18px] font-semibold">All Product Categories</p>
        </div>
        <div className="px-2 py-2">
          {Data.length > 0 &&
            Data?.map((item, index) => (
              <div key={index}>
                {item?.nav_two_level_categories.length > 0 ||
                  item?.nav_one_level_categories.length > 0 ? <div className="text-[24px] text-tahiti-500">{item?.name}</div> : null}
                

                {item?.nav_two_level_categories.length > 0
                  ? item?.nav_two_level_categories.map((items, idx) => (
                      <div key={idx} className="pl-5">
                        <div className="text-[15px] text-tahiti-500 py-1 xs:text-[11px]">
                          {items?.name}
                        </div>

                        <div className="pt-2">
                          <div className="grid grid-cols-6 gap-3  pb-2 xs:grid-cols-3 xs:gap-1 xms:grid-cols-3 xms:gap-1 xls:grid-cols-3 xls:gap-1 sm:grid-cols-4 sm:gap-2">
                            {items?.subsubcategories?.length > 0 &&
                              items?.subsubcategories?.map(
                                (itemsubsub, idxsubsub) => (
                                  <Link
                                    href={`/product-list/${itemsubsub?.slug}`}
                                    className=" p-3 sm:p-[10px] xls:p-[5px] xms:p-[5px] xs:p-[5px] cursor-pointer "
                                    key={idxsubsub}
                                  >
                                    <CategoryCard item={itemsubsub} />
                                  </Link>
                                )
                              )}
                          </div>
                        </div>
                      </div>
                    ))
                  : null}

                {item?.nav_one_level_categories.length > 0 ? (
                  <div className="pl-5">
                    <div className="text-[15px] text-tahiti-500 py-1 xs:text-[11px]">
                      Others
                    </div>
                    <div className="grid grid-cols-6 gap-3  pb-2 xs:grid-cols-3 xs:gap-1 xms:grid-cols-3 xms:gap-1 xls:grid-cols-3 xls:gap-1 sm:grid-cols-4 sm:gap-2 pt-2">
                      {item?.nav_one_level_categories.map((items, idx) => (
                        <Link
                          href={`/product-list/${items?.slug}`}
                          className=" p-3 sm:p-[10px] xls:p-[5px] xms:p-[5px] xs:p-[5px] cursor-pointer "
                          key={idx}
                        >
                          <CategoryCard item={items} />
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Product_categories;


// export async function getServerSideProps(context) {

//   try {
//     let resData = await fetch(
//       `${hostname?.hostname}/api/get-category-container`
//     );
//        let res = await resData.json();
   
     

//     return {
//       props: {
//         Data: res?.categories || [],
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching product categories data:", error);
//     return {
//       notFound: true,
//     };
//   }
  
   
//   }