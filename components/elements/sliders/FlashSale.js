"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SingleProduct from "@/components/products/SingleProduct";

// ** Import Icons
import { TfiAngleRight, TfiAngleLeft } from "react-icons/tfi";

const FlashSale = ({ saleProducts }) => {
  return (
    <>
      <Swiper
        modules={[Navigation]}
        slidesPerView={4}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        spaceBetween={20}
        loop={false}
        navigation={{
          prevEl: ".custom_prev_f",
          nextEl: ".custom_next_f",
        }}
      >
        {saleProducts?.map((product, i) => (
          <SwiperSlide key={i}>
            <SingleProduct product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="slider-arrow">
        <span className="slider-btn slider-prev slick-arrow custom_prev_f">
          <TfiAngleLeft />
        </span>
        <span className="slider-btn slider-next slick-arrow custom_next_f">
          <TfiAngleRight />
        </span>
      </div>
    </>
  );
};

export default FlashSale;
