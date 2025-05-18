"use client";
import Image from "next/image";
import { Link } from "@/navigation";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Loader from "../elements/loaders/Loader";
import { getDiscountPercent, getSalePercent } from "@/utils/percent";
import noImage from "@/public/assets/images/no-image.png";
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

import { siteConfig } from "@/config/site";
import useWishList from "@/hooks/useWishList";
import useCart from "@/hooks/useCart";
import { cn } from "@/utils";
import dynamic from "next/dynamic";

const ProductCard = ({
  product,
  isFlashSale,
  isSquareImage,
  showPrice = true,
}) => {
  const { settings, translations } = useSelector((state) => state.common);
  const [loading, setLoading] = useState(true);
  const { handleWishListProductStatus } = useWishList();

  const {
    id,
    slug,
    image,
    product_name,
    new_price,
    old_price,
    stock_qty,
    total_sale_qty,
    hover_image,
  } = product;

  useEffect(() => {
    if (id && (product_name || product.name)) {
      setLoading(false);
    }
  }, [product, id, product_name]);

  const isInWishlist = handleWishListProductStatus(id);

  const revealVariant = {
    hidden: { filter: "blur(8px)", opacity: 0 },
    visible: {
      filter: "blur(0px)",
      opacity: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  if (loading) return <Loader />;

  return (
    <MotionDiv
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={revealVariant}
      className="overflow-hidden"
    >
      <div className="section-backdrop"></div>
      <div className="product-img-action-wrap relative @container">
        <div
          className={cn(
            `product-img overflow-hidden relative`,
            isSquareImage
              ? "h-[141.5px] @[160px]:h-[161px] @[200px]:h-[207px] @[220px]:h-[242px] @[250px]:h-[260px] @[260px]:h-[271px]  @[300px]:h-[95vw]"
              : "h-[200px] @[200px]:h-[270px] @[250px]:h-[340px]  @[300px]:h-[590px]"
          )}
        >
          <Link
            href={`/products/${slug}`}
            className="block relative w-full h-full group"
          >
            <Image
              className="rounded-md default-img absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-[700ms] ease-in-out"
              src={image || noImage}
              alt={product_name}
              priority={false}
              width={226}
              height={400}
              onError={(e) => {
                e.currentTarget.src = noImage.src;
              }}
            />

            {hover_image && (
              <Image
                className=" rounded-md hover-img absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-[900ms] ease-in-out opacity-0 group-hover:opacity-100"
                src={hover_image}
                alt={product_name}
                priority={false}
                width={226}
                height={400}
                onError={(e) => {
                  e.currentTarget.src = noImage.src;
                }}
              />
            )}
          </Link>

          {stock_qty === 0 && (
            <div className="absolute top-[45%] left-1/2 -translate-y-[45%] -translate-x-1/2 bg-white w-[60%] p-[.5rem] text-[.8rem] text-red-500 text-center">
              Out of stock
            </div>
          )}
        </div>
      </div>

      <div className="product-content-wrap @container pt-6 grid place-items-center text-center">
        <h2>
          <Link
            href={`/products/${slug}`}
            className="product-title text-[.9rem] text-slate-900 font-body font-normal overflow-text !my-0 hover:text-primary"
          >
            {product_name}
          </Link>
        </h2>

        {product?.sku && (
          <p className="text-[.85rem] text-[#8a8a8a]">
            Product Code {product.sku}
          </p>
        )}

        {showPrice && new_price !== undefined && (
          <div className="flex flex-col gap-2 mb-3 product-price md:flex-row font-noto_serif md:items-center">
            <span className="font-semibold">
              {siteConfig.currency.shortForm}
              {new_price.toLocaleString("en-US", {
                currency: "USD",
              })}
            </span>
            {old_price && new_price && old_price > new_price && (
              <div className="hidden md:flex items-center gap-2 text-[.9rem]">
                <del className="font-normal old-price text-slate-400">
                  {siteConfig.currency.shortForm}
                  {old_price.toLocaleString("en-US", {
                    currency: "USD",
                  })}
                </del>
                <span className="discount-badge rounded text-[#ff0000] font-medium">
                  {getDiscountPercent(old_price, new_price)}% OFF
                </span>
              </div>
            )}
          </div>
        )}

        {isFlashSale && (
          <div className="mt-4 product-flash-counter">
            <div className="flex gap-3 items-center">
              <div className="w-full h-[8px] bg-gray-200 rounded">
                <div
                  className="h-[8px] bg-primary rounded"
                  style={{
                    width: `${getSalePercent(total_sale_qty, stock_qty)}%`,
                  }}
                ></div>
              </div>
              <h3>{getSalePercent(total_sale_qty, stock_qty)}%</h3>
            </div>
          </div>
        )}
      </div>
    </MotionDiv>
  );
};

export default ProductCard;

{
  /* {getDaysSinceCreation(created_at) < 8 && (
                <div className="absolute top-2 left-2 z-20">
                  <span
                    className="px-1 text-sm rounded active:scale-90"
                    style={{
                      backgroundColor: settings?.colors?.secondary,
                      color: settings?.colors?.secondary_text,
                    }}
                  >
                    New
                  </span>
                </div>
              )} */
}
{
  /* {!settings?.guest_checkout ? (
                <div className="absolute top-2 right-2 z-20">
                  <button
                    aria-label="Add To Wishlist"
                    className={`bg-white px-1 active:scale-90 rounded ${
                      isInWishlist ? "text-red-500" : "text-gray-500"
                    }`}
                    onClick={(e) =>
                      !isInWishlist
                        ? handleAddToWishlist(product)
                        : handleRemoveFromWishlist(id)
                    }
                  >
                    {isInWishlist ? <HiHeart /> : <HiOutlineHeart />}
                  </button>
                </div>
              ) : null} */
}
