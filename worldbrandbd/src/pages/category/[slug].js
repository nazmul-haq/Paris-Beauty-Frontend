import Custom404 from "@/components/productSection/Custom404";
import SingleProduct from "@/components/productSection/SingleProduct";
import request from "@/lib/request";
import Head from "next/head";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import hostname from "@/lib/config";


const ProductList = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  const { ref, inView } = useInView();

  const [categoryName, setCategoryName] = useState("");

  const [totalData, setTotalData] = useState("");

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (router?.query?.slug) {
      const getData = async () => {
        let res = await request(
          `get-section-details/${router.query.slug}?page=${page}`
        );

        setCategoryName(res?.category_name);
        setProducts(res.data?.data);
        setTotalData(res?.data?.total);
      };
      getData();
    }
  }, [router?.query?.slug]);


   

     const loadMoreUsers = async () => {
       const res = await request(
         `get-section-details/${router.query.slug}?page=${page + 1}`
       );
       setProducts([...products, ...res?.data?.data]);

       setPage(page + 1);
     };

     useEffect(() => {
       if (inView) {
         loadMoreUsers();
       }
     }, [inView]);
 

  useEffect(() => {
    if (typeof window.fbq === "function") {
      window.fbq("track", "Pageview");
    }
  }, []);


 
 
  

    return (
      <>
        <Head>
          <script>
            {`
                                       (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NNCSPDMM');
            `}
          </script>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-NNCSPDMM"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
        </Head>
        <div className="min-h-[600px] bg-white pt-[170px] sm:pt-[130px] xls:pt-[120px] xms:pt-[120px] xs:pt-[120px] text-black">
          <div className="max-w-[95rem] lg:max-w-[70rem] md:max-w-[60rem] sm:max-w-[45rem] xls:max-w-[25rem] xms:max-w-[22rem] xs:max-w-[19rem]  mx-auto">
            <div className="flex items-center justify-between py-2 px-2">
              <p className="text-[18px] font-semibold">{categoryName}</p>
              {products?.length > 0 ? (
                <p className="font-sans text-sm ">{totalData} items</p>
              ) : null}
            </div>

            <div className="pb-4 mt-[10px] px-2">
              {products?.length > 0 ? (
                <div>
                  <div className="grid grid-cols-5 gap-3 xs:grid-cols-2 xs:gap-1 xms:grid-cols-3 xms:gap-1 xls:grid-cols-3 xls:gap-1 sm:grid-cols-3 sm:gap-2 md:grid-cols-4 md:gap-2">
                    {products?.map((item, index) => (
                      <div key={index}>
                        <SingleProduct item={item?.product} />
                      </div>
                    ))}
                  </div>

                  {totalData == products?.length ? null : (
                    <div
                      ref={ref}
                      className="text-black flex justify-center mt-2"
                    >
                      <svg
                        className="fill-current text-tahiti-500 animate-spin h-7 w-7"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 28 28"
                      >
                        <path d="M12 2C12.5523 2 13 2.44772 13 3V6C13 6.55228 12.5523 7 12 7C11.4477 7 11 6.55228 11 6V3C11 2.44772 11.4477 2 12 2ZM12 17C12.5523 17 13 17.4477 13 18V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V18C11 17.4477 11.4477 17 12 17ZM22 12C22 12.5523 21.5523 13 21 13H18C17.4477 13 17 12.5523 17 12C17 11.4477 17.4477 11 18 11H21C21.5523 11 22 11.4477 22 12ZM7 12C7 12.5523 6.55228 13 6 13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H6C6.55228 11 7 11.4477 7 12ZM19.0711 19.0711C18.6805 19.4616 18.0474 19.4616 17.6569 19.0711L15.5355 16.9497C15.145 16.5592 15.145 15.9261 15.5355 15.5355C15.9261 15.145 16.5592 15.145 16.9497 15.5355L19.0711 17.6569C19.4616 18.0474 19.4616 18.6805 19.0711 19.0711ZM8.46447 8.46447C8.07394 8.85499 7.44078 8.85499 7.05025 8.46447L4.92893 6.34315C4.53841 5.95262 4.53841 5.31946 4.92893 4.92893C5.31946 4.53841 5.95262 4.53841 6.34315 4.92893L8.46447 7.05025C8.85499 7.44078 8.85499 8.07394 8.46447 8.46447ZM4.92893 19.0711C4.53841 18.6805 4.53841 18.0474 4.92893 17.6569L7.05025 15.5355C7.44078 15.145 8.07394 15.145 8.46447 15.5355C8.85499 15.9261 8.85499 16.5592 8.46447 16.9497L6.34315 19.0711C5.95262 19.4616 5.31946 19.4616 4.92893 19.0711ZM15.5355 8.46447C15.145 8.07394 15.145 7.44078 15.5355 7.05025L17.6569 4.92893C18.0474 4.53841 18.6805 4.53841 19.0711 4.92893C19.4616 5.31946 19.4616 5.95262 19.0711 6.34315L16.9497 8.46447C16.5592 8.85499 15.9261 8.85499 15.5355 8.46447Z"></path>
                      </svg>
                    </div>
                  )}
                </div>
              ) : (
                <>{products?.length == 0 ? <Custom404 /> : null}</>
              )}
            </div>
          </div>
        </div>
      </>
    );
};

export default ProductList;

// export async function getServerSideProps(context) {


//   try {
//     let page = 1;

//     let resData = await fetch(
//       `${hostname?.hostname}/api/get-section-details/${context.query.slug}?page=${page}`
//     );

//    let res = await resData.json();

//     if(res?.data?.length == 0){
//       return {
//         notFound: true,
//       };
//     } else {
//       return {
//         props: {
//           Data: res?.data?.data || null,
//           PageSize: res?.data?.per_page || null,
//           TotalData: res?.data?.total || null,
//           category_name: res?.sections?.name || null,
//         },
//       };

//     }
    
//   } catch (error) {
//     console.error("Error fetching section-details product data:", error);
//     return {
//       notFound: true,
//     };
//   }

  
  
// }

