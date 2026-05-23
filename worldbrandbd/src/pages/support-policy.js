import request from '@/lib/request';
import { useEffect, useState } from 'react';

const SupportPolicy = () => {
 

     const [data, setData] = useState(null);
 
   useEffect(() => {
     const getData = async () => {
       let res = await request(`support-policy`);

       setData(res?.data);
     };
     getData();
   }, [1]);

  return (
    <div className="bg-gray-100 min-h-[670px] pt-[160px] xs:pt-[90px] xms:pt-[90px] xls:pt-[90px] sm:pt-[100px]">
      <section>
        <div className="max-w-[95rem] lg:max-w-[70rem] md:max-w-[60rem] sm:max-w-[45rem] xls:max-w-[25rem] xms:max-w-[22rem] xs:max-w-[19rem] px-2 py-10 mx-auto">
          <h1 className="text-4xl xls:text-2xl xms:text-2xl xs:text-2xl font-semibold text-center text-black dark:text-black">
            Support policy
          </h1>
          <div className="py-4 pt-5">
            <div
              className="text-base text-black"
              dangerouslySetInnerHTML={{ __html: data?.details }}
            ></div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SupportPolicy;

// export async function getServerSideProps(context) {
//   let settings = await request(`support-policy`);

//   return {
//     props: {
//       data: settings?.data || null,
//     },
   
//   };
// }