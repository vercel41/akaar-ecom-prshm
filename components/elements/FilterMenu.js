"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { toggleFilterPanel } from "@/store/features/commonSlice";
import { HiOutlineFilter } from "react-icons/hi";

export default function FilterMenu() {
  const dispatch = useDispatch();
  const toggleFilter = () => {
    dispatch(toggleFilterPanel());
  };
  return (
    <div
      className="flex items-center gap-3 w-full h-full bg-slate-50 rounded-xl px-4 py-3 cursor-pointer"
      onClick={toggleFilter}
    >
      <HiOutlineFilter size={20} />
      <span className="text-base text-slate-900">ফিল্টার করুন</span>
    </div>
  );
}
