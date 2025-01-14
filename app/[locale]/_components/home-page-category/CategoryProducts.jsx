"use client";

import ProductCard from "@/components/cards/ProductCard";
import VideoPlayer from "@/components/elements/VideoPlayer";
import { cn } from "@/utils";
import { useTransform, useScroll, motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
// import BackgroundVideo from "../CustomizedVideoPlayer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Video from 'next-video';
const backgroundVideo = "/assets/videos/backgroundvidoe.mp4";
import BackgroundVideo from 'next-video/background-video';


const CategoryProducts = async ({ products, vdo_file, index, images }) => {
  console.log(images, "images");
  const targetRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)"); // checking for mobile

  // Set up framer-motion's scroll tracking
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Transform effect on x-axis for a parallax effect
  const x = useTransform(scrollYProgress, [1, 1], ["1%", "1%"]);

  return (
    <div ref={targetRef} className="container-fluid">
      <div
        className={`grid md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 gap-7 mb-4`}
      >
        {/* Left Image Section - Sticky */}
        <div className="md:sticky top-0 md:h-screen">
          {/* <VideoPlayer
            url={vdo_file}
            className={`h-full w-full !object-cover object-center `}
          /> */}
          <BackgroundVideo  height={`${isMobile ? "70vh" : "100vh"}`} src={backgroundVideo} />
{/*           <BackgroundVideo
            videoLink={vdo_file}
            height={`${isMobile ? "26vh" : "100vh"}`}
            // style={{ border: "5px solid #ccc" }}
            placeholderImage={images[0]}

            imageHeight={`${isMobile ? "26vh" : "100vh"}`}

          /> */}

          {/*           <video
            className={"!h-full !w-full !object-cover !object-center"}
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src={vdo_file}
              // src={settings?.vdo_file}
              type="video/mp4"
            />
          </video> */}
          {/* <Image
            src="https://purusham.com/cdn/shop/files/Slider_Image_1_2000x.png?v=1730207421"
            alt="slider"
            width={1000}
            height={1000}
            className="h-full w-full object-cover object-center"
          /> */}
        </div>

        {/* Right Product List Section */}

        <motion.div
          style={{ x }}
          className={cn(
            `grid grid-cols-2 gap-7`,
            index % 2 === 0 ? "md:order-last" : "md:order-first"
          )}
        >
          {products?.map((product, i) => (
            <div key={i}>
              <ProductCard product={product} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryProducts;
