import postRequest from "@/lib/postRequest";
import { Dialog, Transition } from "@headlessui/react";
import dayjs from "dayjs";
import { Fragment, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { toast } from "react-toastify";

const ReviewModal = ({
  reviewModalOpen,
  setReviewModalOpen,
  singleData,
  setSingleData,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedPro, setSelectedPro] = useState(null)

  const handleClose = () => {
    setReviewModalOpen(false);
    setSingleData({});
    setSelectedPro(null)
    setRating(0)
    setComment("")
  };

  const ratingChanged = (newRating) => {

    setRating(newRating);
  };

  

  const addReview = async () => {
     
     if (rating == 0) {
        
       toast.error("Review is required");
       return;
        
     }

     if(comment == ""){
       toast.error("comment is required");
       return;
     }

      let obj = {
        product_id: selectedPro?.product?.id,
        review_date: dayjs().format('YYYY-MM-DD'),
        star: rating,
        description: comment,
      };
      let res = await postRequest('product-review-add',obj)
      if(res?.success){
        toast.success(res?.message)
        handleClose()
      } else {
          toast.error(res?.message);
          handleClose();
      } 
     
  };


  return (
    <Transition appear show={reviewModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 overflow-y-auto bg-opacity-60 bg-black dark:text-black"
        onClose={() => setReviewModalOpen(false)}
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
            enter="ease-out duration-500 translate-y-0"
            enterFrom="opacity-0 duration-300 scale-95 translate-y-0"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-[800px] min-h-[300px] p-4 xls:p-2 xms:p-2 xs:p-1 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-100 rounded-lg shadow-xl">
              <div>
                <div className="py-4 bg-gray-100 flex flex-col justify-center max-w-[45rem] mx-auto">
                  <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="text-center text-3xl font-extrabold text-gray-900 relative">
                      <div
                        className="absolute top-[-20px] right-[-5px]"
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
                  </div>
                  <div className="bg-gray-100 my-5">
                    <div>
                      <div className="px-4 xls:px-1 xms:px-1 xs:px-1 py-2 font-body border-2 border-tahiti-500 rounded-md mt-3">
                        <div className="grid grid-cols-3">
                          <div className="grid justify-start text-[12px] xls:text-xs xms:text-xs xs:text-xs">
                            <p className="text-gray-500 font-semibold">
                              Invoice no
                            </p>
                            <p className="font-semibold xls:text-xs xms:text-xs xs:text-xs">
                              {singleData?.invoice_no}
                            </p>
                          </div>

                          <div className="grid justify-center text-[12px]">
                            <p className="text-gray-500 font-semibold xls:text-xs xms:text-xs xs:text-xs">
                              Order Date
                            </p>
                            <p className="font-semibold xls:text-xs xms:text-xs xs:text-xs">
                              {singleData?.sale_date}
                            </p>
                          </div>
                          <div className="grid justify-end text-[12px]">
                            <p className="text-gray-500 font-semibold xls:text-xs xms:text-xs xs:text-xs">
                              Payment method
                            </p>
                            <p className="font-semibold xls:text-xs xms:text-xs xs:text-xs">
                              cash
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-2 font-body">
                        <p className="tracking-wider text-[14px]">
                          Order Summary
                        </p>

                        <div className="border-2 border-tahiti-500 rounded-md mt-1">
                          {singleData?.sale_product_list?.map((item, index) => (
                            <div
                              className="grid grid-cols-12 px-2 py-2 "
                              key={index}
                            >
                              {item?.product?.product_name.length > 35 ? (
                                <p
                                  title={item?.product?.product_name}
                                  className="font-semibold tracking-wider text-[12px] text-black col-span-5 xls:text-xs xms:text-xs xs:text-xs"
                                >
                                  {item?.product?.product_name.substring(
                                    0,
                                    35
                                  ) + "...."}
                                </p>
                              ) : (
                                <p className="font-semibold text-[12px] tracking-wider text-black col-span-5 xls:text-xs xms:text-xs xs:text-xs">
                                  {item?.product?.product_name}
                                </p>
                              )}

                              <p className="text-black col-span-2 text-[12px] xls:text-xs xms:text-xs xs:text-xs">
                                {item?.qty}
                              </p>
                              <h2 className="font-semibold  text-[12px] text-black col-span-2 xls:text-xs xms:text-xs xs:text-xs">
                                ৳ {item?.total}
                              </h2>
                              <view className="col-span-3 flex items-center justify-center">
                              <div onClick={()=>setSelectedPro(item)} className="text-[12px] bg-tahiti-500 px-1 py-1 text-white cursor-pointer">Select Product</div>
                              </view>
                            </div>
                          ))}
                        </div>
                      </div>
                      {selectedPro != null &&
                      <div className="mt-2 font-body dark:text-black">
                        <div className="text-[14px] font-semibold">
                          Add Review for <span className="text-tahiti-500">{selectedPro?.product?.product_name}</span>
                        </div>
                        <div>
                          <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={24}
                            activeColor="#ffd700"
                          />
                        </div>
                        <div>
                          <p className="text-[14px]">Give Your comment</p>
                          <textarea
                            className="border-2 border-black outline-tahiti-500 p-2 w-full rounded-md"
                            placeholder="description"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </div>
                        <view className="flex items-center justify-end ">
                          <div onClick={()=>addReview()} className="bg-tahiti-500 px-2 py-2 text-white rounded-md cursor-pointer">
                            Save Review
                          </div>
                        </view>
                      </div>
                       }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ReviewModal;
