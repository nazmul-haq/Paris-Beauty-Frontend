import React, { useEffect, useState } from "react";
import { BiHomeAlt, BiArchive, BiDollar } from "react-icons/bi";
import { TbTruckDelivery, TbLogout } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";
import SideMenu from "@/components/Dashboard/sideMenu";
import DashboardPanel from "@/components/Dashboard/dashboardPanle";
import Orders from "@/components/Dashboard/orders";
import Wishlist from "@/components/Dashboard/wishlist";
import Profile from "@/components/Dashboard/profile";
import { useStatus } from "@/context/contextStatus";
import Head from "next/head";
import request from "@/lib/request";

const Dashboard = () => {
  const {accountMenu,setaccountMenu, cartItems,token } =useStatus()

    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(true);

    const [total, setTotal] = useState(null);

      const [page, setPage] = useState(1);

 useEffect(() => {
   if (token) {
     const getData = async () => {
       const res = await request(`ecom-order-list?page=1`);
       if (res?.success) {
         setTotal(res?.data?.total);
         setData(res?.data?.data);
         setLoading(false);
       }
     };
     getData();
   }
 }, [token, page]);

  

  return (
    <>
      <Head>
        <script>
          {`
                                       (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NNCSPDMM');
            `}
        </script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NNCSPDMM"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
      </Head>
      <div className="min-h-[40rem] pt-[160px] xs:pt-[90px] xms:pt-[90px] xls:pt-[90px] sm:pt-[100px]">
        <div className="max-w-[95rem] lg:max-w-[70rem] md:max-w-[60rem] sm:max-w-[45rem] xls:max-w-[25rem] xms:max-w-[22rem] xs:max-w-[19rem] mx-auto tracking-[0.4px]">
          <div className="px-2">
            <div className="grid grid-cols-10  gap-5 py-10">
              <SideMenu />
              <div className="col-span-8 py-2 xs:col-span-full xms:col-span-full xls:col-span-full sm:col-span-full">
                {accountMenu == "dashboard" ? (
                  <DashboardPanel cartItems={cartItems} data={data} />
                ) : accountMenu == "orders" ? (
                  <Orders
                    data={data}
                    total={total}
                    loading={loading}
                    page={page}
                    setPage={setPage}
                  />
                ) : accountMenu == "wishlist" ? (
                  <Wishlist />
                ) : accountMenu == "profile" ? (
                  <Profile />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
