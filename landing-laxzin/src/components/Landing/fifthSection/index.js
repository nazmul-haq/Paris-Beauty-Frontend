import request from "@/lib/request";
import { useEffect, useState } from 'react';

import { imagePath } from '@/lib/config';
import Image from "next/image";
import { BiSolidChevronRightCircle } from "react-icons/bi";


const FifthSection = ({eightSectionRef}) => {


  const [products, setproducts] = useState(null)

  useEffect(() => {
    const getData = async () => {
      try {
        let res = await request(`get-gift`);
        setproducts(res)
      } catch (error) {}
    };
    getData();
  }, []);
  const scrollToFifthSection = () => {
    eightSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="">
        <div className="bg-white py-[40px] ">
          <div className="max-w-6xl mx-auto mt-[30px] px-2">
            <div className="flex items-center justify-center">
              <div className="bg-[#b08020] px-4 py-2 text-[24px] font-bold text-white rounded-3xl xs:text-[16px] xms:text-[16px] xls:text-[16px] sm:text-[18px]">
                {products?.data[0]?.title}
              </div>
            </div>
            <div
              style={{ boxShadow: "0 4px 8px 0 #b08020, 0 6px 20px 0 #b08020" }}
              className="rounded-xl w-full bg-white min-h-[500px] mt-[-25px]"
            >
              <div className="pt-[50px]">
                <div className="grid grid-cols-2 gap-10 px-10 xs:grid-cols-1 xms:grid-cols-1 xls:grid-cols-1">
                  <div className="col-span-1 rounded-2xl">
                    <div className="">
                      <Image
                        className="rounded-2xl drop-shadow-lg "
                        src={`${imagePath}/${products?.image}`}
                        width={500}
                        height={500}
                        alt={"landing"}
                      />
                    </div>
                  </div>
                  <div className="col-span-1 grid items-center justify-center">
                    <div>
                      {products?.data?.map((item,index)=>
                      <div key={index} className="flex items-center border-b py-2">
                        <div className="text-[24px] mr-[5px] text-[#D0868B] xs:text-[16px] xms:text-[16px] xls:text-[16px]">
                          <BiSolidChevronRightCircle />
                        </div>
                        <div className="text-[22px] font-bold text-[#D0868B] xs:text-[16px] xms:text-[16px] xls:text-[16px]">
                         {item?.name}
                        </div>
                      </div>
                      )}
                      
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center py-[40px]">
                <button
                 onClick={scrollToFifthSection}
                  style={{
                    boxShadow: "0 4px 8px 0 #1234, 0 6px 20px 0 #1234",
                  }}
                  className="border-[5px] border-white px-3 py-3 w-[300px] rounded-lg text-[24px] font-bold text-white bg-black hover:bg-[#27a734] transition duration-300 transform hover:scale-90 xs:text-[16px] xms:text-[16px] xls:text-[16px]"
                >
                  {" "}
                  অর্ডার করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default FifthSection