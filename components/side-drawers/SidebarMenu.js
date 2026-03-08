"use client";
import React from "react";
// import DrawerLeft from "../elements/DrawerLeft";
import CategoriesMenuList from "../navigation/header/main-nav/CategoriesMenuList";
import LanguageSelector from "../navigation/header/main-nav/LanguageSelector";
import DrawerRight from "../elements/DrawerRight";
import Link from "next/link";
import Image from "next/image";

const SidebarMenu = ({
  sidebarToggle = () => {},
  isSideBarOpen,
  categories,
  settings,
}) => {
  return (
    <DrawerRight
      title={""}
      show={isSideBarOpen}
      className={"w-[70vw]"}
      setShow={sidebarToggle}
    >
      <Link href="/" className="logo flex justify-center">
      {
        settings?.logo ?  <Image
            src={settings?.logo}
            alt={settings?.name}
            width={150}
            height={56}
            className="h-full max-h-[75px] py-2 object-contain lg:w-auto"
          /> : <span className="font-bold text-lg">{settings?.name}</span>
      }
       
      </Link>
      {isSideBarOpen && (
        <div className="py-3 text-black">
          <CategoriesMenuList
            setShow={sidebarToggle}
            categories={categories?.slice(0, 9)}
          />
          {/* <div className="py-5 px-4 font-bold flex justify-start">
						<LanguageSelector isFullName={true} />
					</div> */}
        </div>
      )}
    </DrawerRight>
  );
};

export default SidebarMenu;
