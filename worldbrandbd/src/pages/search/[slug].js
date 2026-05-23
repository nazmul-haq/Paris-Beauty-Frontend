
import SingleProduct from "@/components/productSection/SingleProduct";
import request from "@/lib/request";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";


const Search = () => {
  const router = useRouter();

  const { slug } = router?.query;

  const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
   

  


useEffect(() => {
  if (slug) {
    const getData = async () => {
      let enecodedSlug;

      try {
        enecodedSlug = encodeURIComponent(slug);
       
      } catch (err) {

      
        setLoading(false);
        return;
      }

      try {
        const res = await request(
          `search/product?product_name=${enecodedSlug}`
        );
        setData(res?.data);
      } catch (err) {
        console.error("Error fetching data:", err.message);
        
      } finally {
        setLoading(false);
      }
    };

    getData();
  }
}, [slug]);




   

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
      <div className="min-h-[700px] bg-white pt-[170px] sm:pt-[130px] xls:pt-[120px] xms:pt-[120px] xs:pt-[120px] text-black">
        <div className="max-w-[95rem] lg:max-w-[70rem] md:max-w-[60rem] sm:max-w-[45rem] xls:max-w-[25rem] xms:max-w-[22rem] xs:max-w-[19rem] mx-auto">
          <div className="px-2 py-4">
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: "170px",
                }}
              >
                {" "}
                <ThreeDots
                  height="80"
                  width="80"
                  radius="9"
                  color="#1F2937"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  visible={true}
                />
              </div>
            ) : (
              <div>
                {data?.length > 0 ? (
                  <>
                    <div className="grid grid-cols-5 gap-3 xs:grid-cols-2 xs:gap-1 xms:grid-cols-2 xms:gap-1 xls:grid-cols-3 xls:gap-1 sm:grid-cols-3 sm:gap-2 md:grid-cols-4 md:gap-2">
                      {data?.map((item, index) => (
                        <div key={index}>
                          <SingleProduct item={item} />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="mt-20">
                    <p className="text-3xl text-center font-semibold text-black tracking-wider">
                      No Data found
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
