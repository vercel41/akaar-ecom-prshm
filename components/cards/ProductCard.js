"use client";
import Image from "next/image";
import { Link } from "@/navigation";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Loader from "../elements/loaders/Loader";
import { getDiscountPercent, getSalePercent } from "@/utils/percent";
import noImage from "@/public/assets/images/no-image.png";
const MotionDiv = dynamic(
  () =>
    import("framer-motion").then((mod) => mod.motion.div), { ssr: false }
);


import { siteConfig } from "@/config/site";
import useWishList from "@/hooks/useWishList";
import useCart from "@/hooks/useCart";
import { cn } from "@/utils";
import dynamic from "next/dynamic";

const ProductCard = ({ product, isFlashSale, isSquareImage }) => {
  const { settings, translations } = useSelector((state) => state.common);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(false);
  const { handleAddToCart, handleAddAndCheckout } = useCart(); //custom hook for reusing
  const {

    handleWishListProductStatus,

  } = useWishList();

  const {
    id,
    slug,
    image,
    product_name,
    new_price,
    old_price,
    stock_qty,
    total_sale_qty,
    created_at,
    hover_image,
  } = product;

  useEffect(() => {
    if (Object.keys(product).length !== 0) {
      setLoading(false);
    }
  }, [product]);

  const isInWishlist = handleWishListProductStatus(id);

  // console.log(product);

  const revealVariant = {
    hidden: { filter: "blur(8px)", opacity: 0 },
    visible: {
      filter: "blur(0px)",
      opacity: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <>
      {!loading ? (
        <>
          <MotionDiv
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={revealVariant}
            className="overflow-hidden"
          >
            <div className="section-backdrop"></div>
            <div className="product-img-action-wrap relative @container">
              {/* {getDaysSinceCreation(created_at) < 8 && (
                <div className="absolute top-2 left-2 z-20">
                  <span
                    className="text-sm px-1  active:scale-90 rounded"
                    style={{
                      backgroundColor: settings?.colors?.secondary,
                      color: settings?.colors?.secondary_text,
                    }}
                  >
                    New
                  </span>
                </div>
              )} */}
              {/* {!settings?.guest_checkout ? (
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
              ) : null} */}
              <div
                className={cn(
                  `product-img overflow-hidden relative`,
                  isSquareImage
                    ? "h-[141.5px] @[160px]:h-[161px] @[200px]:h-[207px] @[220px]:h-[242px] @[250px]:h-[260px] @[260px]:h-[271px]  @[300px]:h-[95vw]"
                    : "h-[200px] @[200px]:h-[270px] @[250px]:h-[340px]  @[300px]:h-[590px]"
                )}
              >
                <Link
                  href="/products/[slug]"
                  as={`/products/${slug}`}
                  className="group relative block w-full h-full"
                >
                  {/* Default Image */}
                  <Image
                    className="default-img absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-[700ms] ease-in-out opacity-100 group-hover:opacity-0"
                    src={image || noImage}
                    alt={product_name}
                    priority={false}
                    width={226}
                    height={400}
                  />

                  {/* Hover Image */}
                  <Image
                    className="hover-img absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-[900ms] ease-in-out opacity-0 group-hover:opacity-100"
                    src={hover_image || noImage}
                    alt={product_name}
                    priority={false}
                    width={226}
                    height={400}
                  />
                </Link>
                {product.stock_qty === 0 && (
                  <div className="absolute top-[45%] left-1/2 -translate-y-[45%] -translate-x-1/2 bg-white w-[60%] p-[.5rem] text-[.8rem] text-red-500 text-center">
                    Out of stock
                  </div>
                )}
              </div>
            </div>

            <div className="product-content-wrap @container pt-6 grid place-items-center  text-center ">
              <h2>
                <Link
                  href={`/products/${slug}`}
                  className="product-title text-[.9rem] text-slate-900 font-body font-normal overflow-text !my-0"
                >
                  {product_name}
                </Link>
              </h2>
              <p className="text-[.85rem] text-[#8a8a8a]">
                Product Code {product.id}
              </p>
              <div className="product-price mb-3 flex flex-col md:flex-row font-noto_serif md:items-center gap-2">
                <span className="font-semibold ">
                  {siteConfig.currency.shortForm}
                  {new_price.toLocaleString("en-US", {
                    currency: "USD",
                  })}
                </span>
                {old_price > new_price ? (
                  <div className="hidden md:flex items-center gap-2 text-[.9rem]">
                    <del className="old-price font-normal text-slate-400">
                      {siteConfig.currency.shortForm}
                      {old_price.toLocaleString("en-US", {
                        currency: "USD",
                      })}
                    </del>
                    <span className="discount-badge rounded text-[#ff0000] font-medium ">
                      {getDiscountPercent(old_price, new_price)}% OFF
                    </span>
                  </div>
                ) : null}
              </div>

              {isFlashSale && (
                <div className="product-flash-counter mt-4">
                  <div className=" flex items-center gap-3">
                    <div className="w-full h-[8px] bg-gray-200 rounded">
                      <div
                        className="h-[8px] bg-primary rounded"
                        style={{
                          width: `${getSalePercent(
                            total_sale_qty,
                            stock_qty
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <h3>{getSalePercent(total_sale_qty, stock_qty)}%</h3>
                  </div>
                </div>
              )}
            </div>
          </MotionDiv>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProductCard;
