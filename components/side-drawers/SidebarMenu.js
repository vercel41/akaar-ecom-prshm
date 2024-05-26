"use client";
import React from "react";
// import DrawerLeft from "../elements/DrawerLeft";
import CategoriesMenuList from "../navigation/header/main-nav/CategoriesMenuList";
import LanguageSelector from "../navigation/header/main-nav/LanguageSelector";
import DrawerRight from "../elements/DrawerRight";

const SidebarMenu = ({
	sidebarToggle = () => {},
	isSideBarOpen,
	categories,
	settings,
}) => {
	return (
		<DrawerRight
			title={"Menu"}
			show={isSideBarOpen}
			className={"w-[70vw]"}
			setShow={sidebarToggle}
		>
			{isSideBarOpen && (
				<div className="py-3 text-black">
					<CategoriesMenuList
						setShow={sidebarToggle}
						categories={categories?.slice(0, 9)}
					/>
					<div className="py-5 px-4 font-bold flex justify-start">
						<LanguageSelector isFullName={true} />
					</div>
				</div>
			)}
		</DrawerRight>
	);
};

export default SidebarMenu;
