"use client";
import { Link } from "@/navigation";
import Image from "next/image";
import React, { useState } from "react";
import { removeFromSelected, toggleCart } from "@/store/slices/cartSlice";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { HiArrowLongRight } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import ProductVariantSelect from "../products/ProductVariantSelect";
import noImage from "@/public/assets/images/no-image.png";
import { siteConfig } from "@/config/site";
import useCart from "@/hooks/useCart";
import { getDiscountPercent } from "@/utils/percent";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Modal from "../elements/Modal";
import DrawerRight from "../elements/DrawerRight";

const ProductSelect = () => {
  const { handleAddToCart, handleAddAndCheckout } = useCart(); //custom hook for reusing
  const { selectedProduct } = useSelector((state) => state.cart);
  const { settings, translations } = useSelector((state) => state.common);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dispatch = useDispatch();

  const closeDrawer = (param) => {
    setSelectedVariant(null); // clearing selected variants on close
    dispatch(removeFromSelected());
  };

  const handleAddAndClose = () => {
    const isSuccess = handleAddToCart(selectedProduct, selectedVariant);
    if (isSuccess) {
      closeDrawer();
      dispatch(toggleCart()); //opening cart
    }
  };

  const newPrice =
    selectedVariant?.discount_selling_price || selectedProduct?.new_price;
  const oldPrice = selectedVariant?.selling_price || selectedProduct?.old_price;

  const pageContent = (
    <div className="lg:p-6">
      <div className="product-info grid grid-cols-[72px_auto] lg:grid-cols-[84px_auto] gap-3 lg:gap-4 items-center">
        <Image
          src={selectedProduct?.image || noImage}
          alt="product"
          height={84}
          width={84}
          className="h-[72px] w-[72px] lg:w-[84px] lg:h-[84px] rounded-lg"
        />
        <div className="">
          <h5 className="text-xs font-semibold text-primary">
            {selectedProduct?.brand?.brand_name || "No Brand"}
          </h5>
          <h2 className="mt-2">
            <Link
              href={`/products/${selectedProduct?.slug}`}
              className="product-title"
            >
              {selectedProduct?.product_name}
            </Link>
          </h2>
          <div className="flex gap-2 items-center lg:gap-3 products-center">
            <h3 className="text-base/[16px] lg:text-xl text-red-500">
              {siteConfig.currency.sign} {newPrice}
            </h3>
            {oldPrice > newPrice ? (
              <>
                <del className="text-sm text-slate-300">
                  {siteConfig.currency.sign} {oldPrice}
                </del>
                <div className="px-1 py-0.5 text-xs text-white bg-red-500 rounded-md">
                  {getDiscountPercent(oldPrice, newPrice)}% OFF
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <ProductVariantSelect
        photos={selectedProduct?.photos}
        productBarCodes={selectedProduct?.barcodes}
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
        translations={translations}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
      <div className="flex gap-3 justify-between items-center mt-8 mb-3 text-sm product-actions lg:mt-10 lg:my-6 md:text-base lg:gap-4">
        <button
          className="px-1 py-2 w-full text-center rounded-lg md:py-3 md:px-3 active:scale-95"
          style={{
            backgroundColor: settings?.colors?.primary,
            color: settings?.colors?.primary_text,
            border: `1px solid ${settings?.colors?.primary_text}`,
          }}
          onClick={() => handleAddAndClose()}
        >
          <HiOutlineShoppingCart size={20} />
          <span className="ml-2">
            {translations["add-to-cart"] || "Add to Cart"}
          </span>
        </button>
        <button
          onClick={() =>
            handleAddAndCheckout(selectedProduct, selectedVariant, true)
          }
          className="px-1 py-2 w-full text-center rounded-lg md:py-3 md:px-3 active:scale-95"
          style={{
            backgroundColor: settings?.colors?.primary,
            color: settings?.colors?.primary_text,
            border: `1px solid ${settings?.colors?.primary_text}`,
          }}
        >
          <span className="mr-2">{translations["buy-now"] || "Buy Now"}</span>
          <HiArrowLongRight size={20} className="hidden lg:inline" />
        </button>
      </div>
      <Link
        href={`/categories/${selectedProduct?.category?.slug}`}
        className="text-sm text-secondary-700"
      >
        <p className="text-center">
          {translations["click-product-details"] ||
            "Click to view similar products"}
        </p>
      </Link>
    </div>
  );

  return (
    <>
      {isMobile ? (
        <Modal
          showModal={selectedProduct}
          setShowModal={closeDrawer}
          title={translations["select-variant"] || "Select Variant"}
        >
          {pageContent}
        </Modal>
      ) : (
        <DrawerRight
          title={translations["select-variant"] || "Select Variant"}
          show={selectedProduct}
          setShow={closeDrawer}
        >
          {pageContent}
        </DrawerRight>
      )}
    </>
  );
};

export default ProductSelect;
