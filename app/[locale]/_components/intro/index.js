import { fetchData } from "@/lib/fetch-data";
import IntroSlider from "./IntroSlider";
import Image from "next/image";
import Link from "next/link";

const Intro = async ({ settings }) => {
  const { data: heroBanner = [] } = await fetchData({
    api: "hero-banner",
  });
  // return <IntroSlider sliders={sliders} settings={settings} />;
  const heroBannerButtons = heroBanner?.buttons;

  return (
    <div className="-mt-[132px] w-full h-screen">
      <div className="w-full min-h-screen h-full -z-1 relative">
        <Image
          src={heroBanner?.image}
          className="w-full h-full object-cover custom-fade-in"
          alt="Hero Banner"
          width={2000}
          height={1000}
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-4 absolute w-full h-full inset-0">
        {heroBannerButtons?.map((button, i) => (
          <Link
            key={i}
            href={`${button.path}`}
            className="w-[300px] h-[50px] bg-[#f7f7f7] text-[#192134] font-bold text-center grid place-items-center custom-animation-pulse hover:!opacity-100"
          >
            {button.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Intro;
