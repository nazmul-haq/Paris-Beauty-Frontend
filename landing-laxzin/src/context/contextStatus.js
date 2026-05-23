
import { parseCookies } from "nookies";
import { createContext, useContext, useState } from "react";

const ContextStatus = createContext();

const ContextStatusProvider = ContextStatus.Provider;

function StatusProvider({ children }) {

   const cookie = parseCookies();

   let items = cookie?.hasOwnProperty("paris")
     ? [...JSON.parse(cookie?.paris)]
     : [];

     const [cartItems, setCartItems] = useState(items);

  const [token, setToken] = useState(cookie?.token ? cookie?.token : "");

  const [orderObj, setOrderObj] = useState(cookie.orderObj);



  return (
    <ContextStatusProvider
      value={{
        token,
        setToken,
        cartItems,
        setCartItems,
        orderObj,
        setOrderObj,
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

