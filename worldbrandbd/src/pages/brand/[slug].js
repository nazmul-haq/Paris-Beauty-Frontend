import Custom404 from "@/components/productSection/Custom404";
import SingleProduct from "@/components/productSection/SingleProduct";
import request from "@/lib/request";
import { Pagination } from "antd";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const ProductList = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);

  const [data, setData] = useState([]);

  const [pageSize, setPageSize] = useState(1);




  const bandName = router?.query?.slug?.replace(/-/g, " ");









useEffect(() => {
  if (router?.query?.slug) {
    const getData = async () => {
      let res = await request(`brand/${router.query.slug}`);


      setData(res.data?.data);
      setTotalData(res?.data?.total);
      setPageSize(res?.data?.per_page);
    };
    getData();
  }
}, [router?.query?.slug]);

  const handlePageChange = async (page) => {
    let res = await request(
      `brand/${router.query.slug}?page=${page}`
    );
    setPage(page);
    setPageSize(res?.data?.per_page);
    setTotalData(res?.data?.total);
    setData(res?.data?.data);

    scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
      block: "start",
    });
  };

   useEffect(() => {
     const handleRouteChange = () => {};

     router.events.on("routeChangeStart", handleRouteChange);

     return () => {
       router.events.off("routeChangeStart", handleRouteChange);
     };
   }, [router.events]);

  useEffect(() => {
    if (typeof window.fbq === "function") {
      window.fbq("track", "Pageview");
    }
  }, []);


  


    return (
      <div
      
        className="min-h-[600px] bg-white pt-[170px] sm:pt-[130px] xls:pt-[120px] xms:pt-[120px] xs:pt-[120px] text-black"
      >
        <div className="max-w-[95rem] lg:max-w-[70rem] md:max-w-[60rem] sm:max-w-[45rem] xls:max-w-[25rem] xms:max-w-[22rem] xs:max-w-[19rem] mx-auto">
          {/* <div className="fixed top-[170px] px-2  max-w-[115rem] lg:max-w-[78rem] md:max-w-[60rem] sm:max-w-[45rem] xls:max-w-[24rem] xms:max-w-[21rem] xs:max-w-[278px] w-full text-black bg-white z-10 py-2 text-lg font-semibold sm:py-2 md:py-2 lg:py-2 capitalize">
            <div className="flex items-center justify-between">
              <p>{category_name}</p>
              <p className="font-sans text-sm pl-1">{TotalData} items</p>
            </div>
          </div> */}

          <div className="flex items-center justify-between py-2 px-2">
            <p className="text-[18px] font-semibold capitalize">{bandName}</p>
            <p className="font-sans text-sm ">{totalData} items</p>
          </div>

          {/* {loading ? (
            <ProdLoadingSkeleton />
          ) : ( */}
          <div className="pb-4 mt-[10px] px-2">
            {data?.length > 0 ? (
              <div>
                <div
                  
                  className="grid grid-cols-5 gap-3 xs:grid-cols-2 xs:gap-1 xms:grid-cols-3 xms:gap-1 xls:grid-cols-3 xls:gap-1 sm:grid-cols-3 sm:gap-2 md:grid-cols-4 md:gap-2"
                >
                  {data?.map((item, index) => (
                    <div
                      
                      key={index}
                    >
                      <SingleProduct item={item} />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center mt-3 mb-3">
                  <Pagination
                    current={page}
                    total={totalData}
                    onChange={(page) => handlePageChange(page)}
                    pageSize={pageSize}
                  />
                </div>
              </div>
            ) : (
              <>
                { data?.length == 0 ? <Custom404 /> : null}
              </>
            )}
          </div>
          {/* )} */}
        </div>

        {/* <Link
          href={`/display-centers`}
          className="mt-3  bg-cover bg-center bg-no-repeat h-72 sm:h-64 flex justify-center items-center"
          style={{ backgroundImage: "url('/image/footer-bg-one.jpg')" }}
        >
          <button className="px-10 py-3 bg-white text-black shadow-lg text-2xl xms:text-xl xs:text-base uppercase tracking-wider font-semibold drop-shadow-lg hover:bg-opacity-70 duration-300">
            find our display center
          </button>
        </Link> */}
      </div>
    );
};

export default ProductList;

// export async function getServerSideProps(context) {


//   try {
//     let page = 1;

//     let res = await request(`brand/${context.query.slug}?page=${page}`);

//    if (res?.data?.length == 0) {
//      return {
//        notFound: true,
//      };
//    } else {
//     return {
//       props: {
//         Data: res?.data?.data || null,
//         PageSize: res?.data?.per_page || null,
//         TotalData: res?.data?.total || null,
//         category_name: res?.sections?.name || null,
//       },
//     };
     
//    }

    
//   } catch (error) {
//     console.error("Error fetching brand product data:", error);
//     return {
//       notFound: true,
//     };
//   }
  
  
// }

