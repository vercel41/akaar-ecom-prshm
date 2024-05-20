"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoLogOut } from "react-icons/io5";
import { useParams } from "next/navigation";
import DrawerLeft from "../elements/DrawerLeft";
import CategoriesMenuList from "../navigation/header/main-nav/CategoriesMenuList";
import LanguageSelector from "../navigation/header/main-nav/LanguageSelector";

const SidebarMenu = ({
	sidebarToggle = () => {},
	isSideBarOpen,
	categories,
	settings,
}) => {
	const { locale } = useParams();
	const dispatch = useDispatch();
	const { translations } = useSelector((state) => state.common);

	return (
		<DrawerLeft
			title={"Menu"}
			show={isSideBarOpen}
			className={"w-[70vw]"}
			setShow={sidebarToggle}
			image={settings?.logo}
		>
			{isSideBarOpen && (
				<div className="py-3 text-black">
					<CategoriesMenuList
						setShow={sidebarToggle}
						categoriesList={categories}
					/>
					{/* <div
						className={`flex items-center py-3 px-4 hover:bg-amber-200 rounded-lg w-full font-bold`}
					>
						<button
							className="flex items-center text-primary space-x-2 text-base font-normal"
							onClick={() => alert("Logout")}
						>
							<span className={``}>
								<IoLogOut size={28} />
							</span>
							<span className="font-bold">
								{translations["log-out"] || "Log Out"}
							</span>
						</button>
					</div> */}
					<div className="py-5 px-4 font-bold flex justify-start">
						<LanguageSelector isFullName={true} />
					</div>
				</div>
			)}
		</DrawerLeft>
	);
};

export default SidebarMenu;
