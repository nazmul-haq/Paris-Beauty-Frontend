import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import SingleProduct from "@/components/productSection/SingleProduct";
import request from "@/lib/request";
import Custom404 from "@/components/productSection/Custom404";

const ProductList = ({  Data, TotalData }) => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [pageNo, setpageNo] = useState(1)
  const pageNoRef = useRef(1);

    useEffect(() => {
      if (Data) {
        setData(Data);
      }
    }, [Data]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasMore) {
          loadMoreData();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(document.getElementById("loadMoreTrigger"));

    return () => observer.disconnect();
  }, [hasMore]);

 


  const loadMoreData = async () => {
    setLoading(true);
    const nextPage = pageNoRef.current + 1;

    
    // Assuming page size is 10
    const res = await request(
      `featured-products/${router.query.slug}?page=${nextPage}`
    );
    if (res?.data?.data.length > 0) {
    
      setData(prevData => prevData.concat(res.data.data));
      pageNoRef.current = nextPage;
    } else {
      setHasMore(false);
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ delay: 0.4 }}
      className="min-h-[600px] bg-white pt-[170px] sm:pt-[130px] xls:pt-[120px] xms:pt-[120px] xs:pt-[120px] text-black"
    >
      <div className="max-w-[85rem] mx-auto">
        <div className="flex items-center justify-between py-2 px-2">
          <p className="text-[18px] font-semibold uppercase">
            {router?.query?.slug}
          </p>
          <p className="font-sans text-sm ">{TotalData} items</p>
        </div>

        <div className="pb-4 mt-[10px] px-2">
          <div className="grid grid-cols-5 gap-3 xs:grid-cols-2 xs:gap-1 xms:grid-cols-2 xms:gap-1 xls:grid-cols-3 xls:gap-1 sm:grid-cols-3 sm:gap-2 md:grid-cols-4 md:gap-2">
            {data.map((item, index) => (
              <SingleProduct key={index} item={item} />
            ))}
          </div>
          {loading && <div className="text-center py-4">Loading...</div>}
          <div id="loadMoreTrigger" />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductList;


export async function getServerSideProps(context) {

  
  let page=1;

  let res = await request(
    `featured-products/${context.query.slug}?page=${page}`,
  );

  return {
    props: {
      Data: res?.data?.data || null,
      PageSize: res?.data?.per_page || null,
      TotalData: res?.data?.total || null,
      category_name: res?.sections?.name || null
    },
  };
}