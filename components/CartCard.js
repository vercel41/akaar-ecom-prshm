"use client";

import Image from "next/image";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import * as cartActions from "@/store/features/cartSlice";
import noImage from "@/public/assets/images/no-image.png";
import { getFractionFixed } from "@/utils/formatNumber";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const CartCard = ({ item }) => {
  const [imageError, setImageError] = useState(false);
  const {
    slug,
    brand,
    product_name,
    new_price,
    old_price,
    image,
    // productVariants,
    discount_percentage,
    quantity,
    cartId,
    variantId,
    selectedVariant,
    // sizes,
  } = item;

  const dispatch = useDispatch();
  return (
    <div className="relative cart-card p-4 bg-white border-b border-slate-200 mb-3">
      <button
        className="absolute right-4 top-4 bg-transparent text-primary"
        onClick={() => dispatch(cartActions.removeFromCart(cartId))}
      >
        <AiOutlineClose size={20} />
      </button>
      <div className="flex gap-2">
        <Image
          src={imageError ? noImage : image}
          onError={() => setImageError(true)}
          alt="product"
          height={80}
          width={80}
          className="h-20 w-20"
        />
        <div className="flex flex-col justify-between">
          <h5 className="text-primary">{brand?.brand_name || "No Brand"}</h5>
          <h2>
            <Link
              href={`/products/${slug}`}
              className="product-title text-base font-semibold text-slate-900 font-body overflow-text"
            >
              {product_name}
            </Link>
          </h2>
          <div className="flex gap-3 products-center items-center">
            <h3 className="text-xl">Tk.{new_price}</h3>
            {typeof discount_percentage === "number" &&
            discount_percentage > 0 ? (
              <del className="text-xl text-slate-300"> {old_price}</del>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex products-center justify-between text-sm mt-4">
        <div className="flex products-center gap-3">
          {variantId ? (
            <>
              <div className="px-2 border border-slate-300">
                {selectedVariant?.color}
              </div>
              <div className="px-2 border border-slate-300">
                {selectedVariant?.size}
              </div>
            </>
          ) : null}
        </div>
        <div className="flex items-center products-center gap-3 text-slate-900">
          <button
            className="bg-transparent border border-primary px-1"
            onClick={() => dispatch(cartActions.addQuantity(cartId))}
          >
            <FiPlus />
          </button>
          <div className="mx-1 font-bold">{quantity || 1}</div>
          <button
            className="bg-transparent border border-primary px-1"
            onClick={() => dispatch(cartActions.removeQuantity(cartId))}
          >
            <FiMinus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
