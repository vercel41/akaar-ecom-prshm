"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "@/store/slices/cartSlice";
import { setLoginModalOpen } from "@/store/slices/authSlice";
import ResponsiveSearch from "./ResponsiveSearch";
import SidebarMenu from "@/components/side-drawers/SidebarMenu";
import { useRouter } from "@/navigation";
import { HiOutlineUser } from "react-icons/hi2";
import { HiMenuAlt1 } from "react-icons/hi";
import { AiOutlineClose, AiOutlineShopping } from "react-icons/ai";
import { LuUser2 } from "react-icons/lu";
import useHover from "@/hooks/useHover";
import useSticky from "@/hooks/useSticky";
import CategoriesMegaMenu from "../CategoriesMegaMenu";
import { cn } from "@/utils";
import Searchbar from "@/components/side-drawers/Searchbar";
import TopBar from "../TopBar";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { IoSearchOutline } from "react-icons/io5";

const LoginModal = dynamic(() => import("../../../modals/login/LoginModal"), {
  ssr: false,
});

export default function MainNav({ settings, categories }) {
  const { cart } = useSelector((state) => state.cart);
  const isMobile = useMediaQuery("(max-width: 768px)"); // checking for mobile
  const { user, isLoginModalOpen } = useSelector((state) => state.auth);
  // const { getWishlistCount } = useWishList();
  const router = useRouter();
  const dispatch = useDispatch();
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [searchbarOpen, setSearchbarOpen] = useState(false);

  // const wishlistCount = getWishlistCount();
  const { sticky } = useSticky(20);
  const pathname = usePathname();
  const isHomePage = pathname !== "/"; // Check if the current route is the home page

  const handleModalOpen = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      dispatch(setLoginModalOpen(true));
    }
  };

  // Mobile and home page logo source
  const logoSrc = isMobile || isHomePage  ? settings?.logo : settings?.footer_logo
  
  // console.log(settings)
  return (
    <div
      // style={{
      //   backgroundColor: sticky
      //     ? settings?.colors?.secondary
      //     : ``,
      //   color: settings?.colors?.secondary_text,
      // }}
      className={cn(
        "relative transition-all duration-500 ease-in-out page-header",
        sticky && "is-sticky shadow-[0_-3px_6px_#000]"
      )}
    >
      <div
        className={cn(
          "main-nav container-fluid px-5  ",
          sticky ? "py-3 bg-white" : "p-2.5"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-end gap-x-5 relative ",
            !sticky && "sm:h-[100px] h-[50px]"
          )}
        >
          <button
            onClick={() => setSideMenuOpen(!sideMenuOpen)}
            className="md:hidden"
          >
            {!sideMenuOpen ? (
              <HiMenuAlt1 size={24} />
            ) : (
              <AiOutlineClose size={24} />
            )}
          </button>
          <ResponsiveSearch settings={settings} />

          <div
            className={cn(
              "flex-1 gap-4 w-full flex items-center ",
              !sticky && "sm:justify-center sm:flex-col"
            )}
          >
            {sticky ? (
              <Link
                href="/"
                className={cn(
                  "logo h-[45px] lg:h-[80px] max-w-[150px] lg:max-w-[250px] sm:mx-0 mx-auto",
                  sticky && "lg:h-[45px] lg:max-w-[200px]"
                )}
              >
                {
                  settings?.logo ? <Image
                    src={settings?.logo}
                    alt={settings?.name}
                    width={200}
                    height={68}
                    className="h-full w-auto object-contain"
                  /> : <span className="font-bold">{settings?.name}</span>
                }
                
              </Link>
            ) : (
              <Link
                href="/"
                className={cn(
                  "logo h-[55px] lg:h-[80px] max-w-[150px] lg:max-w-[250px] absolute left-1/2 -translate-x-1/2",
                  sticky && "lg:h-[45px] lg:max-w-[200px]"
                )}
              >
                {
                  logoSrc ? <Image
                    src={logoSrc }
                    alt={settings?.name}
                    width={200}
                    height={68}
                    className="h-full w-auto object-contain"
                  /> : <span className="font-bold">{settings?.name}</span>
                }
                
              </Link>
            )}
            <div className={cn("", sticky ? "sm:block hidden" : "hidden ")}>
              <CategoriesMegaMenu
                settings={settings}
                categories={categories}
                sticky={sticky}
              />
            </div>
          </div>

          <div className="header-actions items-center flex gap-2.5 lg:gap-3 ">
            <button
              className={`sm:inline-flex items-center gap-1.5 hidden ${
                sticky || isHomePage ? "text-black" : "text-white"
              } hover:opacity-60 transition-all duration-500  text-[1.1rem] font-noto_serif`}
              onClick={() => setSearchbarOpen(true)}
            >
              <IoSearchOutline size={24} />
            </button>

            {!settings?.guest_checkout && (
              <>
                {!user ? (
                  <button
                    className={`sm:inline-flex hidden items-center gap-1.5 uppercase ${
                      sticky || isHomePage ? "text-black" : "text-white"
                    } hover:opacity-60 transition-all duration-500 text-[1.1rem] font-noto_serif`}
                    onClick={() => dispatch(setLoginModalOpen(true))}
                  >
                    <LuUser2 size={22} />
                    Sign in
                  </button>
                ) : (
                  <button onClick={handleModalOpen} className="single-action">
                    {user?.image ? (
                      <Image
                        src={user.image}
                        alt="Profile"
                        height={32}
                        width={32}
                        className="h-full w-full rounded-full"
                      />
                    ) : (
                      <HiOutlineUser size={24} />
                    )}
                  </button>
                )}
              </>
            )}
            <button
              onClick={() => dispatch(toggleCart())}
              className={`group relative single-action hidden lg:block text-black  transition-all duration-500 ${
                sticky || isHomePage ? "text-black" : "text-white"
              }`}
            >
              <AiOutlineShopping size={26} />

              {cart?.length > 0 && (
                <p
                  className={`${
                    sticky || isHomePage
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  } absolute top-1.5 right-1 w-[18px] h-[18px] text-[11px] flex items-center justify-center rounded-full leading-none`}
                  style={{
                    border: `1px solid ${settings?.colors?.primary_text}`,
                  }}
                >
                  {cart?.length}
                </p>
              )}
            </button>
            {/* {settings?.guest_checkout ? (
              <>
                <button
                  onClick={() => router.push("/dashboard/my-wishlist")}
                  className="inline-block relative"
                >
                  <HiOutlineHeart size={24} />
                  {wishlistCount && (
                    <span
                      className="absolute -right-1.5 -top-1.5 border text-[10px] px-1 text-center rounded-full "
                      style={{
                        border: `1px solid ${settings?.colors?.primary_text}`,
                        backgroundColor: settings?.colors?.primary,
                      }}
                    >
                      {wishlistCount}
                    </span>
                  )}
                </button>
                
              </>
            ) : null} */}

            <button
              onClick={() => dispatch(toggleCart())}
              className="group relative single-action block lg:hidden text-black hover:opacity-60 transition-all duration-500"
            >
              <AiOutlineShopping size={26} />
              {cart?.length > 0 && (
                <p
                  className={`absolute top-1.5 right-1 ${
                    sticky || isHomePage
                      ? "bg-black text-white "
                      : "bg-black text-white"
                  } w-[18px] h-[18px] text-[12px] flex items-center justify-center rounded-full`}
                  style={{
                    border: `1px solid ${settings?.colors?.primary_text}`,
                  }}
                >
                  {cart?.length}
                </p>
              )}
            </button>

            {/* <span className="hidden md:block">
              <LanguageSelector />
            </span> */}
          </div>
        </div>
      </div>
      {isLoginModalOpen && (
        <LoginModal
          showModal={isLoginModalOpen}
          setShowModal={(show) => dispatch(setLoginModalOpen(show))}
          title={"welcome"}
        />
      )}
      {sideMenuOpen && (
        <SidebarMenu
          categories={categories}
          sidebarToggle={() => setSideMenuOpen(!sideMenuOpen)}
          isSideBarOpen={sideMenuOpen}
          settings={settings}
        />
      )}
      <Searchbar
        closeSearchbar={() => setSearchbarOpen(false)}
        isSearchbarOpen={searchbarOpen}
      />
      <div
        style={{
          // backgroundColor: `${settings?.colors?.secondary}CC`,
          color: settings?.colors?.secondary_text,
        }}
        className={cn("w-full", sticky ? "hidden" : "sm:block hidden")}
      >
        <CategoriesMegaMenu settings={settings} categories={categories} />
      </div>

      {settings?.offer_massage && pathname !== "/" && (
        <TopBar settings={settings} />
      )}
    </div>
  );
}
