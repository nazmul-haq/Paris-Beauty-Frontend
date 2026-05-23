import React, { useEffect, useState } from "react";
import WishSingleProduct from '@/components/productSection/WishSingleProduct'
import { ThreeDots } from "react-loader-spinner";
import request from "@/lib/request";
import { useStatus } from "@/context/contextStatus";
import postRequest from "@/lib/postRequest";
import { toast } from "react-toastify";


const Wishlist = () => {

 const{token,setWishCount,wishCount}=useStatus()

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshWish, setrefreshWish] = useState(false);


  useEffect(() => {
   
      const getData = async () => {
        const res = await request(`wishlists`);
        setData(res?.wishlists);
        setLoading(false);
        
      };
      getData();
  
  }, []);


  useEffect(() => {
    let getData = async () => {
      let res = await request(`wishlists-count`);
      if (res?.status) {
        setWishCount(res?.wishlist_count);
      } else {
        setWishCount(0);
      }
    };

    getData();
  }, [refreshWish]);

  const addWish = async (id) => {
    if (!token) {
      toast.warning("Login First");
      return;
    }

    const obj = {
      product_id: id,
    };

    let res = await postRequest("add-to-wishlist", obj);
    if (res.status) {
      const res = await request(`wishlists`);
      setData(res?.wishlists);
      setrefreshWish(!refreshWish);
      toast.success(res?.message)
    }
  };

  return (
    <div>
      <div className="text-[13px]">WishList</div>
      <div className=" py-4 mt-3 ">
      
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "170px",
            }}
          >
            {" "}
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#1F2937"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              visible={true}
            />
          </div>
        ) : (
          <div className="">
            {data?.length > 0 ? (
              <>
                <div className="grid grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 sm:gap-2 md:gap-2 xls:hidden xms:hidden xs:hidden gap-6 xls:gap-5 xms:gap-5 xs:gap-5">
                  {data?.map((item, index) => (
                    <div key={index}>
                      <WishSingleProduct item={item?.product} addWish={addWish}/>
                    </div>
                  ))}
                </div>
                <div className=" grid-cols-2 hidden  xls:grid xls:grid-cols-3 xms:grid xs:grid gap-6 xls:gap-2  xms:gap-2 xs:gap-2">
                  {data?.map((item, index) => (
                    <div key={index}>
                      <WishSingleProduct item={item?.product} addWish={addWish}/>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="mt-20 flex items-center justify-center">
                <p className="text-3xl text-center font-semibold text-black tracking-wider">
                  No WishList  found
                </p>
              </div>
            )}
          </div>
        )}
        
      </div>
    </div>
  )
}

export default Wishlist