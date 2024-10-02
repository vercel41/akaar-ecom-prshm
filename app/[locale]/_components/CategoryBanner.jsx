"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
const MotionDiv = dynamic(() =>
  import("framer-motion").then((mod) => mod.motion.div)
);
const CategoryBanner = ({ banner, settings }) => {
  const revealVariant = {
    hidden: { filter: "blur(8px)", opacity: 0 },
    visible: {
      filter: "blur(0px)",
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <MotionDiv
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={revealVariant}
    >
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
    </MotionDiv>
  );
};

export default CategoryBanner;
