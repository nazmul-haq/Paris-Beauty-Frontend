import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

const BlogCard = ({item}) => {
 
     const [isOptimizedImage, setIsOptimizedImage] = useState(true);

  return (
    <Link
      href={`/blog/${item?.slug}`}
      className="shadow-md rounded-md relative"
    >
      <div className="cursor-pointer relative overflow-hidden rounded-t-md">
        <Image
          src={
            isOptimizedImage
              ? `${item?.image_path}`
              : "/assets/placeholder_600x.webp"
          }
          width={500}
          height={500}
          className="transition-transform duration-300 hover:scale-110 h-full w-full object-contain"
          priority
          unoptimized={!isOptimizedImage}
          onError={() => setIsOptimizedImage(false)}
        />
        <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 hover:opacity-50"></div>
      </div>

      <div className="absolute top-2 left-3 bg-white text-black px-4 shadow-md rounded-md">
        <p className="text-2xl font-semibold">
          {dayjs(item?.createdAt).format("D")}
        </p>
        <p className="uppercase font-semibold pt-1 text-sm">
          {dayjs(item?.createdAt).format("MMM")}
        </p>
      </div>

      <div className="pt-8 relative">
        <div className="font-bold text-2xl text-black text-center px-10 cursor-pointer">
          {item?.title}
        </div>
        <div className="bg-orange-500  text-white uppercase px-5 py-1 rounded-md font-semibold absolute -top-4 left-1/2 transform -translate-x-1/2">
          <p className="w-full max-w-[20rem] overflow-hidden text-xs whitespace-nowrap">
            {item?.categories?.map((val) => val.name).join(", ")}
          </p>
        </div>

        <div className="font-light text-sm text-black text-center px-10">
          {item?.content?.length > 300 ? (
            <span
              className="text-black "
              dangerouslySetInnerHTML={{
                __html: item?.content.substring(0, 300) + "....",
              }}
            ></span>
          ) : (
            <span
              className="text-black "
              dangerouslySetInnerHTML={{
                __html: item?.content,
              }}
            ></span>
          )}
        </div>
      </div>

      <div className="pb-6 pt-2 uppercase text-orange-500 text-sm text-center font-semibold">
        continue reading
      </div>
    </Link>
  );
}

export default BlogCard