"use client";

import { fetchData } from "@/lib/fetch-data";
// import ProductSlider from "@/components/ProductSlider";
import ProductCard from "@/components/cards/ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import Image from "next/image";
import noImage from "@/public/assets/images/no-image.png";
import Link from "next/link";

const NewArrival = async ({ products }) => {
  // console.log(products);
  const ref = useRef(null);

  return (
    <>
      {/* Slider view  */}

      <div>
        <div className="md:container container-fluid">
          <div className="max-w-[1220px] mx-auto relative">
            <div>
              <Swiper
                ref={ref}
                slidesPerView={1}
                navigation={{
                  prevEl: `.custom_prev_new_arrival`,
                  nextEl: `.custom_next_new_arrival`,
                }}
                loop={true}
                speed={800}
                breakpoints={{
                  0: {
                    slidesPerView: 1.1,
                    spaceBetween: 15,
                  },

                  768: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                  },
                }}
                centeredSlides={true}
                modules={[Navigation]}
                className=""
              >
                {products.map((product, index) => (
                  <SwiperSlide key={index}>
                    <div className="grid md:grid-cols-2 items-center max-w-4xl mx-auto">
                      <div className="md:w-[480px] w-full md:aspect-[0.8227848101265823] md:block hidden">
                        <Image
                          className="w-full h-full object-contain object-top"
                          src={
                            product?.hover_image
                              ? product?.hover_image
                              : product?.image || noImage
                          }
                          alt={product?.name}
                          width={400}
                          height={400}
                        />
                      </div>
                      <div className="flex justify-center">
                        <div className="md:max-w-[270px] w-full">
                          <div className="md:px-2.5">
                            <ProductCard product={product} />
                          </div>
                          <Link
                            href={`/products/${product?.slug}`}
                            className="bg-primary py-3 px-2.5 w-full text-white text-[.8rem] text-center active:scale-95 font-semibold uppercase tracking-[.2rem] md:block hidden"
                          >
                            <span>View this product</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <Link
                href={`/products`}
                className="bg-primary py-3 px-2.5 md:w-full text-white text-[.8rem] text-center active:scale-95 font-semibold uppercase tracking-[.2rem] block mt-8 md:hidden w-[90%] mx-auto"
              >
                <span>View Products</span>
              </Link>
              <div className="slider-arrow">
                <span
                  className={`slider-btn slider-prev slick-arrow custom_prev_new_arrival !left-0 !rounded-none !w-[42px] !h-12 !bg-[#0003] !text-white`}
                >
                  <FaChevronLeft size={20} />
                </span>
                <span
                  className={`slider-btn slider-next slick-arrow custom_next_new_arrival !right-0 !rounded-none !w-[42px] !h-12 !bg-[#0003] !text-white`}
                >
                  <FaChevronRight size={20} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewArrival;
