"use client";

import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../elements/loaders/Loader";
import { addToCart, addToSelected } from "@/store/features/cartSlice";
import { useAddToWishListMutation } from "@/store/features/api/wishListAPI";
import { getDaysSinceCreation } from "@/utils/formatDate";
import { getSalePercent } from "@/utils/getPercent";
import noImage from "@/public/assets/images/no-image.png";

import {
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiArrowLongRight,
} from "react-icons/hi2";

const SingleProduct = ({ product, isFlashSale }) => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [addToWishlist] = useAddToWishListMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    id,
    slug,
    image,
    product_name,
    brand,
    averate_rating,
    total_rating,
    new_price,
    old_price,
    discount_percentage,
    productVariants,
    stock_qty,
    total_sale_qty,
    created_at,
  } = product;

  useEffect(() => {
    if (Object.keys(product).length !== 0) {
      setLoading(false);
    }
  }, [product]);

  const handleAddToCart = (product) => {
    if (stock_qty === 0) {
      toast.error("stock out");
      return;
    }
    if (productVariants?.length) {
      dispatch(addToSelected(product));
    } else {
      dispatch(addToCart(product));
      toast.success("Added to cart");
    }
  };

  // Buy Now action
  const handleCheckout = (product) => {
    if (stock_qty === 0) {
      toast.error("stock out");
      return;
    }
    if (productVariants.length) {
      dispatch(addToSelected(product));
    } else {
      dispatch(addToCart(product));
      toast.success("Added to cart");
      router.push("/checkout");
    }
  };

  const handleWishlist = async (productId) => {
    if (!user) {
      toast.error("You're not logged in");
      return;
    }
    try {
      await addToWishlist({ product_id: productId });
      toast.success("Product added to Wishlist!");
    } catch (error) {
      toast.error("Failed to add to wishlist");
    }
  };
  return (
    <>
      {!loading ? (
        <>
          <div className="product-card-wrap bg-white border border-slate-200">
            <div className="product-img-action-wrap relative @container">
              {getDaysSinceCreation(created_at) < 8 && (
                <div className="absolute top-2 left-2 z-20">
                  <span className="bg-primary text-sm px-1 text-white active:scale-90">
                    New
                  </span>
                </div>
              )}
              <div className="absolute top-2 right-2 z-20">
                <button
                  aria-label="Add To Wishlist"
                  className="bg-primary px-1 text-white active:scale-90"
                  onClick={(e) => handleWishlist(id)}
                >
                  <HiOutlineHeart />
                </button>
              </div>
              <div
                className={`product-img border-b-2 overflow-hidden @[200px]:h-[300px] @[250px]:h-[400px]`}
              >
                <Link href="/products/[slug]" as={`/products/${slug}`}>
                  <Image
                    className="default-img h-full w-full hover:scale-125 transition-all duration-300 ease-in-out"
                    src={image || noImage}
                    alt={product_name}
                    width={226}
                    height={400}
                  />
                </Link>
              </div>
            </div>
            <div className="product-content-wrap p-2 sm:px-3">
              {/* <div className="">
                <Link
                  href={`/brands/${brand?.id ? brand?.id : ""}`}
                  className="text-xs text-primary capitalize"
                >
                  <span className="inline-block px-2 py-1 text-xs font-semibold leading-none rounded-full bg-primary text-white">
                    {brand?.brand_name || "No Brand"}
                  </span>
                </Link>
              </div> */}
              <h2>
                <Link
                  href={`/products/${slug}`}
                  className="product-title text-base text-slate-900 font-body overflow-text"
                >
                  {product_name}
                </Link>
              </h2>
              <div className="product-price mb-3 flex flex-col md:flex-row font-title md:items-center gap-2 md:justify-between">
                <span className="font-semibold text-lg/[24px]">
                  Tk.{new_price}
                  {typeof discount_percentage === "number" &&
                  discount_percentage > 0 ? (
                    <>
                      <del className="pl-2 old-price font-normal text-slate-400">
                        Tk.{old_price}
                      </del>
                      {/* <span className="discount inline-block text-xs text-white bg-red-500 rounded-md py-1 px-1 ml-2">
                        -{getFractionFixed(discount_percentage)}%
                      </span> */}
                    </>
                  ) : null}
                </span>
                <h3 className="text-lg/[24px]">
                  {stock_qty ? (
                    `In-Stock: ${stock_qty}`
                  ) : (
                    <span className="text-red-300">Stock Out</span>
                  )}
                </h3>
              </div>
              {/* <div className="rating-result flex items-center gap-2 mb-4">
                  <span className="font-semibold text-slate-900">
                    {getFractionFixed(averate_rating) || 0}{" "}
                    <FaStar className="text-primary pb-1" />
                  </span>
                  <span className="block border-l border-l-slate-200 pl-2 font-semibold text-slate-900">
                    {total_rating === 0
                      ? "No Rating"
                      : formatLongNumber(total_rating)}
                  </span>
                </div> */}

              <div className="product-actions flex justify-between items-center gap-1 sm:gap-2">
                <button
                  aria-label="Add To Cart"
                  className="action-btn p-1"
                  onClick={(e) => handleAddToCart(product)}
                >
                  <HiOutlineShoppingCart
                    size={24}
                    className="active:scale-90"
                  />
                </button>
                <button
                  onClick={() => handleCheckout(product)}
                  className="action-btn px-2 lg:px-4 py-1"
                >
                  Buy Now <HiArrowLongRight size={20} />
                </button>
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
                  {/* <div className="flex-between mt-1 font-light">
                    <h3>Sold: {total_sale_qty}</h3>
                    <h3>In-Stock: {stock_qty}</h3>
                  </div> */}
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default SingleProduct;
