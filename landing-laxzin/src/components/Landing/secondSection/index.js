import { imagePath } from '@/lib/config';
import Image from "next/image";
import Link from "next/link";
import { FaCartArrowDown, FaWhatsapp } from 'react-icons/fa';




const SecondSection = ({ eightSectionRef, products, whatsapp,titleRes }) => {
  const scrollToFifthSection = () => {
    eightSectionRef?.current?.scrollIntoView({ behavior: "smooth" });
  };



  

  return (
    <div className="mt-[50px]">
      <div>
        <div className="max-w-7xl mx-auto bg-gradient-to-b from-primary-100 via-primary-300 to-primary-500 px-6 rounded-md">
          <div className="flex items-center justify-center pt-[50px] ">
      
              <div className="bg-primary-500 px-4 py-2 text-[26px] font-bold text-white rounded-3xl xs:text-[20px] xms:text-[20px] xls:text-[20px] sm:text-[22px]">
                {titleRes?.title}
              </div>
          
          </div>
          <div className="flex items-center justify-center py-10">
            {products?.length > 0 ? (
              <div className="flex flex-wrap flex-row justify-center">
                {products?.map((item, index) => (
                  <div key={index}>
                    <div className="bg-white border-[3px] border-[#D0868B]">
                      <Image
                        className="object-contain aspect-[1/1] "
                        src={`${imagePath}/storage/product/${item?.image[0]}`}
                        width={400}
                        height={500}
                        alt={"landing"}
                      />

                      <p className=" text-[#D0868B]  line-clamp-1 text-center pt-5">
                        {item?.product_name}
                      </p>

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
                ))}
              </div>
            ) : (
              <div>Product Not found</div>
            )}
          </div>
          <div className=" py-3">
            <p className="text-center text-white font-semibold text-3xl">
              প্রয়োজনে কল করুন বা কল করতে নিচের বাটনে ক্লিক করুন
            </p>
            <Link
              href={`https://wa.me/+88${whatsapp?.heading}`}
              target="_blank"
              className="flex justify-center"
            >
              <button className="border-2 border-white px-10 py-2 my-5 rounded-lg text-xl font-bold text-white bg-primary-500  transition duration-300 transform hover:scale-90 flex items-center">
                {" "}
                <span className="pr-2">
                  <FaWhatsapp size={21} className="text-white" />
                </span>{" "}
                {whatsapp?.heading}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondSection