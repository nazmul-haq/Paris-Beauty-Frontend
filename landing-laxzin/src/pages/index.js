import React, { useRef } from "react";
import FirstSection from "@/components/Landing/firstSection";
import SecondSection from "@/components/Landing/secondSection";
import ThirdSection from "@/components/Landing/thirdSection";
import FourthSection from "@/components/Landing/fourthSection";

import DemoNine from "@/components/Landing/demo/demo";

import { Hind_Siliguri } from "next/font/google";
import request from "@/lib/request";
import SixthSection from "@/components/Landing/sixthSection";


const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});


export default function Home({
  banner,
  products,
  whyUs,
  ProductDetails,
  review,
  whatsapp,
  deliveryCharge,
  titleRes,
}) {
  const eightSectionRef = useRef(null);

  

  return (
    <main className={`${hindSiliguri.className} bg-background`}>
      <FirstSection eightSectionRef={eightSectionRef} banner={banner} />
      <SecondSection
        eightSectionRef={eightSectionRef}
        products={products}
        whatsapp={whatsapp}
        titleRes={titleRes}
      />
      <ThirdSection eightSectionRef={eightSectionRef} whyUs={whyUs} />
      <FourthSection
        eightSectionRef={eightSectionRef}
        ProductDetails={ProductDetails}
      />
      {/* <FifthSection eightSectionRef={eightSectionRef}/> */}
      {review && <SixthSection review={review} />}

      {/* <EightSection eightSectionRef={eightSectionRef}/> */}
      <DemoNine
        eightSectionRef={eightSectionRef}
        deliveryCharge={deliveryCharge}
      />
    </main>
  );
}


export async function getServerSideProps(context) {
  const res = await request(`get-banner`);
   
    const productRes = await request(`get-landing-products`);

    const titleRes = await request(`get-product`);
   
    const whyUsres = await request(`get-whyus`);

    const ProductDetailsRes = await request(`get-product-details`);

     const reviewRes = await request(`get-review`);

     const whatsappRes = await request(`get-whatsapp-heading`);

     const deliveryChargepRes = await request(
       `delivery-charge?website=laxzin-landing`
     );

    

     

  return {
    props: {
      banner: res?.banner || null,
      products: productRes?.data || null,
      titleRes:titleRes?.product|| null,
      whyUs: whyUsres || null,
      ProductDetails: ProductDetailsRes || null,
      review: reviewRes || null,
      whatsapp: whatsappRes?.heading || null,
      deliveryCharge: deliveryChargepRes || null,
    },
  };
}
