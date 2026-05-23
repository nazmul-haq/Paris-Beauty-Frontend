
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import CategoryCard from "./CategoryCard/CategoryCard";
import Link from "next/link";

const ProductCategorySection = ({ catData }) => {

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "5px",
    slidesToShow: 6.0,

    speed: 500,
    rows: 2,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5.0,
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3.2,
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3.0,
          centerPadding: "5px",
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 3.0,
          centerPadding: "5px",
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 3.0,
          centerPadding: "5px",
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 3.0,
          centerPadding: "5px",
        },
      },
    ],
  };


  return (
    <div>
      <div className="slider-container">
        <Slider {...settings}>
          {catData?.product_categories?.map((item, index) => (
            <Link
              href={`/product-list/${item?.slug}`}
              className=" p-3 sm:p-[10px] xls:p-[5px] xms:p-[5px] xs:p-[5px] cursor-pointer "
              key={index}
            >
              <CategoryCard item={item}  />
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductCategorySection