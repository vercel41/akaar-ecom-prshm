"use client";

import { useSelector } from "react-redux";
import LoaderOverlay from "@/components/elements/loaders/LoaderOverlay";

// this will apply overlay loader for full screen
const GlobalLoader = () => {
  const { isGlobalLoading } = useSelector((state) => state.common);
  // console.log(isGlobalLoading);
  if (isGlobalLoading) return <LoaderOverlay />;
  return null;
};

export default GlobalLoader;
