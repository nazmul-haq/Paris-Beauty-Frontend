
import React from "react";

const DashboardPanel = ({ cartItems,data }) => {
  return (
    <div>
      <div className="text-lg">Dashboard</div>
      <div className="grid grid-cols-3 gap-5 py-4 xs:grid-cols-1 xms:grid-cols-1">
        <div className="col-span-1 bg-[#B854A6] px-3 py-3 h-[150px] rounded-md shadow-md ">
          <div className="text-[22px] font-bold text-white ">
            {cartItems?.length} Products
          </div>
          <div className="text-[12px] text-gray-200">in your cart</div>
        </div>

        <div className="col-span-1 bg-[#5F9DDF] px-3 py-3 h-[150px] rounded-md shadow-md">
          <div className="text-[22px] font-bold text-white">
            {data?.length} Products
          </div>
          <div className="text-[12px] text-gray-200">you ordered</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPanel;
