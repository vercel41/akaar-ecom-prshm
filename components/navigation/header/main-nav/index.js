"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "@/store/slices/cartSlice";
import { setLoginModalOpen } from "@/store/slices/authSlice";
import ResponsiveSearch from "./ResponsiveSearch";
import useWishList from "@/hooks/useWishList";
import LanguageSelector from "./LanguageSelector";
import SidebarMenu from "@/components/side-drawers/SidebarMenu";
import { useRouter } from "@/navigation";
import {
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiOutlineUser,
} from "react-icons/hi2";
import { HiMenuAlt1 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { LuSearch, LuUser2 } from "react-icons/lu";
import useHover from "@/hooks/useHover";
import useSticky from "@/hooks/useSticky";
import CategoriesMegaMenu from "../CategoriesMegaMenu";
import { cn } from "@/utils";
import Searchbar from "@/components/side-drawers/Searchbar";
import TopBar from "../TopBar";
import { usePathname } from "next/navigation";

const LoginModal = dynamic(() => import("../../../modals/login/LoginModal"), {
  ssr: false,
});

export default function MainNav({ settings, categories }) {
  const { cart } = useSelector((state) => state.cart);
  const { user, isLoginModalOpen } = useSelector((state) => state.auth);
  const { getWishlistCount } = useWishList();
  const router = useRouter();
  const dispatch = useDispatch();
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [searchbarOpen, setSearchbarOpen] = useState(false);

  const wishlistCount = getWishlistCount();
  const { sticky } = useSticky(150);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "relative shadow-sm md:shadow-none transition-all duration-500 ease-in-out page-header pt-4",
        sticky && "is-sticky py-3"
      )}
      style={{
        backgroundColor: settings?.colors?.primary,
        color: settings?.colors?.primary_text,
      }}
    >
      <div className="main-nav container-fluid">
        <div className="flex items-center justify-end gap-x-2 relative">
          <div
            className={cn(
              "flex-1 w-full flex items-center",
              !sticky && "sm:justify-center sm:-mr-[350px] sm:flex-col"
            )}
          >
            <Link
              href="/"
              className={cn(
                "logo h-[45px] lg:h-[68px] max-w-[150px] lg:max-w-[250px]",
                sticky && "lg:h-[45px] lg:max-w-[200px]"
              )}
            >
              <Image
                src={settings?.logo}
                alt={settings?.name}
                width={200}
                height={68}
                className="h-full w-auto object-contain"
              />
            </Link>
            <div className={cn("", sticky ? "sm:block hidden" : "hidden")}>
              <CategoriesMegaMenu settings={settings} categories={categories} />
            </div>
          </div>

          <div className="header-actions items-center flex gap-2.5 lg:gap-5">
            <ResponsiveSearch settings={settings} />
            <button
              className="sm:inline-flex items-center gap-1.5 hidden text-black hover:opacity-60 transition-all duration-500  text-[1.1rem]"
              onClick={() => setSearchbarOpen(true)}
            >
              <LuSearch size={22} />
              Search
            </button>
            <button
              className="sm:inline-flex hidden items-center gap-1.5 uppercase text-black hover:opacity-60 transition-all duration-500 text-[1.1rem]"
              onClick={() => dispatch(setLoginModalOpen(true))}
            >
              <LuUser2 size={22} />
              Signin
            </button>
            <button
              onClick={() => dispatch(toggleCart())}
              className="group relative single-action hidden lg:block text-black hover:opacity-60 transition-all duration-500"
            >
              <HiOutlineShoppingCart size={24} />
              {cart?.length ? (
                <span
                  className="absolute -right-1 -top-1 border text-[10px] px-1 text-center rounded-full"
                  style={{
                    border: `1px solid ${settings?.colors?.primary_text}`,
                  }}
                >
                  {cart?.length}
                </span>
              ) : null}
            </button>
            {!settings?.guest_checkout ? (
              <>
                <button
                  onClick={() => router.push("/dashboard/my-wishlist")}
                  className="inline-block relative"
                >
                  <HiOutlineHeart size={24} />
                  {wishlistCount ? (
                    <span
                      className="absolute -right-1.5 -top-1.5 border text-[10px] px-1 text-center rounded-full "
                      style={{
                        border: `1px solid ${settings?.colors?.primary_text}`,
                        backgroundColor: settings?.colors?.primary,
                      }}
                    >
                      {wishlistCount}
                    </span>
                  ) : null}
                </button>
                {/* <button onClick={handleModalOpen} className="single-action"> */}
                <button className="single-action">
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
              </>
            ) : null}

            <span className="hidden md:block">
              <LanguageSelector />
            </span>
            <button
              onClick={() => setSideMenuOpen(!sideMenuOpen)}
              className=" md:hidden"
            >
              {!sideMenuOpen ? (
                <HiMenuAlt1 size={24} />
              ) : (
                <AiOutlineClose size={24} />
              )}
            </button>
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
        className={cn(
          "!bg-[#F4EBE2] w-full",
          sticky ? "hidden" : "sm:block hidden mt-4"
        )}
      >
        <CategoriesMegaMenu settings={settings} categories={categories} />
      </div>

      {settings?.offer_massage && pathname !== "/" && (
        <TopBar settings={settings} />
      )}
    </div>
  );
}
