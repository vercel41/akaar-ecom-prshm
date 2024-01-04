"use client";
import React, { useEffect, useRef, useState } from "react";
// import { HiMenuAlt1 } from "react-icons/hi";
import Search from "../../../elements/Search";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { AiOutlineClose } from "react-icons/ai";

export default function ResponsiveSearch() {
	const [searchOpen, setSearchOpen] = useState(false);
	const searchMenuRef = useRef(null);

	const closeMenu = () => {
		setSearchOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				searchMenuRef.current &&
				!searchMenuRef.current.contains(event.target)
			) {
				closeMenu();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<>
			<span className="hidden lg:block">
				<Search />
			</span>
			{!searchOpen ? (
				<button
					onClick={() => setSearchOpen(!searchOpen)}
					className="text-white hover:text-primary lg:hidden"
				>
					<HiMagnifyingGlass size={24} />
				</button>
			) : (
				<span className="text-white hover:text-primary lg:hidden">
					<AiOutlineClose size={24} />
				</span>
			)}

			{searchOpen && (
				<div
					ref={searchMenuRef}
					className="absolute z-30 left-0 top-full bg-[#7573B2]  shadow-lg w-full lg:hidden"
				>
					<div className="container flex justify-center py-8 pl-8">
						<Search />
					</div>
				</div>
			)}
		</>
	);
}
