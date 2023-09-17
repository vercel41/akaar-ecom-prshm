"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import LoginModal from "../modals/login/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "@/store/features/cartSlice";
import { setLoginModalOpen } from "@/store/features/authSlice";

// ** Import Icons
import {
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiOutlineUser,
} from "react-icons/hi2";
import ResponsiveSearch from "./ResponsiveSearch";
import ResponsiveMenu from "./ResponsiveMenu";

export default function MainNav({ settings }) {
  const [scroll, setScroll] = useState(0);
  const { cart } = useSelector((state) => state.cart);
  const { user, isLoginModalOpen } = useSelector((state) => state.auth);
  // const { translations } = useSelector((state) => state.common);
  const dispatch = useDispatch();

  const handleModalOpen = () => {
    if (user) return;
    dispatch(setLoginModalOpen(true));
  };

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const scrollCheck = window.scrollY >= 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    });
  }, [scroll]);
  return (
    <div className="relative bg-secondary">
      <div className="main-nav container py-3 lg:py-1">
        <div className="header-wrap flex justify-between items-center">
          {/* Nav Items  */}
          <ResponsiveMenu settings={settings} />
          <div className="header-right flex justify-between items-center gap-6">
            <ResponsiveSearch />
            <div className="header-actions flex gap-4">
              <div className="text-white hover:text-primary">
                <button onClick={handleModalOpen}>
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt="Profile"
                      height={40}
                      width={40}
                      className="h-10 w-10 rounded-full"
                    />
                  ) : (
                    <HiOutlineUser size={24} />
                  )}
                </button>
              </div>
              <Link
                href="/dashboard/my-wishlist"
                className="text-white hover:text-primary"
              >
                <HiOutlineHeart size={24} />
                {/* <span className="pro-count blue">{totalCompareItems}</span> */}
              </Link>
              <button
                onClick={() => dispatch(toggleCart())}
                className="relative text-white hover:text-primary"
              >
                <HiOutlineShoppingCart size={24} />
                <span className="absolute -right-3 -top-3 border border-white text-white hover:text-primary text-xs px-1 text-center rounded-full">
                  {cart?.length || 0}
                </span>
              </button>
            </div>
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
    </div>
  );
}
