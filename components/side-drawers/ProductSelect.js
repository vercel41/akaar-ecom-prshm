"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DrawerRight from "@/components/elements/DrawerRight";
import { addToCart, removeFromSelected } from "@/store/features/cartSlice";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { HiArrowLongRight } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import ProductVariantSelect from "../products/ProductVariantSelect";
import noImage from "@/public/assets/images/no-image.png";
import { getFractionFixed } from "@/utils/formatNumber";

const ProductSelect = () => {
  const { selectedProduct } = useSelector((state) => state.cart);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAddToCart = () => {
    const variantProduct = {
      ...selectedProduct,
      variantId: selectedVariant?.id,
      selectedVariant,
      // sizes: colors[selectedColor],
    };
    // console.log(variantProduct);
    dispatch(addToCart(variantProduct));
  };

  const closeDrawer = (param) => {
    dispatch(removeFromSelected());
  };

  const handleBuyNow = () => {
    handleAddToCart();
    closeDrawer();
    router.push("/checkout");
  };

  return (
    <DrawerRight
      title={"নির্বাচন করুন"}
      show={selectedProduct}
      setShow={closeDrawer}
    >
      <div className="p-6">
        <div className="product-info flex gap-4 items-center">
          <Image
            src={selectedProduct?.image || noImage}
            alt="product"
            height={84}
            width={84}
            className="h-[84px] w-[84px] rounded-lg"
          />
          <div className="">
            <h5 className="text-primary text-xs font-semibold">
              {selectedProduct?.brand?.brand_name || "No Brand"}
            </h5>
            <h2 className="mt-2">
              <Link
                href={`/products/${selectedProduct?.slug}`}
                className="product-title text-base font-semibold text-slate-900 font-body overflow-text"
              >
                {selectedProduct?.product_name}
              </Link>
            </h2>
            <div className="mt-3 flex gap-3 items-center">
              <h3 className="text-xl font-bold text-red-500">
                ৳{selectedProduct?.new_price || 0}
              </h3>
              {typeof selectedProduct?.discount_percentage === "number" &&
              selectedProduct?.discount_percentage > 0 ? (
                <>
                  <del className="text-xl text-slate-300">
                    ৳ {selectedProduct?.old_price}
                  </del>
                  <div className="rounded-full px-3 text-sm py-1 text-white bg-red-500">
                    -{getFractionFixed(selectedProduct?.discount_percentage)}%
                    OFF
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
        {selectedProduct?.productVariants?.length ? (
          <ProductVariantSelect
            productVariants={selectedProduct?.productVariants}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
          />
        ) : null}
        <div className="product-actions my-6 flex gap-4 justify-between items-center">
          <button
            className="bg-secondary-700 py-3 w-full px-6 text-white rounded-lg text-center active:scale-95"
            onClick={handleAddToCart}
          >
            <HiOutlineShoppingCart size={24} />
            <span className="ml-2">কার্টে রাখুন</span>
          </button>
          <button
            onClick={handleBuyNow}
            className="bg-primary py-3 w-full px-6 text-white rounded-lg text-center active:scale-95"
          >
            <span className="mr-2">এখনই কিনুন</span>
            <HiArrowLongRight size={20} />
          </button>
        </div>
        <Link href="/products/productIdOrSlug" className="text-secondary-700">
          <p className="text-center">প্রডাক্টির বিস্তারিত দেখতে ক্লক করুন</p>
        </Link>
      </div>
    </DrawerRight>
  );
};

export default ProductSelect;
