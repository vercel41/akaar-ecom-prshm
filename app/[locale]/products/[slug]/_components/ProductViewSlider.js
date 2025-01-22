"use client";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { forwardRef, useState, useEffect, useRef } from "react";
import noImage from "@/public/assets/images/no-image.png";
import ProductViewSkeleton from "@/components/elements/loaders/ProductViewSkeleton";
import ProductZoomYetAnother from "./ProductZoomYetAnother";
import { cn } from "@/utils";
import { useScroll, motion, useTransform } from "framer-motion";

const ProductViewSlider = forwardRef(
  ({ product, selectedColor, isSquareImage, isLoading, targetRef }, ref) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const imageRefs = useRef([]); // Array of refs for each large image
    const mainImageContainerRef = useRef(null); // Ref for the main image container

    // Setting default image if no image is provided
    let slides = product?.photos?.length
      ? product?.photos
      : [{ image: noImage }];

    // Filtering slides based on selected color
    if (selectedColor) {
      const filteredSlides = slides.filter(
        (slide) => slide.color_name === selectedColor
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

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 200);

      return () => clearTimeout(timer);
    }, []);

    // Function to handle global scroll event
    // const handleGlobalScroll = (event) => {
    //   if (mainImageContainerRef.current) {
    //     const scrollAmount = event.deltaY;
    //     mainImageContainerRef.current.scrollBy({
    //       top: scrollAmount,
    //       behavior: "smooth",
    //     });
    //   }
    // };

    // Attaching the global scroll event listener
    // useEffect(() => {
    //   window.addEventListener("wheel", handleGlobalScroll, { passive: true });

    //   // Cleanup listener on unmount
    //   return () => {
    //     window.removeEventListener("wheel", handleGlobalScroll);
    //   };
    // }, []);

    // Set up framer-motion's scroll tracking
    const { scrollYProgress } = useScroll({
      target: targetRef,
    });

    // Transform effect on x-axis for a parallax effect
    const x = useTransform(scrollYProgress, [1, 1], ["1%", "1%"]);

    return (
      <div className="flex w-full">
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
          <>
            {/* Left Side Thumbnail List (Fixed) */}
            <div className="mr-7">
              <div className="flex flex-col gap-4 sticky top-[80px]">
                {slides.map((slide, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "md:w-18 w-28 md:h-28 h-32 border-2 cursor-pointer",
                      idx === index ? "border-blue-500" : "border-gray-300"
                    )}
                    onClick={() => handleThumbnailClick(idx)}
                  >
                    <Image
                      src={slide?.image || noImage}
                      alt={`Thumbnail ${idx}`}
                      width={64}
                      height={64}
                      className="object-cover h-full w-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Main Image Preview (Scrollable with hidden scrollbar) */}
            <div className="flex-1 h-full px-4">
              {slides.map((slide, idx) => (
                <motion.div
                  style={{ x }}
                  key={idx}
                  className="mb-8 cursor-pointer"
                  onClick={() => handleOpenZoom(idx)}
                  ref={(el) => (imageRefs.current[idx] = el)} // Assign ref to each image container
                >
                  <Image
                    src={slide?.image || noImage}
                    alt={`Image ${idx}`}
                    width={624}
                    height={624}
                    className="object-cover w-full"
                  />
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <ProductViewSkeleton />
        )}
      </div>
    );
  }
);

ProductViewSlider.displayName = "ProductViewSlider";

export default ProductViewSlider;
