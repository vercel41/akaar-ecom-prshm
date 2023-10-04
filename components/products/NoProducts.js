"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import noItemsImage from "@/public/assets/images/product-not-found.png";

export default function NoProducts() {
  return (
    <div className="container">
      <div className="content flex flex-col items-center py-28 text-center">
        <div className="h-[216px] w-[216px]">
          <Image
            src={noItemsImage}
            alt="No-Items-Image"
            height={216}
            width={216}
            className="h-[216px]"
          />
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold font-title text-primary">
          Sorry, no products were found
        </h2>
        <p className=" lg:text-lg text-slate-600 mt-4 mb-5">
          We could not find any matches for your search
        </p>
        <Link
          href="/"
          className="inline-block  text-white bg-primary px-8 py-3"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
