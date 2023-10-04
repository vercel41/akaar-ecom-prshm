"use client";
import { useParams } from "next/navigation";
import Timer from "@/components/elements/Timer";
import { useGetProductFlashSaleQuery } from "@/store/features/api/productFlashSaleAPI";
import ProductSlider from "./elements/sliders/ProductSlider";

const FlashSale = () => {
  const { locale } = useParams();
  const { data: flashSaleData, isLoading } = useGetProductFlashSaleQuery({
    locale,
  });
  const flashSaleInfo = flashSaleData?.flashSale || {};
  const saleProducts = flashSaleData?.data || [];
  if (flashSaleData?.status === false || isLoading || !flashSaleData)
    return null;

  return (
    <div className="relative">
      <div className="sec-heading absolute top-[-30px] left-0 w-full flex flex-col lg:flex-row justify-center lg:justify-between items-center">
        <div className=" bg-white">
          <h2 className="sec-title">{flashSaleInfo?.title}</h2>
        </div>
        <div className="bg-white flex flex-col lg:flex-row justify-center lg:justify-start gap-4 items-center">
          <h3 className="text-xl font-bold">Deals End In</h3>
          <Timer targetDate={flashSaleInfo?.expire_time} />
        </div>
      </div>
      <div className="flashSale-slider pt-32 lg:pt-16">
        <ProductSlider
          products={saleProducts}
          sliderId="flash-sale"
          isFlashSale
        />
      </div>
    </div>
  );
};

export default FlashSale;
