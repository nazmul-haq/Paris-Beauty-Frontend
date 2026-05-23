import { Pagination } from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import {  useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import NotFound from "./office.json";
import SingleOrderModal from "./SingleOrderModal";

const LottiePlayer = dynamic(() => import("lottie-react"), {
  ssr: false,
});

import dayjs from "dayjs";
import OrderTrackModal from "./OrderTrackModal";
import ReviewModal from "./ReviewModal";
import { BsTruck } from "react-icons/bs";

const MyOrder = ({ data, loading, total,page, setPage }) => {
  const router = useRouter();

  const [singleData, setSingleData] = useState({});

  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [trackModal, setTrackModal] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const handleOrderDetails = (val) => {
    setOrderModalOpen(true);
    setSingleData(data[val]);
  };

  const handleOrderTrack = (val) => {
    setTrackModal(true);
    setSingleData(data[val]);
  };
  const handleOrderReview = (val) => {
    setReviewModalOpen(true);
    setSingleData(data[val]);
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "170px",
          }}
        >
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#1F2937"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            visible={true}
          />
        </div>
      ) : (
        <>
          {data?.length > 0 ? (
            <div className="">
              <div className="text-[13px]">Purchase List</div>
              <div className="p-3 mt-3 bg-white rounded-md shadow-md">
                <div className="flex overflow-hidden overflow-x-auto flex-col mt-4 rounded-lg">
                  <div className="sm:-mx-6 lg:-mx-8">
                    <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                      <div>
                        <table className="min-w-full text-sm font-light text-left">
                          <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-white dark:text-gray-400">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-[14px] "
                              >
                                Invoice no
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-[14px] "
                              >
                                Date
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-[14px] "
                              >
                                Grand total
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-[14px] "
                              >
                                Payment
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-[14px] "
                              >
                                Status
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-[14px] "
                              >
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-black">
                            {data?.map((item, index) => (
                              <tr
                                className="bg-white border-b dark:bg-white dark:border-gray-700"
                                key={index}
                              >
                                <th
                                  scope="row"
                                  className="px-6 py-2 text-[12px] font-medium text-gray-900 whitespace-nowrap dark:text-gray-700"
                                >
                                  {item?.invoice_no}
                                </th>
                                <td className="px-6 py-2 text-[12px]">
                                  {dayjs(item?.sale_date).format("DD-MM-YYYY")}
                                </td>
                                <td className="px-6 py-2 text-[12px]">
                                  {item?.grand_total} tk
                                </td>
                                <td className="px-6 py-2 text-[12px]">Cash</td>
                                <td className="px-6 py-2 text-[12px]">
                                  <div>
                                    {item?.delivery_status == 1
                                      ? "New order"
                                      : item?.delivery_status == 2
                                      ? "pending"
                                      : item?.delivery_status == 3
                                      ? "pending payment"
                                      : item?.delivery_status == 4
                                      ? "confirm"
                                      : item?.delivery_status == 5
                                      ? "hold"
                                      : item?.delivery_status == 6
                                      ? "processing"
                                      : item?.delivery_status == 7
                                      ? "send to courier"
                                      : item?.delivery_status == 8
                                      ? "Assign to rider"
                                      : item?.delivery_status == 9
                                      ? "Delivered"
                                      : item?.delivery_status == 10
                                      ? "Return"
                                      : item?.delivery_status == 11
                                      ? "Exchange"
                                      : item?.delivery_status == 12
                                      ? "Cancel"
                                      : null}
                                  </div>
                                </td>
                                <td className="flex gap-2 justify-center items-center px-6 py-2">
                                  <button
                                    className="px-3 bg-red-600 text-white font-medium text-[11px] py-[3px] tracking-wider"
                                    onClick={() => handleOrderTrack(index)}
                                  >
                                    Track
                                  </button>
                                  <button
                                    className="px-3 bg-green-500 text-white font-medium text-[11px] py-[3px] tracking-wider"
                                    onClick={() => handleOrderDetails(index)}
                                  >
                                    view
                                  </button>
                                  <button
                                    className="px-3 bg-tahiti-500 text-white font-medium text-[11px] py-[3px] tracking-wider"
                                    onClick={() => handleOrderReview(index)}
                                  >
                                    Review
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center py-6">
                  <Pagination
                    current={page}
                    total={total}
                    onChange={(page) => setPage(page)}
                    showSizeChanger={false}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-white rounded-md">
              {" "}
              <div className="mx-auto w-96 xls:w-72 xms:w-64 xs:w-56">
                <LottiePlayer loop={true} animationData={NotFound} />
              </div>
            </div>
          )}
        </>
      )}

      <SingleOrderModal
        orderModalOpen={orderModalOpen}
        setOrderModalOpen={setOrderModalOpen}
        singleData={singleData}
        setSingleData={setSingleData}
      />

      <OrderTrackModal
        trackModal={trackModal}
        setTrackModal={setTrackModal}
        singleData={singleData}
        setSingleData={setSingleData}
      />
      <ReviewModal
        reviewModalOpen={reviewModalOpen}
        setReviewModalOpen={setReviewModalOpen}
        singleData={singleData}
        setSingleData={setSingleData}
      />
    </>
  );
};

export default MyOrder;
