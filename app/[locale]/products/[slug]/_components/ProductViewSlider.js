"use client";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { forwardRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css/pagination";

import useWishList from "@/hooks/useWishList";
import noImage from "@/public/assets/images/no-image.png";
import ImageZoom from "./ImageZoom";

// ** Import Icon
import { HiPlayCircle } from "react-icons/hi2";
import { startVideoPlayer } from "@/store/slices/commonSlice";
import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";
import { cn } from "@/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import dynamic from "next/dynamic";
import { delay } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductViewSkeleton from "@/components/elements/loaders/ProductViewSkeleton";
import ProductZoomYetAnother from "./ProductZoomYetAnother";

const ProductViewSlider = forwardRef(
  ({ product, selectedColor, isSquareImage, isLoading }, ref) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    //setting default image if no image is provided
    let slides = product?.photos?.length
      ? product?.photos
      : [
          {
            image: noImage,
          },
        ];

    //filtering slides based on selected color
    if (selectedColor) {
      const filteredSlides = slides.filter(
        (slide) => slide.color_name === selectedColor
      );
      filteredSlides.length && (slides = filteredSlides);
    }

    let colorFlag = "";
    const isFirstItem = (colorName) => {
      if (colorFlag !== colorName) {
        colorFlag = colorName;
        return true;
      }
      return false;
    };

    const handleOpenZoom = (index) => {
      setOpen(true);
      setIndex(index);
    };

    return (
      <>
        {open && (
          <ProductZoomYetAnother
            open={open}
            setIndex={setIndex}
            index={index}
            setOpen={setOpen}
            images={slides}
          />
        )}
        {!isLoading ? (
          <div className="w-full">
            <div className={cn("preview-slider grid relative w-full")}>
              <Swiper
                ref={ref}
                effect={"fade"}
                slidesPerView={1}
                navigation={{
                  prevEl: `.custom_prev_product-preview`,
                  nextEl: `.custom_next_product-preview`,
                }}
                loop={true}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination, Navigation, EffectFade]}
                className="slider-pagination !pb-10 product-preview-slider"
              >
                {slides.map((slide, index) => (
                  <SwiperSlide
                    onClick={() => handleOpenZoom(index)}
                    key={index}
                    className={cn(
                      "w-full slider-img cursor-pointer blur-animation"
                    )}
                  >
                    <div className="h-full w-full">
                      <Image
                        src={slide?.image}
                        alt=""
                        width={524}
                        height={524}
                        className="object-cover h-full w-full"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="slider-arrow">
                <span
                  className={`slider-btn slider-prev slick-arrow custom_prev_product-preview !left-0 !rounded-none !w-[42px] !h-12 !bg-[#0003] !text-white`}
                >
                  <FaChevronLeft size={20} />
                </span>
                <span
                  className={`slider-btn slider-next slick-arrow custom_next_product-preview !right-0 !rounded-none !w-[42px] !h-12 !bg-[#0003] !text-white`}
                >
                  <FaChevronRight size={20} />
                </span>
              </div>
            </div>
          </div>
        ) : (
          <ProductViewSkeleton />
        )}
      </>
    );
  }
);

ProductViewSlider.displayName = "ProductViewSlider";

export default ProductViewSlider;
