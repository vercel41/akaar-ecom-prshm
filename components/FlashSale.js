"use client";
import Link from "next/link";
import FlashSaleSlider from "./elements/sliders/FlashSale";
import Timer from "@/components/elements/Timer";
import { useGetProductFlashSaleQuery } from "@/store/features/api/productFlashSale";
import { HiArrowLongRight } from "react-icons/hi2";

const FlashSale = () => {
  const { data: flashSaleData, isLoading } = useGetProductFlashSaleQuery();
  const flashSaleInfo = flashSaleData?.flashSale || {};
  const saleProducts = flashSaleData?.data || [];
  if (flashSaleData?.status === false || isLoading) return null;
  // console.log(data);

  return (
    <section className="flash-sale mt-28">
      <div className="container relative">
        <div className="sec-heading absolute top-[-30px] left-0 w-full flex justify-between items-center px-8">
          <div className="flex gap-4 bg-white">
            <div>
              <h2 className="sec-title">{flashSaleInfo?.title}</h2>
              <p>অফার চলবে আর মাত্র</p>
            </div>
            <Timer targetDate={flashSaleInfo?.expire_time} />
          </div>
          <Link href="/flash-sale" className="all-btn bg-white">
            সবগুলো দেখুন <HiArrowLongRight size={24} />{" "}
          </Link>
        </div>

        <div className="flashSale-slider border border-primary rounded-2xl p-6 pt-16">
          <FlashSaleSlider saleProducts={saleProducts} />
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
