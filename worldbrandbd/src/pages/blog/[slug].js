import request from "@/lib/request";
import dayjs from "dayjs";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";



const BlogDetails =  () => {
 
   const [isOptimized, setIsOptimized] = useState(true);

   const router = useRouter();
   
   const [blog, setBlog] = useState(null);




   useEffect(() => {
     if (router?.query?.slug) {
       const getData = async () => {
         let res = await request(`get-blog-details/${router?.query?.slug}`);

         setBlog(res?.blog);
        
       };
       getData();
     }
   }, [router?.query?.slug]);

 
  return (
    <>
      <Head>
        <title>{`${blog?.title}`}</title>

        <link rel="icon" content={`${blog?.image_path}`} />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="canonical"
          href={`https://worldbrandbd.com/blog/${blog?.slug}`}
        />
        <meta name="description" content={`${blog?.title}`} />

        <meta property="og:title" content={`${blog?.title}`} />
        <meta property="og:description" content={`${blog?.title}`} />
        <meta property="og:image" content={`${blog?.image_path}`} />
        <meta
          property="og:url"
          href={`https://worldbrandbd.com/blog/${blog?.slug}`}
        />
        <meta property="og:type" content="website" />
      </Head>
      <div className="bg-white min-h-[600px] pt-[160px] xs:pt-[90px] xms:pt-[90px] xls:pt-[90px] sm:pt-[100px]">
        <div className="max-w-7xl sm:max-w-[40rem] xls:mx-w-[24rem] xms:max-w-[22rem] xs:max-w-[16rem] mx-auto h-full font-sans bg-white shadow-md px-5 py-10">
          <div className="text-center">
            <span className="bg-orange-500 text-white uppercase text-sm px-5 py-1 rounded-md font-semibold ">
              {blog?.categories?.map((val) => val.name).join(", ")}
            </span>
          </div>
          <div className="font-bold text-3xl xls:text-xl xms:text-xl xs:text-lg text-center text-black py-3">
            {blog?.title}
          </div>

          <div className="cursor-pointer relative overflow-hidden rounded-t-md">
            <Image
              src={ isOptimized ? `${blog?.image_path}` : "/assets/placeholder_600x.webp"}
              width={800}
              height={800}
              className="transition-transform duration-300 hover:scale-110 h-full w-full object-contain"
              priority
              unoptimized={!isOptimized}
              onError={() => setIsOptimized(false)}
            />

            <div className="absolute top-2 left-3 bg-white text-black px-4 shadow-md rounded-md">
              <p className="text-2xl font-semibold">
                {" "}
                {dayjs(blog?.createdAt).format("D")}
              </p>
              <p className="uppercase font-semibold pt-1 text-sm">
                {" "}
                {dayjs(blog?.createdAt).format("MMM")}
              </p>
            </div>
          </div>
          <p className="text-black pt-5 pb-20 ">
            <span
              className="text-black overflow-x-auto"
              dangerouslySetInnerHTML={{
                __html: blog?.content,
              }}
            ></span>
          </p>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;

// export async function getServerSideProps(context) {
 
//   try {
//     let blog = await request(`get-blog-details/${context?.query?.slug}`);

   
    
//   if(blog?.status == 'success'){
//      return {
//        props: {
//          blog: blog?.blog || null,
//        },
//      };
     
//   } else {
//       return {
//         notFound: true,
//       };
//   }
   
//   } catch (error) {
//     console.error("Error fetching blog  data:", error);
//     return {
//       notFound: true,
//     };
//   }
  

  
// }
