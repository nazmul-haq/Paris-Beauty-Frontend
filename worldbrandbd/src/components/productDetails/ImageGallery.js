import hostname from "@/lib/config";
import Image from "next/image";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useState } from "react";
import ImageGalleryCard from "./ImageGalleryCard";
import { Zoom } from "reactjs-image-zoom";

const ImageGallery = ({
  data,
  selectedIndex,
  selectedNormalIndex,
  handleImageClick,
  handleVariationImageClick,
  setSelectedIndex,
  clickFlag,
  setClickFlag,
}) => {
  const [isOptimized, setIsOptimized] = useState(true);

  const props = {
    img:
      !clickFlag && data?.image
        ? hostname?.ImageHostName +
          "/storage/product/" +
          encodeURIComponent(data?.image[selectedNormalIndex])
        : data?.product_variation_status == 1 &&
          data?.product_variants &&
          data?.product_variants[selectedIndex]?.image
        ? hostname?.ImageHostName +
          "/storage/product/" +
          encodeURIComponent(data?.product_variants[selectedIndex]?.image[0])
        : "/assets/placeholder_600x.webp",
  };

  const getImageSrc = () => {
    const basePath = hostname?.ImageHostName + "/storage/product/";

    if (!clickFlag && data?.image) {
      return basePath + encodeURIComponent(data.image[selectedNormalIndex]);
    }

    if (
      data?.product_variation_status === 1 &&
      data?.product_variants &&
      data.product_variants[selectedIndex]?.image?.[0]
    ) {
      return (
        basePath +
        encodeURIComponent(data.product_variants[selectedIndex].image[0])
      );
    }

    return "/assets/placeholder_600x.webp";
  };

  const handleDownload = async () => {
    try {
      const imageUrl = getImageSrc();
      ``;
      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch image.");
      }

      // Create Blob and trigger download
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${data?.product_name || "download"}.jpg`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl); // Free memory
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  const CustomPrevArrow = (props) => {
    const { onClick } = props;

    const handleBack = () => {
      if (data?.product_variation_status == 1) {
        setSelectedIndex((prev) => {
          if (prev > 0) {
            return prev - 1; // Decrement if not at the beginning
          } else {
            return data?.product_variants?.length - 1; // Cycle back to the maximum index
          }
        });
        setClickFlag(true);
      } else {
        setSelectedIndex((prev) => {
          if (prev > 0) {
            return prev - 1; // Decrement if not at the beginning
          } else {
            return data?.image && data?.image?.length - 1; // Cycle back to the maximum index
          }
        });
      }
    };

    return (
      <div className="custom-prev-arrow" onClick={onClick}>
        <button
          onClick={() => handleBack()}
          className="h-[40px] w-[40px] rounded-full shadow-xl drop-shadow-lg  transition duration-200 bg-slate-50 text-black grid place-items-center cursor-pointer"
        >
          <MdOutlineKeyboardArrowUp size={20} />
        </button>
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;

    const handleForward = () => {
      if (data?.product_variation_status == 1) {
        setSelectedIndex((prev) => {
          if (prev < data?.product_variants?.length - 1) {
            return prev + 1; // Increment if not at the end
          } else {
            return 0; // Reset to 0 if at the end
          }
        });
        setClickFlag(true);
      } else {
        setSelectedIndex((prev) => {
          if (prev < data?.image && data?.image?.length - 1) {
            return prev + 1; // Increment if not at the end
          } else {
            return 0; // Reset to 0 if at the end
          }
        });
      }
    };

    return (
      <div className="custom-next-arrow" onClick={onClick}>
        <button
          onClick={() => handleForward()}
          className="h-[40px] w-[40px] rounded-full shadow-xl drop-shadow-lg  transition duration-200 bg-slate-50 text-black grid place-items-center cursor-pointer"
        >
          <MdKeyboardArrowDown size={20} />
        </button>
      </div>
    );
  };

  const CustomSmallPrevArrow = (props) => {
    const { onClick } = props;

    const handleBack = () => {
      if (data?.product_variation_status == 1) {
        setSelectedIndex((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            return data?.product_variants?.length - 1;
          }
        });
        setClickFlag(true);
      } else {
        setSelectedIndex((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            return data?.image && data?.image?.length - 1;
          }
        });
      }
    };

    return (
      <div className="custom-small-prev-arrow" onClick={onClick}>
        <button
          onClick={() => handleBack()}
          className="h-[30px] w-[30px] rounded-full shadow-xl drop-shadow-lg  transition duration-200 bg-slate-50 text-black grid place-items-center cursor-pointer"
        >
          <MdOutlineKeyboardArrowLeft size={20} />
        </button>
      </div>
    );
  };

  const CustomSmallNextArrow = (props) => {
    const { onClick } = props;

    const handleForward = () => {
      if (data?.product_variation_status == 1) {
        setSelectedIndex((prev) => {
          if (prev < data?.product_variants?.length - 1) {
            return prev + 1; // Increment if not at the end
          } else {
            return 0; // Reset to 0 if at the end
          }
        });
        setClickFlag(true);
      } else {
        setSelectedIndex((prev) => {
          if (prev < data?.image && data?.image?.length - 1) {
            return prev + 1; // Increment if not at the end
          } else {
            return 0; // Reset to 0 if at the end
          }
        });
      }
    };

    return (
      <div className="custom-small-next-arrow" onClick={onClick}>
        <button
          onClick={() => handleForward()}
          className="h-[30px] w-[30px] rounded-full shadow-xl drop-shadow-lg  transition duration-200 bg-slate-50 text-black grid place-items-center cursor-pointer"
        >
          <MdOutlineKeyboardArrowRight size={20} />
        </button>
      </div>
    );
  };

  return (
    <div>
      <div className="bg-white col-span-1 p-2 grid  grid-cols-6 gap-8 rounded-l-md shadow-md   sm:gap-0 sm:rounded-sm md:hidden sm:hidden xls:hidden xms:hidden xs:hidden ">
        <div className="mt-10">
          <div>
            {data?.product_variation_status == 1 ? (
              <div className="relative ">
                {data?.product_variants &&
                data?.product_variants?.length > 5 ? (
                  <Slider
                    slidesToShow={5}
                    slidesToScroll={1}
                    vertical={true}
                    verticalSwiping={true}
                    prevArrow={<CustomPrevArrow />}
                    nextArrow={<CustomNextArrow />}
                  >
                    {data?.product_variants?.map((item, index) => (
                      <div
                        key={index}
                        className={`relative w-[60px] h-[60px]  border-[2px] ${
                          selectedIndex == index && clickFlag
                            ? "border-tahiti-500"
                            : "border-gray-200"
                        } rounded-md cursor-pointer`}
                        onClick={() =>
                          handleVariationImageClick(item?.id, index)
                        }
                      >
                        {item?.image ? (
                          <ImageGalleryCard image={item?.image[0]} />
                        ) : (
                          <Image
                            className="rounded-md object-cover h-full w-full"
                            src={`/assets/placeholder_600x.webp`}
                            width={500}
                            height={100}
                            priority
                            alt="product"
                          />
                        )}
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div>
                    {data?.product_variants?.map((item, index) => (
                      <div
                        key={index}
                        className={`relative w-[60px] h-[60px]  border-[2px] ${
                          selectedIndex == index && clickFlag
                            ? "border-tahiti-500"
                            : "border-gray-200"
                        } rounded-md mb-2 cursor-pointer`}
                        onClick={() =>
                          handleVariationImageClick(item?.id, index)
                        }
                      >
                        {item?.image ? (
                          <ImageGalleryCard image={item?.image[0]} />
                        ) : (
                          <Image
                            className="rounded-md object-cover h-full w-full"
                            src={`/assets/placeholder_600x.webp`}
                            width={500}
                            height={100}
                            priority
                            alt="product"
                          />
                        )}
                      </div>
                    ))}
                    {data?.image?.map((item, index) => (
                      <div
                        key={index}
                        className={`relative w-[60px] h-[60px]    border-[2px] ${
                          selectedNormalIndex == index && !clickFlag
                            ? "border-tahiti-500"
                            : "border-gray-200"
                        } rounded-md mb-2 cursor-pointer`}
                        onClick={() => handleImageClick(index)}
                      >
                        {item ? (
                          <ImageGalleryCard image={item} />
                        ) : (
                          <Image
                            className="rounded-md object-cover h-full w-full"
                            src={`/assets/placeholder_600x.webp`}
                            width={500}
                            height={100}
                            priority
                            alt="product"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                {data?.image && data?.image?.length > 5 ? (
                  <Slider
                    slidesToShow={5}
                    slidesToScroll={1}
                    vertical={true}
                    verticalSwiping={true}
                    prevArrow={<CustomPrevArrow />}
                    nextArrow={<CustomNextArrow />}
                  >
                    {data?.image?.map((item, index) => (
                      <div
                        key={index}
                        className={`relative w-[60px] h-[60px]    border-[2px] ${
                          selectedIndex == index && clickFlag
                            ? "border-tahiti-500"
                            : "border-gray-200"
                        } rounded-md cursor-pointer`}
                        onClick={() => handleImageClick(index)}
                      >
                        {item ? (
                          <ImageGalleryCard image={item} />
                        ) : (
                          <Image
                            className="rounded-md object-cover h-full w-full"
                            src={`/assets/placeholder_600x.webp`}
                            width={500}
                            height={100}
                            priority
                            alt="product"
                          />
                        )}
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="pb-2">
                    {data?.image?.map((item, index) => (
                      <div
                        key={index}
                        className={`relative w-[60px] h-[60px]    border-[2px] ${
                          selectedIndex == index && clickFlag
                            ? "border-tahiti-500"
                            : "border-gray-200"
                        } rounded-md mb-2 cursor-pointer`}
                        onClick={() => handleImageClick(index)}
                      >
                        {item ? (
                          <ImageGalleryCard image={item} />
                        ) : (
                          <Image
                            className="rounded-md object-cover h-full w-full"
                            src={`/assets/placeholder_600x.webp`}
                            width={500}
                            height={100}
                            priority
                            alt="product"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="col-span-5 xs:col-span-full xms:col-span-full xls:col-span-full sm:col-span-full">
          <div className="relative  rounded-md cursor-pointer w-full h-[600px] xs:h-[300px] xms:h-[300px] xls:h-[320px] sm:h-[380px] md:h-[500px]">
            <Zoom
              width={150}
              height={500}
              maxwidth={450}
              repeat="repeat"
              position="center"
              imagesrc={getImageSrc()}
              size={200}
              bgsize="cover"
              cursor="zoom-in"
              style={{ margin: "0px" }}
            />
            <button
              className="absolute top-5 right-4 bg-white rounded-full h-8 px-2 flex justify-center items-center cursor-pointer group shadow"
              onClick={handleDownload}
            >
              <svg
                className="text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 15V5M12 15C11.2998 15 9.99153 13.0057 9.5 12.5M12 15C12.7002 15 14.0085 13.0057 14.5 12.5"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M5 19H19.0001"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:block sm:block xls:block xms:block xs:block bg-white">
        <div className="relative  rounded-md cursor-pointer w-full h-[600px] xs:h-[300px] xms:h-[300px] xls:h-[320px] sm:h-[380px] md:h-[500px]">
          <Image
            className="rounded-md object-contain h-full w-full"
            height={500}
            width={500}
            src={isOptimized ? props.img : "/assets/placeholder_600x.webp"}
            alt="product image"
            priority
            unoptimized={!isOptimized}
            onError={() => setIsOptimized(false)}
          />
          <button
            className="absolute top-5 right-4 bg-white rounded-full h-8 px-2 flex justify-center items-center cursor-pointer group shadow"
            onClick={handleDownload}
          >
            <svg
              className="text-black"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 15V5M12 15C11.2998 15 9.99153 13.0057 9.5 12.5M12 15C12.7002 15 14.0085 13.0057 14.5 12.5"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M5 19H19.0001"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="mt-4">
          {data?.product_variation_status == 1 ? (
            <div className="relative">
              {data?.product_variants && data?.product_variants?.length > 5 ? (
                <Slider
                  slidesToShow={5}
                  slidesToScroll={1}
                  prevArrow={<CustomSmallPrevArrow />}
                  nextArrow={<CustomSmallNextArrow />}
                >
                  {data?.product_variants?.map((item, index) => (
                    <div
                      key={index}
                      className={`relative w-[40px] h-[100px] xls:h-[70px] xms:h-[60px] xs:h-[55px] p-[8px] xls:p-[5px] xms:p-[5px] xs:p-[4px] rounded-md cursor-pointer `}
                      onClick={() => handleVariationImageClick(item?.id, index)}
                    >
                      {item?.image && item?.image?.length > 0 ? (
                        <ImageGalleryCard image={item?.image[0]} />
                      ) : (
                        <Image
                          className="rounded-md object-cover h-full w-full"
                          src={`/assets/placeholder_600x.webp`}
                          width={500}
                          height={100}
                          priority
                          alt="product"
                        />
                      )}
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="grid grid-cols-5 gap-2">
                  {data?.product_variants?.map((item, index) => (
                    <div
                      key={index}
                      className={`relative  rounded-md cursor-pointer `}
                      onClick={() => handleVariationImageClick(item?.id, index)}
                    >
                      {item?.image && item?.image?.length > 0 ? (
                        <ImageGalleryCard image={item?.image[0]} />
                      ) : (
                        <Image
                          className="rounded-md object-cover h-full w-full"
                          src={`/assets/placeholder_600x.webp`}
                          width={500}
                          height={100}
                          priority
                          alt="product"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              {data?.image && data?.image?.length > 5 ? (
                <Slider
                  slidesToShow={5}
                  slidesToScroll={1}
                  prevArrow={<CustomSmallPrevArrow />}
                  nextArrow={<CustomSmallNextArrow />}
                >
                  {data?.image?.map((item, index) => (
                    <div
                      key={index}
                      className={`relative w-[40px] h-[100px] xls:h-[70px] xms:h-[60px] xs:h-[55px] p-[8px] xls:p-[5px] xms:p-[5px] xs:p-[4px] rounded-md cursor-pointer `}
                      onClick={() => handleImageClick(index)}
                    >
                      {item && item?.length > 0 ? (
                        <ImageGalleryCard image={item} />
                      ) : (
                        <Image
                          className="rounded-md object-cover h-full w-full"
                          src={`/assets/placeholder_600x.webp`}
                          width={500}
                          height={100}
                          priority
                          alt="product"
                        />
                      )}
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="grid grid-cols-5 gap-2">
                  {data?.image?.map((item, index) => (
                    <div
                      key={index}
                      className={`relative  rounded-md cursor-pointer `}
                      onClick={() => handleImageClick(index)}
                    >
                      {item && item?.length > 0 ? (
                        <ImageGalleryCard image={item} />
                      ) : (
                        <Image
                          className="rounded-md object-cover h-full w-full"
                          src={`/assets/placeholder_600x.webp`}
                          width={500}
                          height={100}
                          priority
                          alt="product"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
