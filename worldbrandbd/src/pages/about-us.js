import request from '@/lib/request';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const AboutUs = () => {
 

    const [data, setData] = useState(null);

    useEffect(() => {
      const getData = async () => {
        let res = await request(`about-us`);
     

        setData(res?.data);
      };
      getData();
    }, [1]);


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

      <div className="bg-gray-100 min-h-[670px] pt-[160px] xs:pt-[90px] xms:pt-[90px] xls:pt-[90px] sm:pt-[100px]">
        <section>
          <div className="container max-w-[95rem] lg:max-w-[70rem] md:max-w-[60rem] sm:max-w-[45rem] xls:max-w-[25rem] xms:max-w-[22rem] xs:max-w-[19rem] px-2 py-10 mx-auto">
            <h1 className="text-4xl xls:text-2xl xms:text-2xl xs:text-2xl font-semibold text-center text-black dark:text-black">
              About Us
            </h1>
            <div className="py-4 pt-5">
              <div
                className="text-base text-black"
                dangerouslySetInnerHTML={{ __html: data?.details }}
              ></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default AboutUs;

// export async function getServerSideProps(context) {
//   let settings = await request(`about-us`);
  
//   return {
//     props: {
//       data: settings?.data || null,
//     },
  
//   };
// }