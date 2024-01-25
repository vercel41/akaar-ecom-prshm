"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Autoplay } from "swiper/modules";
import noImage from "@/public/assets/images/no-image.png";

// ** Import Icon
import { HiOutlineHeart } from "react-icons/hi2";
import useWishList from "@/hooks/useWishList";

const ProductViewSlider = ({ product }) => {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const {
		handleAddToWishlist,
		handleWishListProductStatus,
		handleRemoveFromWishlist,
	} = useWishList();

	//setting default image if no image is provided
	const photos = product?.photos?.length ? product?.photos : [noImage];
	const isInWishlist = handleWishListProductStatus(product?.id);

	return (
		<>
			<div className="slider">
				<div className="thumb-slider">
					<Swiper
						onSwiper={setThumbsSwiper}
						autoplay={{
							delay: 2500,
							disableOnInteraction: false,
						}}
						direction="vertical"
						slidesPerView={"auto"}
						breakpoints={{
							0: {
								direction: "horizontal",
							},
							768: {
								direction: "vertical",
							},
						}}
						modules={[Thumbs, Autoplay]}
					>
						{photos.map((slide, index) => (
							<SwiperSlide key={index}>
								<div className="slider-image cursor-pointer">
									<Image
										src={slide}
										alt=""
										width={64}
										height={64}
										className="border object-contain h-16 w-16 cursor-pointer mb-3"
									/>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>

				<div className="preview-slider grid mx-4 relative border border-slate-200">
					<Swiper
						thumbs={{
							swiper:
								thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
						}}
						direction="horizontal"
						autoplay={{
							delay: 2500,
							disableOnInteraction: false,
						}}
						slidesPerView={1}
						breakpoints={{
							0: {
								direction: "horizontal",
							},
							768: {
								direction: "horizontal",
							},
						}}
						modules={[Thumbs, Autoplay]}
					>
						{photos.map((slide, index) => (
							<SwiperSlide key={index}>
								<div className="slider-imag h-[300px] lg:h-[36rem] w-full lg:w-[32rem]">
									<Image
										src={slide}
										alt=""
										width={524}
										height={524}
										// sizes="100vw"
										className="h-full w-full object-contain rounded-lg"
									/>
									{/* {true && (
                    <Link
                      href="https://www.youtube.com/"
                      target="_blank"
                      className="vid-icon absolute inline-flex justify-center items-center top-1/2 left-1/2 w-[72px] h-[72px] rounded-full drop-shadow-[0_0px_60px_rgba(0,0,0,0.16)] translate-x-[-50%] translate-y-[-50%]"
                    >
                      <HiPlayCircle
                        size={60}
                        className="text-white hover:text-secondary"
                      />
                    </Link>
                  )} */}
								</div>
							</SwiperSlide>
						))}
					</Swiper>
					<div className="product-action absolute top-4 right-5 z-10">
						<button
							aria-label="Add To Wishlist"
							className={`action-btn inline-flex justify-center items-center w-8 h-8 border ${
								isInWishlist
									? "bg-primary text-white"
									: "border-primary bg-white text-primary"
							}`}
							onClick={(e) =>
								!isInWishlist
									? handleAddToWishlist(product?.id)
									: handleRemoveFromWishlist(product?.id)
							}
						>
							<HiOutlineHeart size={18} />
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductViewSlider;
