"use client";

import { Autoplay, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const OfferSlider = ({ sliders }) => {
  return (
    <>
      <Swiper
        modules={[EffectFade, Autoplay]}
        // effect={"fade"}
        slidesPerView={3}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        spaceBetween={0}
        loop={true}
        // pagination={{ clickable: true }}
        className="mySwiper"
        autoplay={{ delay: 3000 }}
      >
        {sliders.map((slide) => (
          <SwiperSlide key={slide?.id}>
            <div class="item text-center lg:text-start">
              <h5 className="text-slate-700 font-bold">{slide.title}</h5>
              <p className="text-slate-600 text-sm">{slide.text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default OfferSlider;
