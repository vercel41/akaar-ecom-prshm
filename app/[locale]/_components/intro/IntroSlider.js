"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

const IntroSlider = ({ sliders, settings }) => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        grabCursor={true}
        lazy={{ loadPrevNext: true }}
        pagination={{ clickable: true }}
        className="hero-slider cursor-grab"
        autoplay={{ delay: 10000 }}
        // effect="fade"
        // speed={1000}
      >
        {sliders.map((slide, i) => (
          <SwiperSlide key={i} className="">
            <div
              className={`relative single-hero-slider bg-top px-3 lg:px-12 md:py-10 text-center flex justify-center items-center h-56 sm:h-80 md:h-96 lg:h-[calc(100vh+40px)] bg-no-repeat bg-cover `}
              style={{
                backgroundImage: `linear-gradient(to top, #040404a6, #36363633), url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default IntroSlider;
