// "use client";
import Image from "next/image";
import Link from "next/link";
import { fetchData } from "@/lib/fetch-data";
import noImage from "@/public/assets/images/no-image.png";
import CategorySlider from "@/components/CategorySlider";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

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
            <div key={banner.id}>
              <Link href={banner.url || "#"} className="banner-img">
                <Image
                  src={banner.image || noImage}
                  alt="Banner"
                  width={400}
                  height={500}
                  className="w-full h-[300px] lg:h-[600px] 2xl:h-[700px] transition-transform duration-300 ease-in-out"
                />
              </Link>
              <div className="content w-full text-center p-5 py-2.5">
                <Link
                  href={banner.url || "#"}
                  className="rounded px-2 pb-1 font-medium font-title flex justify-center items-center gap-1 group capitalize text-[.9rem]"
                  style={{
                    borderColor: settings?.colors?.default_text,
                    color: settings?.colors?.default_text,
                  }}
                >
                  <span className="group-hover:-translate-x-3 transition-transform duration-500">
                    {banner.title}
                  </span>
                  <span>
                    <MdKeyboardDoubleArrowRight
                      size={22}
                      className="group-hover:translate-x-3 transition-transform duration-500"
                    />
                  </span>
                </Link>
              </div>
            </div>
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
