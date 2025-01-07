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
        pagination={{ clickable: true }}
        className="hero-slider cursor-grab"
        autoplay={{ delay: 3000 }}
        effect="fade"
        speed={1000}
      >
        {sliders.map((slide, i) => (
          <SwiperSlide key={i} className="transition-all duration-500">
            <div
              className={`relative single-hero-slider bg-top px-3 lg:px-12 md:py-10 text-center flex justify-center items-center ${
                settings?.offer_massage
                  ? "h-[100vh] md:h-[353px] lg:h-[85vh]"
                  : "h-[100vh] md:h-[363px] lg:h-[88vh]"
              } bg-no-repeat bg-cover bg-center`}
              style={{
                background: slide?.image
                  ? `linear-gradient(to top, #040404a6, #36363633), url(${slide.image})`
                  : `linear-gradient(to top, #040404a6, #36363633), url(/assets/images/banner/banner-1.png)`,
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
