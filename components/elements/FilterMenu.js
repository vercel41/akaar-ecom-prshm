"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFilterPanel } from "@/store/slices/commonSlice";
// import { HiOutlineFilter } from "react-icons/hi";
import { BsFilterSquare } from "react-icons/bs";

export default function FilterMenu() {
	const { translations } = useSelector((state) => state.common);
	const dispatch = useDispatch();
	const toggleFilter = () => {
		dispatch(toggleFilterPanel());
	};
	return (
		<div
			className="flex items-center gap-3 w-full h-full cursor-pointer hover:text-secondary"
			onClick={toggleFilter}
		>
			<BsFilterSquare size={24} />
			<span className="text-base">{translations["filter"] || "Filter"}</span>
		</div>
	);
}
