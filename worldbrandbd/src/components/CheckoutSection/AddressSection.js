import { useStatus } from "@/context/contextStatus";
import { useState } from "react";

const AddressSection = ({
  name,
  setName,
  phone,
  setPhone,
  address,
  setAddress,
  deliveryData,
  handleArea,
  areaID,
  
}) => {
  return (
    <div className="bg-white mt-0 px-4 xs:px-2 pb-4 rounded-md space-y-4 pt-3 sm:mt-2 xls:mt-2 xms:mt-2 xs:mt-2">
      <div>
        <div className="text-center font-semibold text-xl text-black">
          Customer Information
        </div>
      </div>

      <div>
        <div className="text-sm font-normal text-black">
          Name <span style={{ color: "red" }}>*</span>{" "}
        </div>
        <input
          className="border-2 border-tahiti-500 h-[25px] w-full pl-2 py-4 rounded-md outline-none bg-white text-sm text-black placeholder:text-sm"
          value={name}
          placeholder="Your name ..."
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="w-full mt-1">
        <div className="text-sm font-normal text-black">
          Phone <span style={{ color: "red" }}>*</span>{" "}
        </div>
        <input
          className="border-2 border-tahiti-500 h-[25px] w-full pl-2 py-4 rounded-md outline-none bg-white text-sm text-black placeholder:text-sm"
          value={phone}
          placeholder="01xxxxxxxxx"
          onChange={(event) => setPhone(event.target.value)}
        />
      </div>

      <div className="w-full mt-1">
        <div className="text-sm font-normal text-black">
          Full address <span style={{ color: "red" }}>*</span>{" "}
        </div>
        <textarea
          className="border-2 border-tahiti-500 w-full pl-2 pt-4 rounded-md outline-none bg-white text-black placeholder:text-sm"
          placeholder="Enter address....."
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
      </div>

      <div className="w-full mt-1">
        <div className="text-xs font-normal text-black">
          Select your area <span style={{ color: "red" }}>*</span>{" "}
        </div>
        <div className="flex items-center space-x-3 mt-3">
          {deliveryData?.map((item, index) => (
            <div
              key={index}
              className={`${
                areaID == item?.id
                  ? "bg-tahiti-500  text-white  shadow-md"
                  : "text-black  bg-gray-300"
              }  px-4 xls:px-3 py-2 xms:px-2  xs:px-2 xs:text-xs text-sm  xms:text-xs cursor-pointer`}
              onClick={() => handleArea(item?.id, item?.value)}
            >
              {item?.name} (৳ {item?.value})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddressSection;
