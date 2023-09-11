"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSettings, setTranslations } from "@/store/features/commonSlice";

export default function ClientLoader({
  settings: settingsProp,
  translations: translationsProp,
}) {
  const dispatch = useDispatch();
  // console.log(translationsProp);
  // const { translations } = useSelector((state) => state.common);
  // console.log(translations);

  useEffect(() => {
    if (settingsProp) {
      try {
        dispatch(setSettings(settingsProp));
      } catch (error) {
        console.log(error);
      }
    }
    if (translationsProp) {
      try {
        dispatch(setTranslations(translationsProp));
      } catch (error) {
        console.log(error);
      }
    }
  }, [dispatch, settingsProp, translationsProp]);
  return null;
}
