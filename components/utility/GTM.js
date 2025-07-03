"use client";

import { Cookies } from "@/utils/cookies";
import { GoogleTagManager, sendGTMEvent } from "@next/third-parties/google";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function GTM({ gtmId }) {
  const pathname = usePathname();
  const { settings } = useSelector((state) => state.common);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const isGtmEnabled = process.env.NEXT_PUBLIC_GTM_ENABLED === "YES" ;
 
  useEffect(() => {
    const handlePageLoad = () => setIsPageLoaded(true);

    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad);
      return () => window.removeEventListener("load", handlePageLoad);
    }
  }, []);

  const getPayload = () => ({
    event: "page_view",
    page_location: window.location.href,
    page_path: window.location.pathname,
    page_title: document.title,
    fbp: Cookies.get("_fbp"),
    fbc: Cookies.get("_fbc"),
  });

  useEffect(() => {
    if (!isPageLoaded || !gtmId || !isGtmEnabled) return;

    const payload = getPayload();

    sendGTMEvent(payload); // send to GTM client side

  }, [pathname, isPageLoaded, settings, gtmId, isGtmEnabled]);
  return isGtmEnabled && gtmId ? <GoogleTagManager gtmId={gtmId} /> : null;
}