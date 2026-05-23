import Link from "next/link";

import { TiDelete } from "react-icons/ti";
import { useRouter } from "next/router";

const PaymentUnsuucessful = () => {
  const router = useRouter();
  //   const params = router.query?.status;

  return (
    <div className="min-h-[670px] bg-[#ddd]">
      <div className="max-w-7xl sm:max-w-[40rem] xls:mx-w-[24rem] xms:max-w-[22rem] xs:max-w-[16rem] mx-auto h-full">
        <div className="flex justify-center items-center h-full pt-72">
          <div>
            <div className="flex justify-center">
              <TiDelete size={50} color="red" />
            </div>
            <p className="text-5xl font-semibold text-center dark:text-black mt-3">
              Payment Fail
            </p>

            <Link className="flex justify-center mt-6" href={`/`}>
              <button className=" px-5 py-2 rounded-md bg-gray-700 text-white">
                Go to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentUnsuucessful;
