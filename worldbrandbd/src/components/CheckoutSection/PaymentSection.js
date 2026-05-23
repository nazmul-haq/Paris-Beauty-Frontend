import { useStatus } from '@/context/contextStatus';
import { useEffect, useState } from 'react';

const PaymentSection = ({ areaAmount }) => {

  const { cartItems, renderMe } = useStatus();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    let dd = cartItems?.reduce(
      (a, b) =>
        a +
        (b?.sellingPrice
          ? b?.sellingPrice * b?.quantity
          : b?.sellingPrice * b?.quantity),
      0
    );

    setTotal(Number(dd));
  }, [renderMe]);

  return (
    <div className="bg-white p-4 mt-4 rounded-md max-w-md mx-auto">
      <div>
        <div className="font-semibold text-center text-black tracking-wider">
          Your total payable amount is ৳{" "}
          {areaAmount ? Math.round(total) + areaAmount : null}
        </div>
      </div>
    </div>
  );
};

export default PaymentSection