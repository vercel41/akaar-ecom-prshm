"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

export default function ResponsiveMenu({ settings }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerPage = settings?.header_page || {};

  const megaMenuRef = useRef(null);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="header-left flex items-center gap-x-3">
      {!menuOpen ? (
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white md:hidden"
        >
          <HiMenuAlt1 size={24} />
        </button>
      ) : (
        <span className="text-white md:hidden">
          <AiOutlineClose size={24} />
        </span>
      )}
      <Link href="/" className="logo">
        <Image
          src={settings?.logo}
          alt={settings?.name}
          width={150}
          height={56}
          className="h-full w-[100px] object-contain lg:w-auto"
        />
      </Link>
      <div className="nav-menu hidden lg:flex gap-4 items-center">
        {Object.keys(headerPage).map((key) => (
          <Link key={key} href={headerPage[key]}>
            <span className="inline-block h-full text-white hover:text-secondary font-semibold uppercase">
              {key}
            </span>
          </Link>
        ))}
      </div>
      {menuOpen && (
        <div
          ref={megaMenuRef}
          className="absolute z-30 left-0 top-full bg-secondary shadow-lg w-full lg:hidden"
        >
          <div className="container py-8 pl-8">
            <div className="nav-menu flex flex-col gap-4 items-center">
              {Object.keys(headerPage).map((key) => (
                <Link key={key} href={headerPage[key]}>
                  <span className="inline-block h-full text-white hover:text-secondary font-semibold uppercase">
                    {key}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
