"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

// ** Import Iocns
import { HiChevronRight } from "react-icons/hi2";

const IntroSlider = ({ sliders, settings }) => {
	const isBackdrop = (slide) =>
		!!(slide?.title || slide?.title_2 || slide?.text || slide?.url);

	return (
		<>
			<Swiper
				modules={[Pagination, Autoplay, EffectFade]}
				slidesPerView={1}
				spaceBetween={0}
				loop={true}
				pagination={{ clickable: true }}
				className="hero-slider"
				autoplay={{ delay: 3000 }}
				effect="fade"
				speed={1200}
			>
				{sliders.map((slide, i) => (
					<SwiperSlide key={i}>
						<div
							className="single-hero-slider px-3 lg:px-12 md:py-10 text-center flex justify-center items-center h-[180px] md:h-[320px] lg:h-[95vh] bg-no-repeat bg-cover bg-center"
							style={{
								backgroundImage: slide?.image
									? `url(${slide?.image})`
									: `/assets/images/banner/banner-1.png`,
							}}
						>
							<div className="">
								<div
									className={`hero-slider-content ${
										isBackdrop(slide) ? "backdrop-blur-sm" : ""
									} p-4 lg:px-12 py-6`}
								>
									{slide?.title && (
										<p className="text-sm lg:text-lg/[24px] font-normal font-body text-white lg:mb-4">
											{slide?.title}
										</p>
									)}
									{slide?.title_2 && (
										<h1 className="text-xl lg:text-5xl font-bold font-title text-white">
											{slide?.title_2}
										</h1>
									)}
									{slide?.text && (
										<h2 className="text-lg lg:text-4xl/[48px] font-bold font-title text-white mb-2 lg:my-5">
											{slide?.text}
										</h2>
									)}
									{slide?.url && (
										<Link
											href={slide?.url}
											className="inline-block px-4 text-center leading-[40px]"
											style={{
												backgroundColor: settings?.colors?.primary,
												color: "white",
											}}
										>
											See All{" "}
											<HiChevronRight size={20} className="inline align-sub" />
										</Link>
									)}
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
};

export default IntroSlider;
