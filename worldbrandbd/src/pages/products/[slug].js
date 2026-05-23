import React from "react";
import ImageGallery from "@/components/productDetails/ImageGallery";

import { useEffect, useState } from "react";
import ProductCard from "@/components/productSection/productCard";

import Details from "@/components/productDetails/details";
import { useRouter } from "next/router";
import request from "@/lib/request";
import ReactStars from "react-rating-stars-component";
import Head from "next/head";
import { useStatus } from "@/context/contextStatus";
import hostname from "@/lib/config";

const ProductDetails = () => {
  const [tabChange, settabChange] = useState(1);
  const router = useRouter();

  const [selectedItem, setSelectedItem] = useState(null);

  const [similarProd, setSimilarProd] = useState([]);
  const [similarBrand, setSimilarBrand] = useState([]);
  const [variationId, setVariationId] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedNormalIndex, setSelectedNormalIndex] = useState(0);
  const [clickFlag, setClickFlag] = useState(false);
  const { phone } = useStatus();

  const [data, setData] = useState({});

  const [totalQty, setTotalQty] = useState(0);

  const [variationQty, setVariationQty] = useState(0);

  useEffect(() => {
    if (data) {
      const getData = async () => {
        const res = await request(`similar-products/${data?.id}`);
        setSimilarProd(res?.more_products_from_brand);
        setSimilarBrand(res?.you_may_also_like);
      };
      getData();
    }
  }, [data]);

  const handleVariationImageClick = (id, index) => {
    setVariationId(id);

    setSelectedIndex(index);
    setClickFlag(true);

    setVariationQty(data?.product_variants[index]?.qty);

    setSelectedNormalIndex(null);
  };

  const handleImageClick = (index) => {
    setSelectedIndex(0);
    setClickFlag(false);
    setSelectedNormalIndex(index);
  };

  useEffect(() => {
    if (data?.product_variation_status == 1) {
      setVariationId(data?.product_variants[selectedIndex]?.id);
    } else {
      setVariationId(null);
    }
  }, [data, selectedIndex]);

  useEffect(() => {
    if (data?.product_variation_status == 1) {
      const ecommerce = {
        currency: "BDT",
        customer_phone: phone,
        items: [
          {
            item_id: data?.sku,
            item_name: data?.product_name,
            item_brand: data?.brands?.length ? data?.brands[0]?.name : "",
            item_category: data?.categories?.length ? data?.categories[0] : "",
            item_variant:
              data?.product_variation_status == 1 ? data?.product_variants : "",
            price:
              data?.product_variants?.length > 0
                ? data?.product_variants[0]?.sale_price
                : "",
            quantity: 1,
          },
        ],
      };
      window.dataLayer = window.dataLayer || [];
      dataLayer.push({
        event: "product_view",
        ecommerce,
      });
    } else {
      const ecommerce = {
        currency: "BDT",
        customer_phone: phone,
        items: [
          {
            item_id: data?.sku,
            item_name: data?.product_name,
            item_brand: data?.brands?.length > 0 ? data?.brands[0]?.name : "",
            item_category:
              data?.categories?.length > 0 ? data?.categories[0] : "",
            price: data?.sale_price,
            quantity: 1,
          },
        ],
      };
      window.dataLayer = window.dataLayer || [];
      dataLayer.push({
        event: "product_view",
        ecommerce,
      });
    }
  }, [data]);

  useEffect(() => {
    if (data?.product_variation_status == 1) {
      let dd = data?.product_variants?.reduce((a, b) => a + b?.qty, 0);
      setTotalQty(dd);
    } else {
      setTotalQty(data?.qty);
    }
  }, [data]);

  function addProductJsonLd() {
    return {
      __html: `{
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "${data?.product_name}",
      "url": "https://worldbrandbd.com/products/${data?.slug}",
      "image": "${hostname.ImageHostName}/storage/product/${
        data?.image?.length > 0 && data?.image[0]
      }",
      "description": "${data?.product_name}",
      "sku": "${data?.sku}",
      
    }
  `,
    };
  }

  useEffect(() => {
    if (router?.query?.slug) {
      const getData = async () => {
        let res = await request(`get-product-details/${router?.query?.slug}`);

        setData(res?.data);
      };
      getData();
    }
  }, [router?.query?.slug]);

  // console.log("data",data);

  return (
    <>
      <Head>
        <title>{`${data?.product_name}`}</title>

        <link rel="icon" href="/favicon.png" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index,follow" />
        <meta
          name="url"
          content={`https://worldbrandbd.com/products/${data?.slug}`}
        />
        <link
          rel="canonical"
          href={`https://worldbrandbd.com/products/${data?.slug}`}
        />
        <meta name="description" content={`${data?.product_name}`} />
        <meta
          property="product:availability"
          content={`${totalQty == 0 ? "out of stock" : "in stock"}`}
        />
        <meta property="og:site_name" content="ParisBD" />
        <meta property="og:title" content={`${data?.product_name}`} />
        <meta property="og:description" content={`${data?.product_name}`} />

        <meta
          property="og:url"
          content={`https://worldbrandbd.com/products/${data?.slug}`}
        />
        <meta property="og:type" content="product" />

        <meta property="product:condition" content="new" />
        <meta property="product:price:currency" content="BDT" />
        <meta property="product:price:amount" content={`${data?.sale_price}`} />

        {data?.image?.length > 0 ? (
          <meta
            property="og:image"
            content={`${hostname.ImageHostName}/storage/product/${data?.image[0]}`}
          />
        ) : null}

        <meta
          property="og:url"
          href={`https://worldbrandbd.com/products/${data?.slug}`}
        />
        <meta property="product:retailer_item_id" content={`${data?.sku}`} />

        <meta property="og:type" content="website" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addProductJsonLd()}
          key="product-jsonld"
        />
        <script>
          {`
                                       (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NNCSPDMM');
            `}
        </script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NNCSPDMM"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
      </Head>
      <div className="min-h-screen pt-[170px] xs:pt-[120px] xms:pt-[130px] xls:pt-[130px] sm:pt-[140px]">
        <div className="max-w-[95rem] lg:max-w-[80rem] md:max-w-[60rem] sm:max-w-[45rem] xls:max-w-[22rem] xms:max-w-[20rem] xs:max-w-[18rem] mx-auto tracking-[0.4px]">
          <div className="px-2">
            <div className="grid grid-cols-2 xs:grid-cols-1 xms:grid-cols-1 xls:grid-cols-1 sm:grid-cols-1">
              <ImageGallery
                data={data}
                variationId={variationId}
                selectedIndex={selectedIndex}
                handleImageClick={handleImageClick}
                handleVariationImageClick={handleVariationImageClick}
                setSelectedIndex={setSelectedIndex}
                clickFlag={clickFlag}
                setClickFlag={setClickFlag}
                selectedNormalIndex={selectedNormalIndex}
              />
              <Details
                data={data}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                variationId={variationId}
                setVariationId={setVariationId}
                selectedIndex={selectedIndex}
                clickFlag={clickFlag}
                handleVariationImageClick={handleVariationImageClick}
                variationQty={variationQty}
              />
            </div>

            <div>
              <div className="mt-3 rounded-sm">
                <div className="py-3 flex gap-3 items-center xs:flex-wrap xms:flex-wrap xls:flex-wrap ">
                  <div>
                    <button
                      onClick={() => settabChange(1)}
                      className={`py-2 px-4 border ${
                        tabChange == 1
                          ? " bg-tahiti-500 text-white"
                          : "text-black"
                      } border-tahiti-500 rounded-md text-[18px] font-semibold xs:text-[12px] xs:px-2 xms:text-[12px] xms:px-2 xls:text-[12px] xls:px-2 sm:text-[12px] sm:px-2`}
                    >
                      Benefits
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => settabChange(2)}
                      className={`py-2 px-4 border ${
                        tabChange == 2
                          ? " bg-tahiti-500 text-white"
                          : " text-black"
                      } border-tahiti-500 rounded-md text-[18px] font-semibold xs:text-[12px] xs:px-2 xms:text-[12px] xms:px-2 xls:text-[12px] xls:px-2 sm:text-[12px] sm:px-2`}
                    >
                      Description
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => settabChange(3)}
                      className={`py-2 px-4 border ${
                        tabChange == 3
                          ? " bg-tahiti-500 text-white"
                          : "text-black"
                      } border-tahiti-500 rounded-md text-[18px] font-semibold xs:text-[12px] xs:px-2 xms:text-[12px] xms:px-2 xls:text-[12px] xls:px-2 sm:text-[12px] sm:px-2`}
                    >
                      How to use
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => settabChange(4)}
                      className={`py-2 px-4 border ${
                        tabChange == 4
                          ? " bg-tahiti-500 text-white"
                          : "text-black"
                      } border-tahiti-500 rounded-md text-[18px] font-semibold xs:text-[12px] xs:px-2 xms:text-[12px] xms:px-2 xls:text-[12px] xls:px-2 sm:text-[12px] sm:px-2`}
                    >
                      Ingredient
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => settabChange(5)}
                      className={`py-2 px-4 border ${
                        tabChange == 5
                          ? " bg-tahiti-500 text-white"
                          : "text-black"
                      } border-tahiti-500 rounded-md text-[18px] font-semibold xs:text-[12px] xs:px-2 xms:text-[12px] xms:px-2 xls:text-[12px] xls:px-2 sm:text-[12px] sm:px-2`}
                    >
                      Reviews
                    </button>
                  </div>
                </div>
                <div className="bg-white  py-3 px-2 xs:px-2 xms:px-2 xls:px-2">
                  {tabChange == 3 ? (
                    <div className=" ">
                      <span
                        className="text-black"
                        dangerouslySetInnerHTML={{ __html: data?.guide_line }}
                      ></span>
                    </div>
                  ) : tabChange == 2 ? (
                    <div className="overflow-hidden">
                      <span
                        className="text-black"
                        dangerouslySetInnerHTML={{ __html: data?.description }}
                      ></span>
                    </div>
                  ) : tabChange == 1 ? (
                    <div className="overflow-hidden">
                      <span
                        className="text-black"
                        dangerouslySetInnerHTML={{ __html: data?.benefits }}
                      ></span>
                    </div>
                  ) : tabChange == 4 ? (
                    <div className="overflow-hidden">
                      <span
                        className="text-black"
                        dangerouslySetInnerHTML={{ __html: data?.ingredient }}
                      ></span>
                    </div>
                  ) : (
                    <div className="overflow-hidden">
                      {data?.reviews?.length > 0 ? (
                        <>
                          {data?.reviews.map((rev, idx) => (
                            <div key={idx} className="border-b py-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <div className="text-[12px] text-gray-600">
                                    Rating:
                                  </div>
                                  <div>
                                    <ReactStars
                                      count={5}
                                      value={rev?.star}
                                      edit={false}
                                      size={20}
                                      activeColor="#ffd700"
                                    />
                                  </div>
                                  <div className="text-[12px] text-gray-600">
                                    ({rev?.user?.name})
                                  </div>
                                </div>
                                <div className="text-[12px] text-gray-600">
                                  {rev?.review_date}
                                </div>
                              </div>
                              <div className="text-[12px] font-semibold">
                                {" "}
                                {rev?.description}
                              </div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <span className="text-black">NO reviews yet</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="py-2 text-[13px]">
                <span className="text-tahiti-500 text-[13px]">Disclaimer:</span>
                <span
                  dangerouslySetInnerHTML={{ __html: data?.disclaimer }}
                ></span>
              </div>
            </div>

            {similarProd?.length > 0 && (
              <div>
                <div className="py-5 flex items-center justify-between">
                  <div className="text-[18px] font-semibold border-b cursor-pointer xs:text-[14px] xms:text-[14px] xls:text-[14px] sm:text-[16px]">
                    More Products from this Brand{" "}
                    <span className="text-[14px] font-medium text-gray-500 xs:text-[10px] xms:text-[10px] xls:text-[10px] sm:text-[12px]">
                      {" "}
                      Check & Get Your Desired Product
                    </span>
                  </div>
                </div>
                <div>
                  <ProductCard productList={similarProd} />
                </div>
              </div>
            )}

            {similarBrand?.length > 0 && (
              <div>
                <div className="py-5 flex items-center justify-between">
                  <div className="text-[18px] font-semibold border-b cursor-pointer xs:text-[14px] xms:text-[14px] xls:text-[14px] sm:text-[16px]">
                    You May Like{" "}
                    <span className="text-[14px] font-medium text-gray-500 xs:text-[10px] xms:text-[10px] xls:text-[10px] sm:text-[12px]">
                      {" "}
                      Check & Get Your Desired Product
                    </span>
                  </div>
                </div>
                <div>
                  <ProductCard productList={similarBrand} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;

// export async function getServerSideProps(context) {

//   try {
//     let res = await request(
//       `get-product-details/${context?.query?.slug}`,
//       context?.req?.cookies?.token
//     );

//     if(res?.success){
//        return {
//          props: {
//            data: res?.data || null,
//          },
//        };

//     } else {
//       return {
//         notFound: true,
//       };

//     }

//   } catch (error) {
//     console.error("Error fetching product data:", error);
//     return {
//       notFound: true,
//     };
//   }

// }
