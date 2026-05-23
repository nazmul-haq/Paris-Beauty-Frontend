import hostname from "@/lib/config";
import Image from "next/image";

import { useState } from "react";
 


const CategoryCard = ({item}) => {
 
    const [isOptimized, setIsOptimized] = useState(true);

  return (
   
      <div className="bg-white  rounded-lg">
        <div className="grid items-center justify-center">
          <div className="my-2 relative w-[130px] h-[160px] xs:w-[60px] xs:h-[80px] xms:w-[70px] xms:h-[70px] xls:w-[80px] xls:h-[80px] sm:w-[80px] sm:h-[100px] md:w-[90px] md:h-[110px]">
            <Image
              className="h-full w-full"
              src={
                isOptimized
                  ? `${hostname.ImageHostName}/storage/${item?.image_path}${item?.image}`
                  : "/assets/placeholder_600x.webp"
              }
              width={100}
              height={100}
              alt="category"
              priority
              unoptimized={!isOptimized}
              onError={() => setIsOptimized(false)} // Handle image error
            />
          </div>
        </div>
        <div className="text-[16px] text-center py-1 xls:text-[10px] xms:text-[10px] xs:text-[10px]">
          {item?.name}
        </div>
      </div>
   
  );
};

export default CategoryCard;
