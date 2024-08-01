"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProductCard from "@/components/cards/ProductCard";

// ** Import Icons
import { TfiAngleRight, TfiAngleLeft } from "react-icons/tfi";
import { siteConfig } from "@/config/site";

const BestSellSlider = ({ bestProducts }) => {
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
          prevEl: ".custom_prev_b",
          nextEl: ".custom_next_b",
        }}
      >
        {bestProducts?.map((product, i) => (
          <SwiperSlide key={i}>
            <ProductCard
              product={product}
              isSquareImage={siteConfig.isSquareImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="slider-arrow">
        <span className="slider-btn slider-prev slick-arrow custom_prev_b">
          <TfiAngleLeft />
        </span>
        <span className="slider-btn slider-next slick-arrow custom_next_b">
          <TfiAngleRight />
        </span>
      </div>
    </>
  );
};

export default BestSellSlider;
