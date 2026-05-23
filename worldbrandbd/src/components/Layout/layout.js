import { useStatus } from "@/context/contextStatus";
import request from "@/lib/request";
import Head from "next/head";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import CountUp from "react-countup";
import Cart from "../Cart";
import QuickViewModal from "../productSection/QuickViewModal";
import StockRequestModal from "../productSection/StockRequestModal";
import BottomNavbar from "./BottomNavbar/BottomNavbar";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ResLeftMenu from "./RsLeftMenu/RsLeftMenu";

const Layout = ({ children }) => {
  const {
    cartItems,
    setCartItems,
    renderMe,
    setIsCartOpen,
    quickViewModal,
    setQuickViewModal,
    id,
    setId,
    prodId,
    setProdId,
    requestStockModal,
    setRequestStockModal,
    setContactInfo,
  } = useStatus();

  const [total, settotal] = useState(0);
  const [catData, setCatData] = useState([]);
    const [brands, setBrands] = useState([]);
    const [allCampaign, setAllCampaign] = useState([]);
      const [data, setData] = useState({});

  useEffect(() => {
    let getData = async () => {
    
      const [catRes, brandRes,contactRes] = await Promise.all([
        request(`navbar-categories`),
        request(`get-brands`),
        request(`contact-info`),
      ]);

      setCatData(catRes?.categories);
      setAllCampaign(brandRes?.campaigns);

      setBrands(brandRes?.brands);
       setData(contactRes?.data);
       setContactInfo(contactRes?.data);
    };
    getData();
  }, [1]);

  useEffect(() => {
    const totalPrice = cartItems?.reduce(
      (a, b) =>
        a +
        (b?.sellingPrice
          ? b?.sellingPrice * b?.quantity
          : b?.sellingPrice * b?.quantity),
      0
    );
    settotal(totalPrice);
  }, [cartItems, renderMe]);

  

  return (
    <>
      <Head>
        <meta
          name="facebook-domain-verification"
          content="doj4sdqjxkn3a0a2qurnvb7k312zoh"
        />

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
      <div className="font-body">
        <div className="flex">
          <div className="flex-1 overflow-auto">
            <Navbar
              catData={catData}
              allCampaign={allCampaign}
              brands={brands}
            />
            <ResLeftMenu catData={catData} />
            <Fragment>
              <div className="pt-10">

              {children}
              </div>
            </Fragment>
            <BottomNavbar />
            <Footer data={data} />
            <Cart cartItems={cartItems} setCartItems={setCartItems} />
            <QuickViewModal
              quickViewModal={quickViewModal}
              setQuickViewModal={setQuickViewModal}
              prodId={prodId}
              setProdId={setProdId}
            />

            <StockRequestModal
              prodId={prodId}
              id={id}
              setId={setId}
              setProdId={setProdId}
              requestStockModal={requestStockModal}
              setRequestStockModal={setRequestStockModal}
            />
            <div className="fixed bottom-2/4 right-0 z-10 w-[60px] text-center cursor-pointer rounded-bl-xl rounded-tl-xl  border-[2px] border-tahiti-500 shadow-lg xls:hidden xms:hidden xs:hidden sm:hidden">
              <div
                className="bg-white  rounded-l-xl"
                onClick={() => setIsCartOpen(true)}
              >
                <div className="rounded-tl-xl relative w-full h-[40px]">
                  <Image
                    className="rounded-tl-xl object-cover h-full w-full"
                    width={100}
                    height={100}
                    src="/assets/category/CompleteShallowFlyingsquirrel-size_restricted.gif"
                  />
                </div>
                <div className="">
                  <p className="text-[13px] mt-[6px] font-semibold text-black">
                    ৳
                    <CountUp
                      start={0}
                      end={total}
                      duration={5}
                      delay={1}
                      suffix=""
                      className="pl-1"
                    />
                  </p>
                </div>
                <div className="bg-tahiti-500 rounded-bl-lg">
                  <p className="text-[12px] text-white bg-primary font-semibold py-1">
                    {" "}
                    {cartItems?.length} items
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
