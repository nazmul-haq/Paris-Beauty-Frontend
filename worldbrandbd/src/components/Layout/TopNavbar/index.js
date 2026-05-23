import React from "react";
import { IoCallOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { useStatus } from "@/context/contextStatus";
import { destroyCookie } from "nookies";
import { toast } from "react-toastify";

const TopNavbar = ({isScrolled}) => {
  const router = useRouter();
  const {
    token,
    setToken,
    setUserId,
    setImage,
    setuserNo,
    contactInfo,
    setTabIndex,
  } = useStatus();

  const handleLogOut = () => {
    toast.success("Successfully logged out!");
    setToken(null);
    setUserId(null);
    setImage("")
    setuserNo("")
    destroyCookie({}, "token", {
      path: "/",
    });

    destroyCookie({}, "userId", {
      path: "/",
    });
    destroyCookie({}, "userNo", {
      path: "/",
    });
    destroyCookie({}, "image", {
      path: "/",
    });
    destroyCookie({}, "user", {
      path: "/",
    });

   
  };

 
  const handleRoute = (route) =>{

      if(route == 'login'){
          setTabIndex(1);
          router.push("/auth");
      } else {
          setTabIndex(0);
          router.push("/auth");
      }

  }


  return (
    <div className={`bg-white font-sans text-dark  font-medium  h-[35px] tracking-[0.4px] border-b xs:h-[25px] ${isScrolled ? 'hidden' :'block'}`}>
      <div className="max-w-[85rem] mx-auto h-full grid">
        <div className="flex  justify-between px-2 ">
          <div className="text-[12px] text-dark  grid items-center cursor-pointer xs:text-[9px]">
            {contactInfo?.welcome_text}
          </div>
          <div className="flex items-center gap-2 xs:hidden xms:hidden xls:hidden">
            <div className="flex items-center gap-1">
              <IoCallOutline className="text-[13px]" />
              <div className="text-[13px] cursor-pointer  ">
                Help line {contactInfo?.phone}
              </div>
            </div>
            <div
              onClick={() => {token ? router.push("/dashboard") :  handleRoute('login')}}
              className="text-[13px]  border-l h-full cursor-pointer grid items-center px-1"
            >
              {/* {token ? 'My Panel' : "Login"} */}
              {token ? <p>My Panel</p> : <p>Login</p>}
            </div>
            <div
              onClick={() => {token ? handleLogOut() : handleRoute("register")}}
              className="text-[13px]  border-l h-full grid items-center cursor-pointer px-1"
            >
              {token ? <p>Logout</p> : <p>Register</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
