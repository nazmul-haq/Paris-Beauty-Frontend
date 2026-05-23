import React, { useState, useEffect } from "react";

import request from "@/lib/request";
import { useInView } from "react-intersection-observer";

import BlogCard from "@/components/BlogCard";

const BLog = () => {


  const [data, setData] = useState([]);

  const { ref, inView } = useInView();

  const [page, setPage] = useState(1);

  const [total, setTotal] = useState("");



  useEffect(() => {
    const getData = async () => {
      let res = await request(`get-blog`);

      setData(res?.data?.data);
      setTotal(res?.data?.total);
    };
    getData();
  }, [1]);


  const loadMoreUsers = async () => {
    const res = await request(`get-blog?page=${page}`);
    setData([...data, ...res?.data?.data?.data]);

    setPage(page + 1);
  };

  useEffect(() => {
    if (inView) {
      loadMoreUsers();
    }
  }, [inView]);
  return (
    <div className="bg-white min-h-[600px] pt-[160px] xs:pt-[90px] xms:pt-[90px] xls:pt-[90px] sm:pt-[100px]">
      <div className="max-w-7xl sm:max-w-[40rem] xls:mx-w-[24rem] xms:max-w-[22rem] xs:max-w-[16rem] mx-auto h-full font-sans bg-white shadow-md px-5 py-10">
        <>
          {data?.length > 0 ? (
            <>
              <div className="grid grid-cols-3 sm:grid-cols-2 xls:grid-cols-1 xms:grid-cols-1 xs:grid-cols-1 gap-6">
                {data?.map((item, index) => (
                  <div key={index}>
                      <BlogCard item={item} />
                  </div>
                ))}
              </div>
              {total == data?.length ? null : (
                <div ref={ref} className="flex justify-center mt-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-md flex items-center space-x-2 text-sm disabled">
                    <svg
                      className="fill-current text-black animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C12.5523 2 13 2.44772 13 3V6C13 6.55228 12.5523 7 12 7C11.4477 7 11 6.55228 11 6V3C11 2.44772 11.4477 2 12 2ZM12 17C12.5523 17 13 17.4477 13 18V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V18C11 17.4477 11.4477 17 12 17ZM22 12C22 12.5523 21.5523 13 21 13H18C17.4477 13 17 12.5523 17 12C17 11.4477 17.4477 11 18 11H21C21.5523 11 22 11.4477 22 12ZM7 12C7 12.5523 6.55228 13 6 13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H6C6.55228 11 7 11.4477 7 12ZM19.0711 19.0711C18.6805 19.4616 18.0474 19.4616 17.6569 19.0711L15.5355 16.9497C15.145 16.5592 15.145 15.9261 15.5355 15.5355C15.9261 15.145 16.5592 15.145 16.9497 15.5355L19.0711 17.6569C19.4616 18.0474 19.4616 18.6805 19.0711 19.0711ZM8.46447 8.46447C8.07394 8.85499 7.44078 8.85499 7.05025 8.46447L4.92893 6.34315C4.53841 5.95262 4.53841 5.31946 4.92893 4.92893C5.31946 4.53841 5.95262 4.53841 6.34315 4.92893L8.46447 7.05025C8.85499 7.44078 8.85499 8.07394 8.46447 8.46447ZM4.92893 19.0711C4.53841 18.6805 4.53841 18.0474 4.92893 17.6569L7.05025 15.5355C7.44078 15.145 8.07394 15.145 8.46447 15.5355C8.85499 15.9261 8.85499 16.5592 8.46447 16.9497L6.34315 19.0711C5.95262 19.4616 5.31946 19.4616 4.92893 19.0711ZM15.5355 8.46447C15.145 8.07394 15.145 7.44078 15.5355 7.05025L17.6569 4.92893C18.0474 4.53841 18.6805 4.53841 19.0711 4.92893C19.4616 5.31946 19.4616 5.95262 19.0711 6.34315L16.9497 8.46447C16.5592 8.85499 15.9261 8.85499 15.5355 8.46447Z"></path>
                    </svg>
                    <p className="text-black">Loading...</p>
                  </button>
                </div>
              )}{" "}
            </>
          ) : (
            <div className="text-2xl text-center capitalize pt-10 text-black font-semibold">
              No Data Found
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default BLog;

// export async function getServerSideProps(context) {

//   try {
//     let blog = await request(`get-blog`);

//     return {
//       props: {
//         blog: blog?.data?.data || null,
//         total: blog?.data?.total || null,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching blog  data:", error);
//     return {
//       notFound: true,
//     };
//   }
  
// }
