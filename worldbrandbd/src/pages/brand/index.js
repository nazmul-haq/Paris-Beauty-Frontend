import hostname from "@/lib/config";
import request from "@/lib/request";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Brand = () => {
   

  const router = useRouter();


  const [categories,setcategories] = useState([]);
  
  
    useEffect(() => {
     
        const getData = async () => {
          let res = await request(`get-brands`);

      

          setcategories(res?.category_wise_brands);
        
          
        };
        getData();
    
    }, [1]);


  return (
    <div
      className={` min-h-screen pt-[170px] sm:pt-[130px] xls:pt-[120px] xms:pt-[120px] xs:pt-[120px]`}
    >
      <div className="max-w-[85rem] mx-auto tracking-[0.4px]">
        <div className="px-2">
          <div className="text-[20px] font-semibold py-3 capitalize">All Brands</div>
          <div className="bg-white py-3 px-3 rounded-sm shadow-sm xs:px-0 xms:px-0 xls:px-0 sm:px-0 ">
            {categories.length > 0 ? (
              <div >
                {categories?.map((cat_item, index) => (
                  <div key={index}>
                    <div className="text-[24px] text-tahiti-500 px-2 pb-2 text-left py-3">
                      {cat_item?.name}
                    </div>

                    {cat_item.brands.length > 0 ? (
                      <div className="grid grid-cols-6 gap-3 px-2 pb-2 xs:grid-cols-3 xs:gap-1 xms:grid-cols-3 xms:gap-1 xls:grid-cols-3 xls:gap-1 sm:grid-cols-4 sm:gap-2">
                        {cat_item.brands?.map((item, index_b) => (
                          <div
                            key={index_b}
                            className="bg-white  border rounded-lg shadow-md cursor-pointer"
                            onClick={() => router.push(`/brand/${item?.slug}`)}
                          >
                            <div className="grid items-center justify-center">
                              <div className="my-2 relative w-[130px] h-[160px] xs:w-[60px] xs:h-[80px] xms:w-[70px] xms:h-[90px] xls:w-[80px] xls:h-[100px] sm:w-[80px] sm:h-[100px] md:w-[90px] md:h-[110px]">
                                <Image
                                  className="h-full w-full"
                                  src={`${hostname.ImageHostName}/storage/brands/${item?.image}`}
                                  width={100}
                                  height={100}
                                  priority
                                  alt="category"
                                />
                              </div>
                            </div>
                            <div className="text-[15px] text-center py-1">
                              {item?.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center">NO Brands Found</div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">NO Brands Found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brand;

// export async function getServerSideProps(context) {

//   try {
//     let res = await request(`get-brands`);

//     return {
//       props: {
//         data: res?.brands || [],
//         categories: res?.category_wise_brands || [],
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching brand product data:", error);
//     return {
//       notFound: true,
//     };
//   }
  
// }
