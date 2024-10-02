"use client";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { forwardRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Pagination, Navigation } from "swiper/modules";
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

const MotionDiv = dynamic(() =>
  import("framer-motion").then((mod) => mod.motion.div)
);

const ProductViewSlider = forwardRef(
  ({ product, selectedColor, isSquareImage }, ref) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const isMobile = useMediaQuery("(max-width: 768px)");
    const {
      handleAddToWishlist,
      handleWishListProductStatus,
      handleRemoveFromWishlist,
    } = useWishList(); //custom hook for reusing

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

    const revealVariant = {
      hidden: { filter: "blur(8px)", opacity: 0 },
      visible: {
        filter: "blur(0px)",
        opacity: 1,
        transition: { duration: 1.2, ease: "easeOut" },
      },
    };

    return (
      <>
        <div className="w-full">
          <div className={cn("preview-slider grid relative w-full")}>
            <Swiper
              ref={ref}
              className="product-preview-slider [&_.swiper-wrapper]:pb-3 lg:[&_.swiper-wrapper]:pb-0 slider-pagination"
              slidesPerView={1}
              pagination={{
                clickable: true,
              }}
              navigation={{
                prevEl: `.custom_prev_product-preview`,
                nextEl: `.custom_next_product-preview`,
              }}
              loop={true}
              modules={[Pagination, Navigation]}
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index} className={cn("w-full")}>
                  <MotionDiv
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.2 }}
                    variants={revealVariant}
                    className="slider-imag h-full w-full"
                  >
                    {/* {(isFirstItem(slide?.color_name) || index === 0) && ( */}
                    <Image
                      src={slide?.image}
                      alt=""
                      width={524}
                      height={524}
                      className="object-cover h-full w-full"
                    />
                    {/* )} */}
                  </MotionDiv>
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
      </>
    );
  }
);

ProductViewSlider.displayName = "ProductViewSlider";

export default ProductViewSlider;
