import Image from "next/image";
import React, { useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ReviewImageSlider({ images }) {
  // console.log(review);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="w-[33rem]">
      <div className="h-[31.25rem] preview-slider bg-slate-900 rounded-md">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
            "--swiper-navigation-size": "24px",
          }}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
          direction="horizontal"
          slidesPerView={1}
        >
          {images.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-full flex justify-center items-center ">
                <Image
                  src={slide.image}
                  alt="slide"
                  width={400}
                  height={500}
                  className="h-[31.25rem] w-[25rem]  object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="thumb-slider mt-6">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={6}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
          direction="horizontal"
        >
          {images.map((slide, index) => (
            <SwiperSlide key={`thumb-${index}`}>
              <div className="h-20 w-20">
                <Image
                  src={slide.image}
                  alt="thumb-slide"
                  width={80}
                  height={80}
                  className="w-full h-full border border-transparent rounded-lg cursor-pointer bg-slate-100"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
