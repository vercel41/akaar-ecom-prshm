"use client";
import React from "react";
import { useSelector } from "react-redux";
import Filter from "../filters/Filter";

export default function FilterMenu({ category }) {
  const { isFilterPanelOpen } = useSelector((state) => state.common);
  if (!isFilterPanelOpen) return null;
  return <Filter category={category} />;
}
