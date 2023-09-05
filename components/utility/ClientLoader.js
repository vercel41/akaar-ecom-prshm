"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSettings } from "@/store/features/commonSlice";

export default function ClientLoader({ settings: settingsProp }) {
  // console.log(settingsProp);
  // const { settings } = useSelector((state) => state.common);
  // console.log(settings);
  const dispatch = useDispatch();
  useEffect(() => {
    if (settingsProp) {
      try {
        dispatch(setSettings(settingsProp));
      } catch (error) {
        console.log(error);
      }
    }
  }, [dispatch, settingsProp]);
  return null;
}
