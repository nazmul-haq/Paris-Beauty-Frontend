
import { imagePath } from '@/lib/config';
import Image from "next/image";
import { FaCartArrowDown } from "react-icons/fa";



const FirstSection = ({ eightSectionRef, banner }) => {
  

  const scrollToFifthSection = () => {
    eightSectionRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

 

  

  return (
    <div>
      <div className=" bg-gradient-to-b from-primary-300 via-primary-100 to-primary-500">
        <div className="pb-20 pt-10 grid items-center justify-center px-2">
          <div>
            <div className=" flex items-center justify-center ">
              <Image
                className="rounded-2xl  object-contain "
                src={`/assets/logo.webp`}
                width={250}
                height={250}
                alt={"logo"}
              />
            </div>

            <div className=" flex items-center justify-center pt-5">
              <Image
                className="rounded-2xl  object-contain"
                src={`${imagePath}/storage/${banner?.image}`}
                width={1440}
                height={768}
                alt={"logo"}
              />
            </div>
            <div className="text-center text-[30px] font-bold text-white py-8 xs:text-[16px] xms:text-[16px] xls:text-[16px] sm:text-[18px]">
              {banner?.title}
            </div>
            <div className="flex items-center justify-center">
              <button
                onClick={scrollToFifthSection}
                className="border-[2px] px-10 py-2 rounded-lg text-xl font-bold text-white bg-primary-500  transition duration-300 transform hover:scale-90 flex items-center"
              >
                {" "}
                <span className="pr-2">
                  <FaCartArrowDown size={21} className="text-white" />
                </span>{" "}
                অর্ডার করুন
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstSection






