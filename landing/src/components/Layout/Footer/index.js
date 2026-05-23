import React from 'react'

const Footer = () => {
  return (
    <div className=" bg-primary-500 py-[30px]">
      <div className="max-w-6xl mx-auto h-full flex items-center px-2">
         <div className="flex items-center justify-center w-full text-white xs:flex-col xms:flex-col xls:flex-col">
          <div>© 2025 ParisBeautyBd | All rights reserved.</div>
          {/* <div className="grid grid-cols-3 gap-20 xs:grid-cols-2 xs:gap-3 xs:pt-2 xms:grid-cols-2 xms:gap-3 xms:pt-2 xls:grid-cols-2 xls:gap-3 xls:pt-2 sm:gap-4">
            <div>Privacy Policy</div>
            <div>Refund Policy</div>
            <div className="text-center xs:col-span-full xms:col-span-full xls:col-span-full">Terms of Services</div>
          </div> */}
         </div>
      </div>
    </div>
  )
}

export default Footer