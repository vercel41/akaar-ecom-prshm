"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import LoginModal from "../modals/login/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "@/store/features/cartSlice";
import AuthUserMenus from "./AuthUserMenus";
import LanguageSelector from "./LanguageSelector";
import { setLoginModalOpen } from "@/store/features/authSlice";

// ** Import Icons
import {
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiOutlineUser,
} from "react-icons/hi2";
import Search from "../elements/Search";
import { HiArrowNarrowRight } from "react-icons/hi";

const Header = ({ children, locale }) => {
  const [scroll, setScroll] = useState(0);
  const { cart } = useSelector((state) => state.cart);
  const { user, isLoginModalOpen } = useSelector((state) => state.auth);
  const { translations } = useSelector((state) => state.common);
  const dispatch = useDispatch();

  //start of popover
  const [userOpen, setUserOpen] = useState(false);
  const popoverRef = useRef(null);

  const togglePopover = () => {
    setUserOpen((prevState) => !prevState);
  };

  const handleModalOpen = () => {
    setUserOpen(false);
    // setShowModal(true);
    dispatch(setLoginModalOpen(true));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setUserOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //end of popover

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const scrollCheck = window.scrollY >= 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    });
  }, [scroll]);

  return (
    <>
      <header className="relative header border-b border-slate-300 py-4">
        <div className="container">
          <div className="header-wrap flex justify-between items-center">
            {/* Nav Items  */}
            {children}
            <div className="header-right flex justify-between items-center gap-6">
              <Search />
              <div className="header-actions flex gap-4">
                <Link href="/dashboard/my-wishlist" className="single-action">
                  <HiOutlineHeart size={24} />
                  {/* <span className="pro-count blue">{totalCompareItems}</span> */}
                </Link>
                <button
                  onClick={() => dispatch(toggleCart())}
                  className="single-action relative"
                >
                  <HiOutlineShoppingCart size={24} />
                  <span className="absolute -right-2 -top-2 bg-red-500 text-white px-2 text-center rounded-full">
                    {cart?.length || 0}
                  </span>
                </button>
                <div className="relative" ref={popoverRef}>
                  <button className="single-action" onClick={togglePopover}>
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
                  {userOpen && !user ? (
                    <div className="absolute right-0 top-0 z-10 mt-14">
                      <div className="relative bg-white px-6 py-8 w-52 border border-slate-300 rounded-lg">
                        <div className="absolute top-0 right-0 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-4 h-4 bg-white border-l border-t border-slate-300"></div>
                        <p className="text-slate-500 text-base font-bold text-center">
                          {translations["login-status"]}
                        </p>
                        <div className="flex justify-center mt-4">
                          <button
                            className="primary-btn px-6"
                            onClick={handleModalOpen}
                          >
                            {translations["log-in"]}
                            <HiArrowNarrowRight />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {/* for authenticated user */}
                  {userOpen && user ? (
                    <AuthUserMenus togglePopover={togglePopover} />
                  ) : null}
                </div>
                <LanguageSelector locale={locale} />
              </div>
            </div>
          </div>
        </div>
      </header>
      {isLoginModalOpen && (
        <LoginModal
          showModal={isLoginModalOpen}
          setShowModal={(show) => dispatch(setLoginModalOpen(show))}
          title={translations["welcome"]}
        />
      )}
    </>
  );
};

export default Header;
