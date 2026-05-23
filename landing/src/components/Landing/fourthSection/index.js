
import Image from "next/image";

import { imagePath } from '@/lib/config';
import { FaCartArrowDown, FaHandPointRight } from 'react-icons/fa';



const FourthSection = ({ eightSectionRef, ProductDetails }) => {

  // const [products, setproducts] = useState(null);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       let res = await request(`get-product-details`);
  //       setproducts(res);
  //     } catch (error) {}
  //   };
  //   getData();
  // }, []);

  const scrollToFifthSection = () => {
    eightSectionRef?.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="mt-[50px]">
      <div className="bg-gradient-to-b from-primary-100 via-primary-300  to-primary-500 py-[40px] max-w-7xl mx-auto px-6 rounded-md">
        <div>
          <div className="flex items-center justify-center">
            <div className="px-4 py-2 text-[24px] font-bold text-white text-center rounded-3xl xs:text-[16px] xms:text-[16px] xls:text-[16px] sm:text-[18px]">
              {ProductDetails?.data[0]?.title}
            </div>
          </div>
          <div className="w-full min-h-[500px]">
            <div className="pt-[50px]">
              <div className="grid grid-cols-2 gap-16 px-10 xs:grid-cols-1 xms:grid-cols-1 xls:grid-cols-1 ">
                <div className="col-span-1 grid items-center justify-center">
                  <div>
                    {ProductDetails?.data?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center border-b py-2"
                      >
                        <div className="text-[24px] mr-[5px] text-[#fff] xs:text-[16px] xms:text-[16px] xls:text-[16px] ">
                          <FaHandPointRight size={25} className="text-white" />
                        </div>
                        <div className="text-[22px] font-bold text-[#fff] xs:text-[16px] xms:text-[16px] xls:text-[16px] ">
                          {item?.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-1 rounded-2xl">
                  <div className="">
                    <Image
                      className="rounded-xl  aspect-[1/1] object-contain"
                      src={`${imagePath}/storage/${ProductDetails?.image}`}
                      width={550}
                      height={550}
                      alt={"landing"}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center py-[40px]">
              <button
                onClick={scrollToFifthSection}
                className=" px-10 py-2 rounded-lg text-xl font-bold text-white bg-[#FC7F01]  transition duration-300 transform hover:scale-90 flex items-center"
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
  );
};

export default FourthSection