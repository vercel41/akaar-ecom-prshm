"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { toggleFilterPanel } from "@/store/features/commonSlice";
// import { HiOutlineFilter } from "react-icons/hi";
import { BsFilterSquare } from "react-icons/bs";

export default function FilterAction() {
  const dispatch = useDispatch();
  const toggleFilter = () => {
    dispatch(toggleFilterPanel());
  };
  return (
    <div
      className="flex items-center gap-3 w-full h-full cursor-pointer hover:text-primary"
      onClick={toggleFilter}
    >
      <BsFilterSquare size={24} />
      <span className="text-base">Filter</span>
    </div>
  );
}
