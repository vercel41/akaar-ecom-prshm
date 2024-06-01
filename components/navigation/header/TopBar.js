"use client";
import React, { useEffect, useState } from "react";

export default function TopBar({ settings }) {
	const [isTopBarHidden, setIsTopBarHidden] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				// Adjust the value based on when you want to hide the top bar
				setIsTopBarHidden(true);
			} else {
				setIsTopBarHidden(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div
			// className={`transition-transform duration-300 ${
			// 	isTopBarHidden ? "-translate-y-full" : "translate-y-0"
			// } py-1.5 text-center bg-[#2B2D42] w-full`}
			className={`${
				isTopBarHidden ? "hidden" : "block"
			} py-1.5 text-center bg-[#2B2D42] w-full`}
			style={{
				background: settings?.colors?.tertiary,
			}}
		>
			<h3
				className="text-white text-sm font-normal tracking-widest"
				style={{ color: settings?.colors?.tertiary_text }}
			>
				{settings?.offer_massage}
			</h3>
		</div>
	);
}
