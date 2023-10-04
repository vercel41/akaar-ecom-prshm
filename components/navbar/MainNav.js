"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "@/store/features/cartSlice";
import { setLoginModalOpen } from "@/store/features/authSlice";
const LoginModal = dynamic(() => import("../modals/login/LoginModal"), {
  ssr: false,
});

// ** Import Icons
import {
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiOutlineUser,
} from "react-icons/hi2";
import ResponsiveSearch from "./ResponsiveSearch";
import ResponsiveMenu from "./ResponsiveMenu";
import { useRouter } from "next/navigation";

export default function MainNav({ settings, categories }) {
  const [scroll, setScroll] = useState(0);
  const { cart } = useSelector((state) => state.cart);
  const { user, isLoginModalOpen } = useSelector((state) => state.auth);
  // const { translations } = useSelector((state) => state.common);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleModalOpen = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      dispatch(setLoginModalOpen(true));
    }
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
    <div className="relative bg-[#7573B2] py-2 lg:py-0">
      <div className="main-nav container">
        <div className="header-wrap flex justify-between items-center">
          {/* Nav Items  */}
          <ResponsiveMenu settings={settings} categories={categories} />
          <div className="header-right flex justify-between items-center gap-6">
            <ResponsiveSearch />
            <div className="header-actions flex gap-4">
              <button
                onClick={handleModalOpen}
                className="text-white hover:text-primary"
              >
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt="Profile"
                    height={32}
                    width={32}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <HiOutlineUser size={24} />
                )}
              </button>
              <button
                onClick={() => router.push("/dashboard/my-wishlist")}
                className="inline-block text-white hover:text-primary"
              >
                <HiOutlineHeart size={24} />
              </button>
              <button
                onClick={() => dispatch(toggleCart())}
                className="group relative text-white hover:text-primary"
              >
                <HiOutlineShoppingCart size={24} />
                <span className="absolute -right-2 -top-2 border border-white group-hover:border-primary text-white group-hover:text-primary text-[10px] px-1 text-center rounded-full">
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
