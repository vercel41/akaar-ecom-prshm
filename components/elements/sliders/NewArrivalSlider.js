"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SingleProduct from "@/components/products/SingleProduct";

// ** Import Icons
import { TfiAngleRight, TfiAngleLeft } from "react-icons/tfi";

const NewArrivalSlider = ({ newProducts }) => {
  return (
    <div className="relative">
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
        {newProducts?.map((product, i) => (
          <SwiperSlide key={i}>
            <SingleProduct product={product} />
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
    </div>
  );
};

export default NewArrivalSlider;
