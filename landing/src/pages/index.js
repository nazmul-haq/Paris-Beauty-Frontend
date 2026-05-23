import React, { useRef } from "react";
import FirstSection from "@/components/Landing/firstSection";
import SecondSection from "@/components/Landing/secondSection";
import ThirdSection from "@/components/Landing/thirdSection";
import FourthSection from "@/components/Landing/fourthSection";

import DemoNine from "@/components/Landing/demo/demo";
import FontLoader from "@/components/FontLoader";

import request from "@/lib/request";
import SixthSection from "@/components/Landing/sixthSection";


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
    <FontLoader>
      <main className="bg-background">
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
        <SixthSection review={review} />
        {/* <EightSection eightSectionRef={eightSectionRef}/> */}
        <DemoNine
          eightSectionRef={eightSectionRef}
          deliveryCharge={deliveryCharge}
        />
      </main>
    </FontLoader>
  );
}


export async function getServerSideProps(context) {
  try {
    // Use Promise.allSettled to handle individual API failures gracefully
    const [
      bannerResult,
      productResult,
      titleResult,
      whyUsResult,
      productDetailsResult,
      reviewResult,
      whatsappResult,
      deliveryChargeResult
    ] = await Promise.allSettled([
      request(`get-banner`),
      request(`get-landing-products`),
      request(`get-product`),
      request(`get-whyus`),
      request(`get-product-details`),
      request(`get-review`),
      request(`get-whatsapp-heading`),
      request(`delivery-charge?website=landing`)
    ]);

    return {
      props: {
        banner: bannerResult.status === 'fulfilled' ? bannerResult.value?.banner : null,
        products: productResult.status === 'fulfilled' ? productResult.value?.data : null,
        titleRes: titleResult.status === 'fulfilled' ? titleResult.value?.product : null,
        whyUs: whyUsResult.status === 'fulfilled' ? whyUsResult.value : null,
        ProductDetails: productDetailsResult.status === 'fulfilled' ? productDetailsResult.value : null,
        review: reviewResult.status === 'fulfilled' ? reviewResult.value : null,
        whatsapp: whatsappResult.status === 'fulfilled' ? whatsappResult.value?.heading : null,
        deliveryCharge: deliveryChargeResult.status === 'fulfilled' ? deliveryChargeResult.value : null,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    // Return empty props to prevent the page from crashing
    return {
      props: {
        banner: null,
        products: null,
        titleRes: null,
        whyUs: null,
        ProductDetails: null,
        review: null,
        whatsapp: null,
        deliveryCharge: null,
      },
    };
  }
}
