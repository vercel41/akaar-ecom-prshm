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

import {
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiArrowLongRight,
} from "react-icons/hi2";

const SingleProduct = ({ product }) => {
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
  } = product;

  useEffect(() => {
    if (Object.keys(product).length !== 0) {
      setLoading(false);
    }
  }, [product]);

  const handleAddToCart = (product) => {
    if (productVariants?.length) {
      dispatch(addToSelected(product));
    } else {
      dispatch(addToCart(product));
    }
  };

  // Buy Now action
  const handleCheckout = (product) => {
    if (productVariants.length) {
      dispatch(addToSelected(product));
    } else {
      dispatch(addToCart(product));
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
            <div className="product-img-action-wrap relative">
              <div className="absolute top-2 right-2 z-20">
                <button
                  aria-label="Add To Wishlist"
                  className="bg-primary p-1 text-white active:scale-90"
                  onClick={(e) => handleWishlist(id)}
                >
                  <HiOutlineHeart />
                </button>
              </div>
              <div className="product-img border-b-2 h-400 overflow-hidden">
                <Link href="/products/[slug]" as={`/products/${slug}`}>
                  <Image
                    className="default-img h-400 w-full hover:scale-125 transition-all duration-300 ease-in-out"
                    src={image || "/assets/images/no-image.png"}
                    alt={product_name}
                    width={226}
                    height={400}
                  />
                </Link>
              </div>
            </div>
            <div className="product-content-wrap p-1 sm:p-3">
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
                  className="product-title text-base font-semibold text-slate-900 font-body overflow-text"
                >
                  {product_name}
                </Link>
              </h2>
              <div className="product-price mb-3 flex gap-2">
                <span className="text-lg/[24px] font-semibold">
                  Tk. {new_price}
                </span>
                {typeof discount_percentage === "number" &&
                discount_percentage > 0 ? (
                  <>
                    <del className="old-price text-lg/[24px] font-normal text-slate-400">
                      {old_price}
                    </del>
                    {/* <span className="discount inline-block text-xs text-white bg-red-500 rounded-md py-1 px-1 ml-2">
                        -{getFractionFixed(discount_percentage)}%
                      </span> */}
                  </>
                ) : null}
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
                  className="buy-btn px-2"
                >
                  Buy Now <HiArrowLongRight size={20} />
                </button>
              </div>
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
