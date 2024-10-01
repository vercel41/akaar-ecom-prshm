// "use client";
import Image from "next/image";
import Link from "next/link";
import { fetchData } from "@/lib/fetch-data";
import noImage from "@/public/assets/images/no-image.png";
import CategorySlider from "@/components/CategorySlider";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import CategoryBanner from "./CategoryBanner";

// ** Import Iocns
const CategoryBanners = async ({ settings }) => {
  const [transRes] = await Promise.allSettled([
    fetchData({ api: "translations" }),
  ]);
  const translations =
    transRes.status === "fulfilled" ? transRes.value?.data || {} : {};
  const { data: cBanners = [] } = await fetchData({ api: "banners" });

  if (!cBanners?.length) return null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        {cBanners
          .filter((item) => item.sort_index > 1)
          .map((banner) => (
            <CategoryBanner
              banner={banner}
              settings={settings}
              key={banner.id}
            />
          ))}
      </div>

      <div className="relative">
        <CategorySlider
          banners={cBanners.filter((item) => item.sort_index !== 2)}
          translations={translations}
          settings={settings}
        />
      </div>
    </>
  );
};

export default CategoryBanners;
