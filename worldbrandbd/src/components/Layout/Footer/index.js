import request from "@/lib/request";
import Link from "next/link";
import { useEffect, useState } from "react";

import TrackingModal from "@/components/TrackingModal";
import { useStatus } from "@/context/contextStatus";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiTwotoneMail } from "react-icons/ai";
import { CgNotes, CgSupport } from "react-icons/cg";
import { FiPhone } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { IoIosReturnLeft } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { toast } from "react-toastify";
import MessengerCustomerChat from "react-messenger-customer-chat";
import postRequest from "@/lib/postRequest";
import hostname from "@/lib/config";


const Footer = ({ data }) => {
  const { token, setaccountMenu,contactInfo } = useStatus();

  const [trackingModal, setTrackingModal] = useState(false);

  const [email,setEmail] = useState('');

  const router = useRouter();

  const handleOpen = () => {
    setTrackingModal(true);
  };

  const handleRoute = () => {
    if (!token) {
      toast.warning("Login First");
      return;
    }
    router.push("/dashboard");
    setaccountMenu("wishlist");
  };
  const handleRouteOrder = () => {
    if (!token) {
      toast.warning("Login First");
      return;
    }
    router.push("/dashboard");
    setaccountMenu("purchase");
  };

  const handleSubscribe = async()=>{ 

     const res = await postRequest(`subscribe`,{
          email: email,
          source: "worldbrand",
     });

    if(res?.status){
       toast.success(`${res?.message}`)
       setEmail("");
    } else{
         toast.error(`${res?.error}`);
    } 
     

  }

  return (
    <div className="" id="footer">
      <div className="bg-tahiti-500">
        <div className="max-w-[85rem] mx-auto grid">
          <div className="px-2 py-2">
            <div className="flex items-center justify-between h-full gap-2 xs:flex-col xs:gap-1 xms:flex-col xms:gap-1 xls:flex-col xls:gap-1">
              <div className="text-[14px] text-gray-300 xs:text-[12px] sm:text-[10px]">
                Sign up to Member
                <span className="text-[12px] xs:text-[10px] sm:text-[10px]">
                  {" "}
                  ... for more reward & shopping points
                </span>
              </div>
              <div className="flex items-center">
                <input
                  className="outline-none h-[35px] border-[1px] border-gray-400 text-[12px] px-2 rounded-tl-sm rounded-bl-sm xs:h-[30px] xms:h-[30px] xls:h-[30px]"
                  placeholder="Enter your email"
                  type="email"
                  onChange={(e)=>setEmail(e.target.value)}
                  value={email}
                />
                <button className="bg-black text-white text-[12px] h-[35px] px-3 flex items-center justify-center rounded-tr-sm rounded-br-sm xs:h-[30px] xms:h-[30px] xls:h-[30px]" onClick={()=>handleSubscribe()}>
                  Subscribe
                </button>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-gray-100 text-[12px]">
                  Influencer Collab
                </div>
                <div className="bg-[#FFFFFF] text-black text-[12px] py-1 px-3 flex items-center justify-center rounded-sm sm:text-[10px] sm:w-[70px]">
                  Join Us
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#FFFFFF]">
        <div className="max-w-[85rem] mx-auto">
          <div className="px-2 py-4">
            <div className="grid grid-cols-7  gap-8 justify-between">
              <div className="col-span-2 xs:col-span-full xms:col-span-full xls:col-span-full sm:col-span-4">
                <div className="text-center py-3 text-[20px] font-semibold flex items-center justify-center ">
                  <div
                    onClick={() => router.push("/")}
                    className="w-full h-auto relative cursor-pointer"
                  >
                      <Image
                                      src={`${hostname.ImageHostName}/storage/${contactInfo?.logo}`}
                                      height={500}
                                      width={500}
                                      className="h-full w-full object-fill"
                                      priority
                                      alt="logo"
                                    />
                  </div>
                </div>
                <div className="text-center text-[12px] font-semibold ">
                  Let&apos;s Do Beauty & Grooming Together
                </div>
                <div className="text-center text-[16px] font-semibold border-b border-black py-1">
                  Find Us On
                </div>
                <div className="flex items-center justify-center gap-2 py-2">
                  <Link href={`${data?.facebook}`} target="_blank">
                    <Image
                      src={"/assets/slider/facebook.webp"}
                      width={25}
                      height={25}
                      alt="facebook"
                    />
                  </Link>
                  <Link href={`${data?.instagram_link}`} target="_blank">
                    <Image
                      src={"/assets/slider/instagram.webp"}
                      width={25}
                      height={25}
                      alt="facebook"
                    />
                  </Link>
                  <Link href={`${data?.whatsapp_link}`} target="_blank">
                    <Image
                      src={"/assets/slider/whatsapp.webp"}
                      width={25}
                      height={25}
                      alt="facebook"
                    />
                  </Link>
                  <Link href={`${data?.youtube_link}`} target="_blank">
                    <Image
                      src={"/assets/slider/youtube.webp"}
                      width={25}
                      height={25}
                      alt="facebook"
                    />
                  </Link>
                  <Link href={`${data?.tiktok_link}`} target="_blank">
                    <Image
                      src={"/assets/slider/tik-tok.webp"}
                      width={25}
                      height={25}
                      alt="facebook"
                    />
                  </Link>
                  <Link href={`${data?.twitter_link}`} target="_blank">
                    <Image
                      src={"/assets/slider/twitter.webp"}
                      width={25}
                      height={25}
                      alt="facebook"
                    />
                  </Link>
                  <Link href={`${data?.pinterest_link}`} target="_blank">
                    <Image
                      src={"/assets/slider/pinterest.webp"}
                      width={25}
                      height={25}
                      alt="facebook"
                    />
                  </Link>
                </div>
                <div className="flex items-center justify-center gap-2 py-2">
                  <Link
                    href="https://play.google.com/store/apps/details?id=com.worldbrandbdapp"
                    target="_blank"
                  >
                    <Image
                      src={"/assets/slider/play.webp"}
                      width={120}
                      height={60}
                      alt="facebook"
                    />
                  </Link>
                  <div>
                    <Image
                      src={"/assets/slider/app.webp"}
                      width={120}
                      height={60}
                      alt="facebook"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-2 xs:col-span-4 xms:col-span-4 xls:col-span-4 sm:col-span-3">
                <div className="border-b border-black text-[13px] font-semibold pb-1">
                  CONTACT INFO
                </div>
                <div className="py-1 flex gap-3 pb-4">
                  <div>
                    <IoLocationOutline className="text-[20px]" />
                  </div>
                  <div className="text-[12px] font-semibold">
                    {data?.address}
                  </div>
                </div>
                <div className="py-1 flex gap-3">
                  <div>
                    <FiPhone className="text-[16px]" />
                  </div>
                  <div className="text-[12px] font-semibold">{data?.phone}</div>
                </div>
                <div className="py-1 flex gap-3">
                  <div>
                    <AiTwotoneMail className="text-[18px]" />
                  </div>
                  <div className="text-[12px] font-semibold">{data?.email}</div>
                </div>
              </div>
              <div className="col-span-1 xs:col-span-3 xms:col-span-3 xls:col-span-3 sm:col-span-2">
                <div className="border-b border-black text-[13px] font-semibold pb-1">
                  MY ACCOUNT
                </div>
                <div
                  onClick={() => router.push("/auth")}
                  className="py-1 flex gap-3 cursor-pointer"
                >
                  <div className="text-[12px] font-semibold">Login</div>
                </div>
                <div
                  onClick={() => handleRouteOrder()}
                  className="py-1 flex gap-3 cursor-pointer"
                >
                  <div className="text-[12px] font-semibold">Order History</div>
                </div>
                <div
                  onClick={() => handleRoute()}
                  className="py-1 flex gap-3 cursor-pointer"
                >
                  <div className="text-[12px] font-semibold">My Wishlist</div>
                </div>
                <div
                  onClick={() => handleOpen()}
                  className="py-1 flex gap-3 cursor-pointer"
                >
                  <div className="text-[12px] font-semibold">Track Order</div>
                </div>
                <div className="py-1 flex gap-3">
                  <Link href={"/faq"} className="text-[12px] font-semibold">
                    Faq
                  </Link>
                </div>
              </div>

              <div className="col-span-1 xs:col-span-4 xms:col-span-4 xls:col-span-4 sm:col-span-2">
                <div className="border-b border-black text-[13px] font-semibold pb-1">
                  ABOUT
                </div>
                <div className="py-1 flex gap-1 items-center ">
                  <div>
                    <GoHome className="text-[14px]" />
                  </div>
                  <Link
                    href={"/about-us"}
                    className="text-[12px] font-semibold"
                  >
                    About Us
                  </Link>
                </div>
                <div className="py-1 flex items-center gap-1">
                  <div>
                    <CgNotes className="text-[14px]" />
                  </div>
                  <Link
                    href={"/terms-and-conditions"}
                    className="text-[12px] font-semibold"
                  >
                    Terms & Conditions
                  </Link>
                </div>
                <div className="py-1 flex items-center gap-1">
                  <div>
                    <IoIosReturnLeft className="text-[14px]" />
                  </div>
                  <Link href={"/return"} className="text-[12px] font-semibold">
                    Return Policy
                  </Link>
                </div>
                <div className="py-1 flex items-center gap-1">
                  <div>
                    <CgSupport className="text-[14px]" />
                  </div>
                  <Link
                    href={"/support-policy"}
                    className="text-[12px] font-semibold"
                  >
                    Support Policy
                  </Link>
                </div>
                <div className="py-1 flex items-center gap-1">
                  <div>
                    <MdOutlinePrivacyTip className="text-[14px]" />
                  </div>
                  <Link
                    href={"/privacy-policy"}
                    className="text-[12px] font-semibold"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>
              <div className="xs:col-span-3 xms:col-span-3 xls:col-span-3 sm:col-span-3">
                <div className="border-b border-black text-[13px] font-semibold pb-1">
                  QUICK LINKS
                </div>
                <div className="flex items-center py-1">
                  <Link
                    href="/blog"
                    className="text-[12px] bg-tahiti-500 px-2 py-2 text-white rounded-md w-[100px] flex items-center justify-center"
                  >
                    Beauty Blogs
                  </Link>
                </div>
                <div className="flex items-center py-1">
                  <div className="text-[12px] bg-tahiti-500 px-2 py-2 text-white rounded-md w-[100px] flex items-center justify-center">
                    Skin Expert
                  </div>
                </div>
                <div className="flex items-center py-1">
                  <div className="text-[12px] bg-tahiti-500 px-2 py-2 text-white rounded-md w-[100px] flex items-center justify-center">
                    For Wholesale
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F6F6F6] xs:mb-[40px] xms:mb-[40px] xls:mb-[40px] sm:mb-[40px]">
        <div className="max-w-[85rem] mx-auto  grid">
          <div className="px-2 py-1">
            <div className="flex items-center justify-between h-full xs:flex-col xms:flex-col xls:flex-col gap-1">
              <div className="text-[14px] text-tahiti-500 xs:text-[12px] xms:text-[12px] xls:text-[12px] sm:text-[12px]">
                Copyright 2019 World Brand BD.
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <div className="text-[18px] text-tahiti-500 xs:text-[12px] xms:text-[12px] xls:text-[12px] sm:text-[12px]">
                    Payment Methods
                  </div>
                </div>
                <div>
                  <Image
                    className=""
                    src={"/assets/slider/bkash.webp"}
                    width={70}
                    height={50}
                    alt="bkash"
                  />
                </div>
                <div>
                  <Image
                    src={"/assets/slider/nagad.webp"}
                    width={70}
                    height={50}
                    alt="nagad"
                  />
                </div>
                <div>
                  <Image
                    src={"/assets/slider/rocket.webp"}
                    width={70}
                    height={50}
                    alt="rocket"
                  />
                </div>
                <div>
                  <Image
                    src={"/assets/slider/visa.webp"}
                    width={70}
                    height={50}
                    alt="visa"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MessengerCustomerChat pageId="103424579277922" appId="103424579277922" />

      <TrackingModal
        trackingModal={trackingModal}
        setTrackingModal={setTrackingModal}
      />
    </div>
  );
};

export default Footer;
