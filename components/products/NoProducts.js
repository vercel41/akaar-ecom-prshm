"use client";
import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { BsFillTelephoneFill } from "react-icons/bs";
const Lottie = dynamic(() => import("lottie-react"));
import notFound from "@/public/assets/lottie/not-found.json";

export default function NoProducts() {
  return (
    <div className="container">
      <div className="content flex flex-col items-center py-28">
        <div className="h-[311px] w-[340px] mb-12">
          <Lottie animationData={notFound} loop={false} />
        </div>
        <h2 className="text-3xl font-bold font-title text-slate-900">
          দুঃখিত, কোন প্রাডাক্ট পাওয়া যায় নি
        </h2>
        <p className="text-lg text-slate-600 mt-6 mb-8">
          আমরা আপনার অনুসন্ধান এর সাথে কোনো মিল খুঁজে পাচ্ছি না
        </p>
        <Link
          href="/"
          className="inline-block font-semibold text-white bg-primary rounded-lg px-8 py-3"
        >
          হোমে ফিরে যান
        </Link>
      </div>
      <div className="contact pb-12 text-center">
        <p className="flex justify-center items-center gap-5 bg-amber-200 border border-primary rounded-xl p-4">
          <span className="text-xl font-bold font-title text-slate-900">
            যে কোন জিজ্ঞাসা বা অর্ডার করতে আমাদের কল করুন:
          </span>{" "}
          <Link
            href="tel:01720060958"
            className="text-xl font-bold font-title text-primary"
          >
            <BsFillTelephoneFill /> 01720060958
          </Link>
        </p>
      </div>
    </div>
  );
}
