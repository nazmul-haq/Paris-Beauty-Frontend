/* eslint-disable @next/next/no-html-link-for-pages */
import Image from "next/image";
import Link from "next/link";
import styles from "./BottomNavbar.module.css";
import { useStatus } from "@/context/contextStatus";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function BottomNavbar() {
  const {
    isCartOpen,
    setIsCartOpen,
    setSideCategory,
    setProfileMenu,
    cartItems,
    wishCount,
    token,
    setaccountMenu
  } = useStatus();
  const router = useRouter()

  const handleCart = () => {
    setIsCartOpen(true);
  };
  const handleRoute = () => {
    if (!token) {
      toast.warning("Login First");
      return;
    }
    router.push("/dashboard");
    setaccountMenu("wishlist");
  };

  return (
    <div className={styles.bottomNavbar}>
      <div className={styles.icons}>
      <Link href="/">
          <span>
            <AiOutlineHome size={25} color="#000" />
          </span>
        </Link>
        <div onClick={() => handleCart()} className="relative pl-[30px]">
          <BsCart4 size={25} className="text-black" />
          {cartItems?.length > 0 ? (
            <p className="absolute top-[-6px] right-[15px] px-[6px] xms:right-[6px] xs:right-[4px] text-xs text-white flex justify-center items-center bg-red-600 rounded-full h-4 w-4">
              {cartItems?.length}
            </p>
          ) : null}
        </div>

        <div onClick={() => handleRoute()} className="relative pl-[30px]">
          <FaRegHeart  size={25} className="text-black" />
          {wishCount > 0 ? (
            <p className="absolute top-[-6px] right-[15px] px-[6px] xms:right-[6px] xs:right-[4px] text-xs text-white flex justify-center items-center bg-red-600 rounded-full h-4 w-4">
              {wishCount}
            </p>
          ) : null}
        </div>

        

        <span
         onClick={() =>{token ? router.push('/dashboard') : router.push('/auth')}}
        >
          <AiOutlineUser size={25} color="#000" />
        </span>

        {/* </Link> */}

        {/* <span
          onClick={() => {
            setSideCategory(true);
          }}
        >
          <Image
            priority={true}
            height={25}
            width={25}
            src="/assets/images/icons/menu-line.png"
            alt="category"
          />
        </span> */}
      </div>
    </div>
  );
}
