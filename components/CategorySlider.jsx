"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/pagination";

// ** Import Icons
import { TfiAngleRight, TfiAngleLeft } from "react-icons/tfi";
import Link from "next/link";
import Image from "next/image";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const CategorySlider = ({
  banners,
  sliderId = "slider",
  translations,
  settings,
}) => {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={4}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          540: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        spaceBetween={4}
        loop={true}
        navigation={{
          prevEl: `.custom_prev_${sliderId}`,
          nextEl: `.custom_next_${sliderId}`,
        }}
        pagination={{
          clickable: true,
        }}
        // centeredSlides={true}
        className="category-slider"
      >
        {banners?.map((banner, i) => (
          <SwiperSlide key={i}>
            <div key={banner.id}>
              <Link href={banner.url || "#"} className="banner-img">
                <Image
                  src={banner.image || noImage}
                  alt="Banner"
                  width={400}
                  height={500}
                  className="w-full h-[540px] 2xl:h-[600px] object-cover object-top transition-transform duration-300 ease-in-out"
                />
              </Link>
              <div className="content w-full text-center">
                <Link
                  href={banner.url || "#"}
                  className="rounded px-2 py-2.5 font-medium font-title flex justify-center items-center gap-1 group capitalize shadow-[0_0_10px_-5px_#000] w-[80%] my-[2rem] mx-auto text-[.9rem]"
                  style={{
                    borderColor: settings?.colors?.default_text,
                    color: settings?.colors?.default_text,
                  }}
                >
                  <span className="group-hover:-translate-x-3 transition-transform duration-500">
                    {banner.title}
                  </span>
                  <span>
                    <MdKeyboardDoubleArrowRight
                      size={22}
                      className="group-hover:translate-x-3 transition-transform duration-500"
                    />
                  </span>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="slider-arrow">
        <span
          className={`slider-btn slider-prev -left-0 !top-[44%] slick-arrow custom_prev_${sliderId}`}
        >
          <TfiAngleLeft />
        </span>
        <span
          className={`slider-btn slider-next !right-0 !top-[44%] slick-arrow custom_next_${sliderId}`}
        >
          <TfiAngleRight />
        </span>
      </div>
    </div>
  );
};

export default CategorySlider;
