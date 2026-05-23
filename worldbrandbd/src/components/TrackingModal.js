
import request from "@/lib/request";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

const TrackingModal = ({ trackingModal, setTrackingModal }) => {
  const [orderID, setOrderID] = useState(null);
  const [deliveryStatus, setDeliveryStatus] = useState(null);

  const handleChange = (value) => {
    setOrderID(value);
  };

  const arrStatus = [
    {
      id: 1,
      name: "New order",
      icon: (
        <svg
          className="fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M10.478 11.632L5.968 4.56l1.931-.518 6.951 6.42 5.262-1.41a1.5 1.5 0 0 1 .776 2.898L5.916 15.96l-.776-2.898.241-.065 2.467 2.445-2.626.704a1 1 0 0 1-1.133-.48L1.466 10.94l1.449-.388 2.466 2.445 5.097-1.366zM4 19h16v2H4v-2z" />
        </svg>
      ),
    },
    {
      id: 2,
      name: "Pending",
      icon: (
        <svg
          className="fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228l-.997-1.795zm13.074 15.134A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772l.997 1.795z" />
        </svg>
      ),
    },
    {
      id: 3,
      name: "Pending payment",
      icon: (
        <svg
          className="fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M6.455 19L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455zM4 18.385L5.763 17H20V5H4v13.385zM13.414 11l2.475 2.475-1.414 1.414L12 12.414 9.525 14.89l-1.414-1.414L10.586 11 8.11 8.525l1.414-1.414L12 9.586l2.475-2.475 1.414 1.414L13.414 11z" />
        </svg>
      ),
    },
    {
      id: 4,
      name: "Confirm",
      icon: (
        <svg
          className="fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M6.455 19L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455zM4 18.385L5.763 17H20V5H4v13.385zM13 11v4h-2v-4H8l4-4 4 4h-3z" />
        </svg>
      ),
    },
    {
      id: 5,
      name: "Hold",
      icon: (
        <svg
          className="fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M7.617 8.712l3.205-2.328A1.995 1.995 0 0 1 12.065 6a2.616 2.616 0 0 1 2.427 1.82c.186.583.356.977.51 1.182A4.992 4.992 0 0 0 19 11v2a6.986 6.986 0 0 1-5.402-2.547l-.697 3.955 2.061 1.73 2.223 6.108-1.88.684-2.04-5.604-3.39-2.845a2 2 0 0 1-.713-1.904l.509-2.885-.677.492-2.127 2.928-1.618-1.176L7.6 8.7l.017.012zM13.5 5.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-2.972 13.181l-3.214 3.83-1.532-1.285 2.976-3.546.746-2.18 1.791 1.5-.767 1.681z" />
        </svg>
      ),
    },
    {
      id: 6,
      name: "Processing",
      icon: (
        <svg
          className="fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M7 5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4zm13 8H4v6h16v-6zm0-6H4v4h3V9h2v2h6V9h2v2h3V7zM9 3v2h6V3H9z" />
        </svg>
      ),
    },
    {
      id: 7,
      name: "Send to couriar",
      icon: (
        <svg
          className="fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M7 5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4zm13 8H4v6h16v-6zm0-6H4v4h3V9h2v2h6V9h2v2h3V7zM9 3v2h6V3H9z" />
        </svg>
      ),
    },
    {
      id: 8,
      name: "Assign to rider",
      icon: (
        <svg
          className="fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M7 5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4zm13 8H4v6h16v-6zm0-6H4v4h3V9h2v2h6V9h2v2h3V7zM9 3v2h6V3H9z" />
        </svg>
      ),
    },
    {
      id: 9,
      name: "Delivered",
      icon: (
        <svg
          className="fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M7 5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4zm13 8H4v6h16v-6zm0-6H4v4h3V9h2v2h6V9h2v2h3V7zM9 3v2h6V3H9z" />
        </svg>
      ),
    },
    {
      id: 10,
      name: "Return",
      icon: (
        <svg
          className="fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M7 5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4zm13 8H4v6h16v-6zm0-6H4v4h3V9h2v2h6V9h2v2h3V7zM9 3v2h6V3H9z" />
        </svg>
      ),
    },
    {
      id: 11,
      name: "Exchange",
      icon: (
        <svg
          className="fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M7 5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4zm13 8H4v6h16v-6zm0-6H4v4h3V9h2v2h6V9h2v2h3V7zM9 3v2h6V3H9z" />
        </svg>
      ),
    },
    {
      id: 12,
      name: "Cancel",
      icon: (
        <svg
          className="fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M7 5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4zm13 8H4v6h16v-6zm0-6H4v4h3V9h2v2h6V9h2v2h3V7zM9 3v2h6V3H9z" />
        </svg>
      ),
    },
  ];

  const handleClick = async () => {
    if (orderID) {
      const getData = async () => {
        let res = await request(`tracking?invoice_no=${orderID}`);
        setDeliveryStatus(res?.data?.delivery_status);
      };
      getData();
    }
  };

  const handleClose = () =>{
        setTrackingModal(false);
        setDeliveryStatus(null);
  }

  return (
    <Transition appear show={trackingModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 overflow-y-auto bg-opacity-60 bg-black font-body"
        onClose={() => handleClose()}
      >
        <div className=" min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500 translate-y-96"
            enterFrom="opacity-0 duration-300 scale-95 translate-y-96"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-[500px] min-h-[300px] p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-100 rounded-lg shadow-xl">
              <div>
                <div className="text-center text-3xl font-extrabold text-gray-900 relative">
                  <div
                    className="absolute top-[-10px] right-[-10px] sm:right-[-10px] xls:right-[-10px] xms:right-[-15px] xs:right-[-10px]"
                    onClick={() => handleClose()}
                  >
                    <svg
                      className="fill-current text-red-500 cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="28"
                      height="28"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                    </svg>
                  </div>
                </div>
                <div className="py-4 bg-gray-100  max-w-[45rem] mx-auto">
                  <div className="flex xs:block justify-center items-center space-x-3 xs:space-x-0 ">
                    <div>
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-[200px] p-2.5 outline-none dark:border-gray-600"
                        placeholder="input order ID...."
                        onChange={(e) => handleChange(e.target.value)}
                      />
                    </div>
                    <div onClick={handleClick} className="xs:mt-2">
                      <button className="px-3 py-2 text-white bg-red-600 rounded-md">
                        submit
                      </button>
                    </div>
                  </div>

                  {deliveryStatus ? (
                    <div className="grid justify-center mt-8">
                      <div>
                        {arrStatus?.map((item, index, arr) => (
                          <>
                            {index <= deliveryStatus - 1 ? (
                              <div>
                                <div className="flex items-center space-x-3 text-black ">
                                  <div className="bg-green-500 rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-green-500 flex justify-center items-center">
                                    <svg
                                      className="fill-current text-white"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      width="24"
                                      height="24"
                                    >
                                      <path fill="none" d="M0 0h24v24H0z" />
                                      <path d="M11.602 13.76l1.412 1.412 8.466-8.466 1.414 1.414-9.88 9.88-6.364-6.364 1.414-1.414 2.125 2.125 1.413 1.412zm.002-2.828l4.952-4.953 1.41 1.41-4.952 4.953-1.41-1.41zm-2.827 5.655L7.364 18 1 11.636l1.414-1.414 1.413 1.413-.001.001 4.951 4.951z" />
                                    </svg>
                                  </div>
                                  <div className="text-center text-xs font-medium uppercase text-green-500">
                                    {item?.name}
                                  </div>
                                </div>
                                {index === arr?.length - 1 ? null : index <=
                                  deliveryStatus - 2 ? (
                                  <div className="h-6 w-1 bg-green-500"> </div>
                                ) : (
                                  <div className="h-6 w-1 bg-gray-300"></div>
                                )}
                              </div>
                            ) : (
                              <div>
                                <div className="flex items-center space-x-3 text-black ">
                                  <div className="bg-white rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-black flex justify-center items-center">
                                    <svg
                                      className="fill-current text-black"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      width="24"
                                      height="24"
                                    >
                                      <path fill="none" d="M0 0h24v24H0z" />
                                      <path d="M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228l-.997-1.795zm13.074 15.134A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772l.997 1.795z" />
                                    </svg>
                                  </div>
                                  <div className=" text-xs font-medium uppercase text-black">
                                    {item?.name}
                                  </div>
                                </div>
                                {index === arr?.length - 1 ? null : (
                                  <div className="h-6 w-1 bg-gray-300"></div>
                                )}
                              </div>
                            )}
                          </>
                        ))}
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

export default TrackingModal;
