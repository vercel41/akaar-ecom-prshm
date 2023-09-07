"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import SizeChartModal from "../modals/SizeChartModal";

export default function ProductVariantSelect({
  productVariants,
  selectedVariant,
  setSelectedVariant,
  sizeChart,
}) {
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showSizeChart, setShowSizeChart] = useState(false);
  // const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    const variants = productVariants || [];
    if (variants.length) {
      // Group the data based on color
      const colorVariantsGroup = variants.reduce((result, variant) => {
        const { color } = variant;
        if (!result[color]) {
          result[color] = [];
        }
        result[color].push(variant);
        return result;
      }, {});
      const firstColor = Object.keys(colorVariantsGroup)[0];
      setColors(colorVariantsGroup);
      setSelectedColor(firstColor);
      setSelectedVariant(colorVariantsGroup[firstColor][0]);
    }
  }, [productVariants, setSelectedVariant]);

  return (
    <>
      <div className="product-color mt-4">
        <h4 className="text-slate-900 py-3 font-normal">
          কালার নির্বাচন করুন:
        </h4>
        {selectedColor ? (
          <div className="flex gap-2 flex-wrap">
            {Object.keys(colors).map((key) => (
              <Image
                key={key}
                src={"/assets/images/review/image-2.png"}
                alt="product"
                height={52}
                width={52}
                sizes="52px"
                title={key}
                className={`rounded-md border-2 ${
                  key === selectedColor ? "border-primary" : "border-slate-300"
                } cursor-pointer`}
                onClick={() => setSelectedColor(key)}
              />
            ))}
          </div>
        ) : null}
      </div>
      <div className="product-size mt-4">
        <div className="flex justify-between font-normal items-center py-3">
          <h4 className="text-slate-900">সাইজ নির্বাচন করুন:</h4>
          {sizeChart && (
            <button
              className="text-secondary-700 flex items-center gap-x-1"
              onClick={() => setShowSizeChart((show) => !show)}
            >
              <span>সাইজ চার্ট দেখুন</span>
              <MdArrowForwardIos />
            </button>
          )}
        </div>
        {colors[selectedColor]?.length ? (
          <div className="flex gap-2 flex-wrap">
            {colors[selectedColor]?.map((variant) => (
              <div
                key={variant.id}
                className={`py-3 px-4 rounded-lg text-slate-700 border-2 ${
                  variant?.id === selectedVariant?.id
                    ? "border-primary"
                    : "border-slate-300"
                } cursor-pointer`}
                onClick={() => setSelectedVariant(variant)}
              >
                {variant.size}
              </div>
            ))}
          </div>
        ) : null}
      </div>
      {sizeChart && showSizeChart && (
        <SizeChartModal
          showModal={showSizeChart}
          setShowModal={setShowSizeChart}
          sizeChart={sizeChart}
        />
      )}
    </>
  );
}
