import Image from "next/image";
import Link from "next/link";
import { fetchData } from "@/utils/fetchData";
import noImage from "@/public/assets/images/no-image.png";

// ** Import Iocns
const FeaturedBanner = async () => {
  const { data: featuredBanner = [] } = await fetchData({ api: "banners" });
  if (!featuredBanner?.length) return null;
  // console.log(featuredBanner);
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {featuredBanner.map((banner) => (
          <div
            key={banner.id}
            className="col-span-1 relative hover:-translate-y-2 transition-transform duration-300 ease-in-out"
          >
            <div className="banner-img">
              <Image
                src={banner.image || noImage}
                alt="Banner"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto rounded"
              />
            </div>
            <div className="content absolute bottom-6 left-0 w-full text-center p-5">
              <h1 className="text-5xl text-left italic text-white mb-3 font-thin font-serif">
                {banner.title}
              </h1>
              <Link
                href={banner.url}
                className="underline text-xl font-semibold font-title text-white hover:text-secondary"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeaturedBanner;
