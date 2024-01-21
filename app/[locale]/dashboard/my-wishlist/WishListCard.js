"use client";
import Image from "next/image";
import Link from "next/link";
import { addToCart, addToSelected } from "@/store/features/cartSlice";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import noImage from "@/public/assets/images/no-image.png";
import { AiOutlineClose } from "react-icons/ai";
import { siteConfig } from "@/config/site";
import useWishList from "@/hooks/useWishList";
import { useSelector } from "react-redux";

const WishListCard = ({ product }) => {
  const { handleRemoveFromWishlist } = useWishList();
  const { settings, translations } = useSelector((state) => state.common);

  const {
    id,
    slug,
    brand,
    product_name,
    new_price,
    old_price,
    productVariants,
    discount_percentage,
    stock_qty,
  } = product;

  const stockOut = stock_qty <= 0 ? true : false;

  const handleAddToCart = (product) => {
    if (productVariants?.length) {
      dispatch(addToSelected(product));
    } else {
      dispatch(addToCart(product));
    }
  };

  // console.log(product);
  return (
    <div className="relative px-3 py-4 bg-white border-t border-slate-200 mb-3 shadow rounded">
      <button
        className="absolute right-3 z-20 top-1 bg-transparent w-fit h-fit p-1"
        onClick={() => handleRemoveFromWishlist(id)}
      >
        <AiOutlineClose size={20} />
      </button>
      <div className={`flex gap-4`}>
        <div className="relative">
          <Image
            src={product.image || noImage}
            alt="product"
            height={80}
            width={96}
            className={`${stockOut ? "opacity-50" : ""} w-24 h-20`}
          />
          {stockOut ? (
            <div className="w-full h-full rounded absolute left-0 top-0 flex items-center justify-center">
              <span className="text-center text-red-400 border bg-[#acacac71] border-red-100 p-[2px] rounded font-bold">
                {translations["stock-out"] || "Stock Out"}
              </span>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col justify-between w-full">
          <span
            // href={`/brands/${brand?.id}`}
            className={`text-primary ${stockOut ? "opacity-50" : ""}`}
          >
            {brand?.brand_name || "No Brand"}
          </span>
          <Link
            href={`/products/${slug}`}
            className={`${
              stockOut ? "opacity-50" : ""
            } product-title overflow-text`}
          >
            {product_name}
          </Link>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div
              className={`flex gap-3 products-center items-center ${
                stockOut ? "opacity-50" : ""
              }`}
            >
              <h3 className="text-xl">
                {siteConfig.currency.shortForm}
                {new_price}
              </h3>
              {typeof discount_percentage === "number" &&
              discount_percentage > 0 ? (
                <>
                  <del className="text-xl text-slate-300">
                    {siteConfig.currency.shortForm}
                    {old_price}
                  </del>
                </>
              ) : null}
            </div>
            {!stockOut ? (
              <button
                className="py-2 px-3 text-center active:scale-95 rounded"
                onClick={() => handleAddToCart(product)}
                style={{
                  backgroundColor: settings?.colors?.primary,
                  color: settings?.colors?.primary_text,
                }}
              >
                <HiOutlineShoppingCart size={16} />
                <span className="ml-2">
                  {translations["add-to-cart"] || "Add To Cart"}
                </span>
              </button>
            ) : (
              <Link
                href={`/categories/${product.category?.slug}`}
                className="text-center font-bold py-2 px-3 active:scale-95 cursor-pointer rounded"
                style={{
                  border: `1px solid ${settings?.colors?.primary}`,
                  color: settings?.colors?.primary,
                }}
              >
                {translations["similar-products"] || "Similar Products"}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishListCard;
