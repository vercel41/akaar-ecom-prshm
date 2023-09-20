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
      title={"Variant Select"}
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
            <h2>
              <Link
                href={`/products/${selectedProduct?.slug}`}
                className="product-title text-base font-semibold text-slate-900 font-body overflow-text"
              >
                {selectedProduct?.product_name}
              </Link>
            </h2>
            <h5 className="text-primary text-xs font-semibold mt-2">
              {selectedProduct?.brand?.brand_name || "No Brand"}
            </h5>
            <div className="mt-3 flex gap-3 items-center">
              <h3 className="text-xl">tk. {selectedProduct?.new_price || 0}</h3>
              {typeof selectedProduct?.discount_percentage === "number" &&
              selectedProduct?.discount_percentage > 0 ? (
                <del className="text-xl text-slate-300">
                  {selectedProduct?.old_price}
                </del>
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
            className="bg-primary py-3 w-full px-6 text-white text-center active:scale-95"
            onClick={handleAddToCart}
          >
            <HiOutlineShoppingCart size={24} />
            <span className="ml-2">Add to Cart</span>
          </button>
          <button
            onClick={handleBuyNow}
            className="bg-primary py-3 w-full px-6 text-white  text-center active:scale-95"
          >
            <span className="mr-2">Buy Now</span>
            <HiArrowLongRight size={20} />
          </button>
        </div>
      </div>
    </DrawerRight>
  );
};

export default ProductSelect;
