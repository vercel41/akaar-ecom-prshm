"use client";
import Image from "next/image";
import React, { forwardRef, useEffect, useState } from "react";
import { groupByKey } from "@/utils/format-list";
import { toast } from "react-toastify";
import { cn } from "@/utils";
import { MdArrowForwardIos } from "react-icons/md";
import SizeChartModal from "../modals/SizeChartModal";
import ProductZoomYetAnother from "@/app/[locale]/products/[slug]/_components/ProductZoomYetAnother";

const ProductVariantSelect = forwardRef(
  (
    {
      productBarCodes,
      photos = [],
      selectedVariant,
      setSelectedVariant,
      translations,
      selectedColor,
      setSelectedColor,
      size_cart,
    },
    ref
  ) => {
    const [colorsGroup, setColorsGroup] = useState({});
    const colors = Object.keys(colorsGroup);
    const [showSizeChart, setShowSizeChart] = useState(false);
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const handleVariantSelect = (variantProp) => {
      if (variantProp.stock_qty <= 0) {
        setSelectedVariant(null); // clear selected variant when out of stock
        toast.error("Oops! this variant isn't available");
        return;
      }
      setSelectedVariant(variantProp);
    };
    /**
     * The function `triggerColorImgToView` filters an array of photos based on a given color name and
     * selects the first image as the active slide in a slider.
     * @param colorName - The color name parameter is a string that represents the name of a color.
     */
    const triggerColorImgToView = (colorName) => {
      if (ref) {
        //added for color wise image filtering and selecting first image as active slide in slider
        let filteredSlides = photos.filter(
          (slide) => slide.color_name === colorName
        );
        !filteredSlides.length && (filteredSlides = photos);
        ref.current.swiper.slideTo(0);
        // ref.current.swiper.autoplay.stop();

        //selecting first image as active slide in slider
        // filteredSlides.some((photo, index) => {
        // 	if (photo.color_name === colorName) {
        // 		ref.current.swiper.slideTo(index);
        // 		ref.current.swiper.autoplay.stop();
        // 		return true;
        // 	}
        // 	return false;
        // });
      }
    };

    const handleColorSelect = (colorProp) => {
      setSelectedColor(colorProp);
      // Only if one size available for a color following block of code
      // will try to add/remove this variant when color gets selected
      if (colorsGroup[colorProp].length === 1) {
        let firstVariantOfColor = colorsGroup[colorProp][0];
        handleVariantSelect(firstVariantOfColor);
      } else {
        // if size available for new selected color it keeps the current size otherwise clear the selected variant
        const isSizeAvailable = colorsGroup[colorProp].find(
          (variant) =>
            variant.size === selectedVariant?.size && variant.stock_qty > 0
        );

        isSizeAvailable
          ? setSelectedVariant(isSizeAvailable)
          : setSelectedVariant(null);
      }
      triggerColorImgToView(colorProp);
    };

    useEffect(() => {
      // console.log(photos);
      const variants = productBarCodes || [];
      if (variants.length) {
        const colorVariantsGroup = groupByKey(variants, "color"); // Group the data based on color
        setColorsGroup(colorVariantsGroup);

        // Activate this block to auto variant select onload
        const tempColors = Object.keys(colorVariantsGroup);

        if (tempColors.length === 1) {
          // handleColorSelect(tempColors[0]);
          const firstColor = tempColors[0];
          setSelectedColor(firstColor);
          // setSelectedVariant([colorVariantsGroup[firstColor][0]]);
        }
      }
    }, [productBarCodes, setSelectedColor, setSelectedVariant]);

    const handleOpenZoom = (index) => {
      setOpen(true);
      setIndex(index);
    };

    return (
      <>
        {open && (
          <ProductZoomYetAnother
            open={open}
            setIndex={setIndex}
            index={index}
            setOpen={setOpen}
            images={[{ image: size_cart?.image }]}
          />
        )}
        {!(colors.length === 1 && colors[0] === "") ? (
          <div className="product-color mt-4 border-b border-black pb-3">
            <h4 className="text-[#0a0a0a] text-[.8rem] font-bold">
              {translations["select-color"] || "Select Color"}:
            </h4>
            <div className="flex gap-[10px] lg:gap-3 flex-wrap mt-2 lg:mt-3">
              {colors.map((color) => {
                let colorImgInfo = photos.find(
                  (photo) => photo.color_name === color
                );

                return (
                  <div
                    key={color}
                    className={`md:px-1.5 md:py-0 h-[48px] lg:h-10 min-w-[48px] lg:min-w-[52px] w-fit box-content border ${
                      selectedColor === color
                        ? "border-2 border-primary"
                        : "border-slate-300"
                    } cursor-pointer`}
                    onClick={() => handleColorSelect(color)}
                  >
                    {colorImgInfo ? (
                      <Image
                        src={colorImgInfo?.image}
                        alt="product"
                        height={52}
                        width={52}
                        title={color}
                        className={`h-full w-12 lg:w-[52px] object-contain`}
                      />
                    ) : (
                      <span
                        className={`h-full w-full flex items-center justify-center text-sm lg:text-base text-slate-700`}
                        // style={{ backgroundColor: colorImgInfo?.color_code }}
                      >
                        {color}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        {/* size section */}
        {colorsGroup[selectedColor]?.some((variant) => variant.size !== "") ? (
          <div className="product-size mt-10 border-b border-gray-300  pb-2">
            <div className="font-normal flex justify-between items-center">
              <h4 className="text-[#0a0a0a]  text-sm font-medium">
                {translations["select-variant"] || "Select Size"}
              </h4>
              {size_cart && (
                <button
                  className="text-black flex items-center text-[.8rem] underline"
                  onClick={() => handleOpenZoom(0)}
                >
                  <span className="text-sm">
                    {translations["View size guide"] || "View size guide"}
                  </span>
                </button>
              )}
            </div>
            <div className="flex flex-wrap mt-2">
              {colorsGroup[selectedColor]?.map((variant) => (
                <div
                  key={variant.id}
                  className={cn(
                    `px-[3px] min-w-[38px] border h-[38px] font-semibold text-[.7rem] m-1 cursor-pointer  grid place-items-center transition-colors duration-500 `,
                    variant.stock_qty <= 0
                      ? "text-[#808080] cursor-default line-through"
                      : "text-black",
                    selectedVariant &&
                      selectedVariant.id === variant.id &&
                      "border-black text-black"
                  )}
                  onClick={() => handleVariantSelect(variant)}
                >
                  {variant.size}
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <p
          className={cn(
            `text-center text-sm font-bold mt-3 ${
              ((selectedVariant && selectedVariant.stock_qty === 0) ||
                (selectedVariant &&
                  selectedVariant.stock_qty > 0 &&
                  selectedVariant.stock_qty < 10)) &&
              "text-red-500"
            }`
          )}
        >
          {selectedVariant && selectedVariant.stock_qty === 0 && "Out of stock"}
          {selectedVariant &&
            selectedVariant.stock_qty > 0 &&
            selectedVariant.stock_qty < 10 &&
            `Only ${selectedVariant.stock_qty} left`}
          {selectedVariant && selectedVariant.stock_qty >= 10 && "In stock"}
        </p>

        {/* {size_cart && showSizeChart && (
          <SizeChartModal
            showModal={showSizeChart}
            setShowModal={setShowSizeChart}
            sizeChart={size_cart}
          />
        )} */}
      </>
    );
  }
);

ProductVariantSelect.displayName = "ProductVariantSelect";

export default ProductVariantSelect;
