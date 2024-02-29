"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DrawerLeft from "../elements/DrawerLeft";
import { toggleFilterPanel } from "@/store/slices/commonSlice";
import Filter from "../filters/Filter";

const FilterPanel = ({ category }) => {
	//Drawer logics
	const dispatch = useDispatch();
	const { isFilterPanelOpen } = useSelector((state) => state.common);
	const closeFilterPanel = () => {
		dispatch(toggleFilterPanel());
	};

	return (
		<DrawerLeft
			title={`ফিল্টার করুন`}
			show={isFilterPanelOpen}
			setShow={closeFilterPanel}
		>
			<div className="p-4 flex flex-col h-[77%]">
				{isFilterPanelOpen && <Filter category={category} />}
			</div>
		</DrawerLeft>
	);
};

export default FilterPanel;
