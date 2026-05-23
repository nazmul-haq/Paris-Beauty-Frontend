
import { parseCookies } from "nookies";
import { createContext, useContext, useState } from "react";

const ContextStatus = createContext();

const ContextStatusProvider = ContextStatus.Provider;

function StatusProvider({ children }) {

   const cookie = parseCookies();
   let items = cookie?.hasOwnProperty("parisBd")
     ? [...JSON.parse(cookie?.parisBd)]
     : [];

  const [token, setToken] = useState(cookie?.token ? cookie?.token : "");
  const [userData, setUserData] = useState(cookie?.user ? cookie?.user : "");
  const [image, setImage] = useState(cookie?.image ? cookie?.image : "");
  const [userNo, setuserNo] = useState(cookie?.userNo ? cookie?.userNo : "");
  const [wishCount, setWishCount] = useState(0)
  const [accountMenu, setaccountMenu] = useState('dashboard')

  const [isCartOpen,setIsCartOpen] = useState(false);

  const [tabIndex,setTabIndex] = useState(1);

  const [selectImage, setSelectImage] = useState([]);
  const [cartItems, setCartItems] = useState(items);
  const [renderMe, setIsRenderMe] = useState(false);
  const [userId, setUserId] = useState(cookie?.userId ? cookie?.userId : null);
  const [inside, setInside] = useState(cookie?.INSIDE && cookie?.INSIDE);
  const [outside, setOutside] = useState(cookie?.OUTSIDE && cookie?.OUTSIDE);
  const [subside, setSubSide] = useState(cookie?.SUBSIDE && cookie?.SUBSIDE);
  const [deliveryType, setDeliveryType] = useState(cookie?.deliveryType);
  const [promoDiscount, setPromoDiscount] = useState(
    cookie?.promoDiscount && cookie?.promoDiscount
  );

  const [loading, setLoading] = useState(true);
  const [isAlive, setIsAlive] = useState(false);
  const [popupShow, setPopupShow] = useState(true);
  const [popUpImage, setPopUpImage] = useState(null);
  const [contactInfo, setContactInfo] = useState(null);

  const [bannerText, setBannerText] = useState(
    cookie?.BANNER && cookie?.BANNER
  );

  const [flag, setFlag] = useState(false);
  const [sideCategory, setSideCategory] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [resetToken, setResetToken] = useState(
    cookie?.resetToken ? cookie?.resetToken : ""
  );
const [phone, setPhone] = useState(
  cookie?.customerPhone ? cookie?.customerPhone : ""
);

  const [type, setType] = useState(cookie?.type ? cookie?.type : null);
  const [promoValue, setPromoValue] = useState(
    cookie?.promovalue ? cookie?.promovalue : null
  );
  const [couponId, setCouponId] = useState(
    cookie?.couponid ? cookie?.couponid : ""
  );

 
  const [orderObj, setOrderObj] = useState(cookie.orderObj);

  const [sellertype, setSellerType] = useState(
    cookie?.sellertype ? cookie?.sellertype : ""
  );

  const [sellerTotalDiscount, setSellerTotalDiscount] = useState(
    cookie?.seller_total_discount ? cookie?.seller_total_discount : ""
  );

  
  const [quickViewModal, setQuickViewModal] = useState(false);

  const [requestStockModal, setRequestStockModal] = useState(false);

  const [prodId, setProdId] = useState(null);
  
  const [id,setId] = useState(null);



  return (
    <ContextStatusProvider
      value={{
        isCartOpen,
        setIsCartOpen,
        token,
        setToken,
        userData,
        wishCount,
        setWishCount,
        setUserData,
        tabIndex,
        setTabIndex,
        selectImage,
        setSelectImage,
        cartItems,
        setCartItems,
        renderMe,
        setIsRenderMe,
        userId,
        setUserId,
        inside,
        setInside,
        outside,
        setOutside,
        subside,
        setSubSide,
        deliveryType,
        setDeliveryType,
        promoDiscount,
        setPromoDiscount,
        loading,
        setLoading,
        image,
        setImage,
        userNo,
        setuserNo,
        isAlive,
        setIsAlive,
        popupShow,
        setPopupShow,
        popUpImage,
        setPopUpImage,
        bannerText,
        setBannerText,
        flag,
        setFlag,
        sideCategory,
        setSideCategory,
        profileMenu,
        setProfileMenu,
        resetToken,
        setResetToken,
        phone,
        setPhone,
        type,
        setType,
        promoValue,
        setPromoValue,
        couponId,
        setCouponId,
        orderObj,
        setOrderObj,
        sellertype,
        setSellerType,
        sellerTotalDiscount,
        setSellerTotalDiscount,
        quickViewModal,
        setQuickViewModal,
        prodId,
        setProdId,
        accountMenu,
        setaccountMenu,
        contactInfo,
        setContactInfo,
        requestStockModal,
        setRequestStockModal,
        id,
        setId,
      }}
    >
      {children}
    </ContextStatusProvider>
  );
}

function useStatus() {
  const all = useContext(ContextStatus);
  return all;
}

export { StatusProvider, useStatus };

