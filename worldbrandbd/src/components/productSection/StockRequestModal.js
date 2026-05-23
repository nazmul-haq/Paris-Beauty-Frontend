import { useStatus } from "@/context/contextStatus";
import hostname from "@/lib/config";
import postRequest from "@/lib/postRequest";
import request from "@/lib/request";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";

const StockRequestModal = ({
  prodId,
  setProdId,
  requestStockModal,
  setRequestStockModal,
  id,
  setId,
}) => {
  const [data, setData] = useState({});

  const [customerPhone, setCustomerPhone] = useState("");

  const { phone } = useStatus();

  const handleClose = () => {
    setRequestStockModal(false);
    setProdId(null);
    // setCustomerPhone("");
    setId(null);
  };

  useEffect(() => {
    if (phone) {
      setCustomerPhone(phone);
    }
  }, [phone]);

  useEffect(() => {
    if (prodId !== null) {
      const getData = async () => {
        let res = await request(`get-product-details/${prodId}`);
        if (res?.success) {
          setData(res?.data);
        }
      };
      getData();
    }
  }, [prodId]);

  const handleSubmit = async () => {
    if (customerPhone == "" || customerPhone == undefined) {
      toast.error("Phone number is required");
      return;
    }

    if (customerPhone) {
      var bdMobilePattern = /^(\+)?(88)?01[3-9]\d{8}$/;
      if (bdMobilePattern.test(customerPhone)) {
      } else {
        toast.error("Not a valid phone number");

        return;
      }
    }
    let obj = {
      product_id: id,
      phone: customerPhone,
    };

    const res = await postRequest(`request-stock`, obj);

    if (res?.success) {
      toast.success(`${res?.message}`);
      customerPhone("");
      handleClose();
    } else {
      toast.error(`${res?.message}`);
      handleClose();
    }
  };

  return (
    <Transition appear show={requestStockModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 overflow-y-auto bg-opacity-60 bg-black font-body"
        onClose={() => handleClose()}
      >
        <div className=" min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-lg min-h-[300px] p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
              <div className="mt-1">
                <div>
                  <div className="flex  items-center justify-between">
                    <p className="font-semibold">Product Restock Request</p>
                    <div onClick={() => handleClose()}>
                      <svg
                        className="fill-current text-black h-7 w-7 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"></path>
                      </svg>
                    </div>
                  </div>

                  {Object.keys(data).length > 0 ? (
                    <div className="bg-white">
                      <div className="flex items-center space-x-2 bg-gray-100 py-2 mt-1 pl-1">
                        <div>
                          <img
                            src={`${hostname.ImageHostName}/storage/product/${data?.image[0]}`}
                            className="h-[70px] w-[70px]"
                          />
                        </div>
                        <p className="font-bold">{data?.product_name}</p>
                      </div>
                      <div className="flex items-center space-x-2 my-2">
                        <p>we will send you a text when its available</p>

                        <div>
                          <input
                            className="w-full text-black placeholder:text-sm border border-gray-200 pl-2 outline-none"
                            placeholder="enter mobile number"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                          />
                          <div className="text-xs">
                            **Format: 11 Digit Mobile number
                          </div>
                        </div>
                      </div>

                      <div className="mt-12 flex space-x-2 items-center">
                        <div>
                          <button
                            className="uppercase text-sm bg-[#FF3D71] text-white rounded-md px-3 py-2"
                            onClick={() => handleSubmit()}
                          >
                            send request
                          </button>
                        </div>
                        <button
                          className="bg-[#E6E6E6] text-black text-sm capitalize rounded-md  px-3 py-2"
                          onClick={() => handleClose()}
                        >
                          close
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default StockRequestModal;
