
import { imagePath } from '@/lib/config';
import Image from "next/image";
import { FaCartArrowDown, FaHandPointRight } from 'react-icons/fa';




const ThirdSection = ({ eightSectionRef, whyUs }) => {
  

  const scrollToFifthSection = () => {
    eightSectionRef?.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="mt-[50px]">
      <div className="bg-gradient-to-b from-primary-100 via-primary-300 to-primary-500 py-[40px] max-w-7xl mx-auto px-6 rounded-md">
        <div>
          <div className="flex items-center justify-center">
            {whyUs?.data?.length > 0 ? (
              <div className="bg-primary-500 px-4 py-2 text-[24px] font-bold text-white rounded-3xl xs:text-[16px] xms:text-[16px] xls:text-[16px] sm:text-[18px]">
                {whyUs?.data[0]?.title}
              </div>
            ) : null}
          </div>
          <div className="rounded-md w-full bg-white  mt-[-25px]">
            <div className="pt-[50px]">
              <div className="grid grid-cols-2 gap-16 px-10 xs:grid-cols-1 xms:grid-cols-1 xls:grid-cols-1 sm:grid-cols-1">
                <div className="col-span-1 rounded-2xl">
                  <div className="">
                    <Image
                      className="rounded-2xl drop-shadow-lg "
                      src={`${imagePath}/storage/${whyUs?.image}`}
                      width={400}
                      height={400}
                      alt={"landing"}
                    />
                  </div>
                </div>
                <div className="col-span-1  ">
                  {whyUs?.data?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center border-b py-2"
                    >
                      <div className="text-[24px] mr-[5px] mb-[-3px] text-[#D0868B] xs:text-[16px] xms:text-[16px] xls:text-[16px] sm:text-[18px]">
                        <FaHandPointRight
                          size={25}
                          className="text-primary-500"
                        />
                      </div>
                      <div className="text-[22px] font-bold text-primary-500 xs:text-[16px] xms:text-[16px] xls:text-[16px] sm:text-[18px]">
                        {item?.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center py-[40px] xs:px-2">
              <div className="py-5 flex justify-center">
                <button
                  onClick={scrollToFifthSection}
                  className=" px-10 py-2 rounded-lg text-xl font-bold text-white bg-primary-500  transition duration-300 transform hover:scale-90 flex items-center"
                >
                  {" "}
                  <span className="pr-2">
                    <FaCartArrowDown size={21} className="text-white" />
                  </span>{" "}
                  এখনই অর্ডার করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdSection