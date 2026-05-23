import React, { useState, useEffect,useRef } from "react";
import FirstSection from "@/components/Landing/firstSection";
import SecondSection from "@/components/Landing/secondSection";
import ThirdSection from "@/components/Landing/thirdSection";
import FourthSection from "@/components/Landing/fourthSection";
import FifthSection from "@/components/Landing/fifthSection";
import EightSection from "@/components/Landing/eightSection";
import SixthSection from "@/components/Landing/sixthSection";
import DemoNine from "@/components/Landing/demo/demo";


const Products = () => {
  const eightSectionRef = useRef(null);


  return (
    <div className="  z-0">
      <FirstSection  eightSectionRef={eightSectionRef}/>
      <SecondSection />
      <ThirdSection eightSectionRef={eightSectionRef}/>
      <FourthSection eightSectionRef={eightSectionRef}/>
      {/* <FifthSection eightSectionRef={eightSectionRef}/> */}
      {/* <SixthSection/> */}
      {/* <EightSection eightSectionRef={eightSectionRef}/> */}
      <DemoNine eightSectionRef={eightSectionRef}/>
      

    </div>
  );
};

export default Products;
