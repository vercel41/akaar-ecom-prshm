"use client";
import Image from "next/image";
import { forwardRef, useState, useEffect, useRef } from "react";
import noImage from "@/public/assets/images/no-image.png";
import ProductViewSkeleton from "@/components/elements/loaders/ProductViewSkeleton";
import ProductZoomYetAnother from "./ProductZoomYetAnother";
import { useScroll, useTransform } from "framer-motion";
import ImageZoom from "./ImageZoom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Pagination, } from "swiper/modules";

const ProductViewSlider = forwardRef(
  ({ product, selectedColor, isSquareImage, targetRef }, ref) => {
    const enableZoomeImage = process.env.NEXT_PUBLIC_SCALE_ON_HOVER === "YES";
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const imageRefs = useRef([]); // Array of refs for each large image

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    // Setting default image if no image is provided
    let slides = product?.photos?.length
      ? product?.photos
      : [{ image: noImage }];

    // Filtering slides based on selected color
    if (selectedColor) {
      const filteredSlides = slides.filter(
        (slide) => slide.color_name === selectedColor,
      );
      if (filteredSlides.length) slides = filteredSlides;
    }

    const handleOpenZoom = (index) => {
      setOpen(true);
      setIndex(index);
    };

    const handleThumbnailClick = (idx) => {
      setIndex(idx);

      // Scroll to the selected large image smoothly with an offset of -69px
      if (imageRefs.current[idx]) {
        const elementTop =
          imageRefs.current[idx].getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementTop - 115, // Subtract 69px from the element's top position
          behavior: "smooth",
        });
      }
    };
    const [loading, setLoading] = useState(true);

    function getEmbedUrl(videoUrl) {
      // Check for YouTube
      const youtubeMatch = videoUrl.match(
        /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/,
      );
      if (youtubeMatch) {
        return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
      }

      // Check for Google Drive
      const driveMatch = videoUrl.match(
        /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/,
      );
      if (driveMatch) {
        return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
      }

      return null; // unsupported format
    }

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 200);

      return () => clearTimeout(timer);
    }, []);

    // Set up framer-motion's scroll tracking
    const { scrollYProgress } = useScroll({
      target: targetRef,
    });

    // Transform effect on x-axis for a parallax effect
    const x = useTransform(scrollYProgress, [1, 1], ["1%", "1%"]);

    return (
      <div className="md:flex  justify-center items-center ">
        {open && (
          <ProductZoomYetAnother
            open={open}
            setIndex={setIndex}
            index={index}
            setOpen={setOpen}
            images={slides}
          />
        )}

        {!loading ? (
          <div className="flex gap-4 max-h-[600px]  overflow-hidden">
            <div className="thumb-slider hidden md:block">
              <Swiper
                onSwiper={setThumbsSwiper}
                direction="vertical"
                slidesPerView={5}
                spaceBetween={0}
                modules={[Pagination]}
                className="mySwiper"
                watchSlidesProgress={true}
              >
                {slides.map((slide, idx) => (
                  <SwiperSlide key={idx} className="!h-32 !w-24">
                    <div
                      className={`slider-image cursor-pointer w-full h-full border ${
                        idx === index ? "border-blue-400" : "border-slate-100"
                      }`}
                      onClick={() => handleThumbnailClick(idx)}
                    >
                      <Image
                        src={slide?.image}
                        alt={`Thumbnail ${idx}`}
                        width={96}
                        height={96}
                        className="w-full h-full p-1 object-cover object-top"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="preview-slider grid  w-[450px] mx-auto relative">
              <Swiper
                preventClicks={false}
                preventClicksPropagation={false}
                ref={ref}
                // className={`product-preview-slider [&_.swiper-wrapper]:pb-3 lg:[&_.swiper-wrapper]:pb-0 lg:border border-slate-300 ${
                //   shortDetails && "md:!w-[25rem]"
                // }`}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                direction="horizontal"
                slidesPerView={1}
                pagination={{
                  clickable: true,
                  dynamicMainBullets: 3,
                  dynamicBullets: true,
                }}
                breakpoints={{
                  0: {
                    direction: "horizontal",
                    pagination: { clickable: true },
                  },
                  768: {
                    direction: "horizontal",
                    pagination: false,
                  },
                }}
                modules={[Thumbs, Pagination]}
              >
                {slides.map((slide, idx) => {
                  const isVideoSlide = idx === 0 && !!slide?.video_link;
                  return (
                    <SwiperSlide
                      className="max-w-[450px] overflow-hidden"
                      key={idx}
                      // className={!h-[107vw] ${
                      //   shortDetails ? "md:!h-[28.75rem]" : "md:!h-[47rem]"
                      // } md:!w-full}
                    >
                      <div className="slider-image aspect-[3/4] h-full w-full relative group flex justify-center items-center rounded-md">
                        {isVideoSlide ? (
                          <>
                            <iframe
                              src={getEmbedUrl(slide.video_link)}
                              width="100%"
                              height="100%"
                              className=""
                              allow="autoplay; encrypted-media"
                              allowFullScreen
                            />
                          </>
                        ) : enableZoomeImage ? (
                          <ImageZoom
                            image={slide?.image}
                            zoomImage={slide?.image}
                            isSquareImage={isSquareImage}
                          />
                        ) : (
                          <div className="h-full w-full">
                            
                            <Image
                              onClick={() => handleOpenZoom(idx)}
                              src={slide?.image}
                              alt={"Slider image"}
                              width={600}
                              height={750}
                              className=" h-full w-full "
                            />
                          </div>
                        )}
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>

            {/* Thumbnail Slider */}
          </div>
        ) : (
          <ProductViewSkeleton />
        )}
      </div>
    );
  },
);

ProductViewSlider.displayName = "ProductViewSlider";

export default ProductViewSlider;
