"use client";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useRemoveFromWishListMutation } from "@/store/features/api/wishListAPI";
import { addToCart, addToSelected } from "@/store/features/cartSlice";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import noImage from "@/public/assets/images/no-image.png";
import { AiOutlineClose } from "react-icons/ai";

const WishListCard = ({ product }) => {
  const [deleteFromWishlist] = useRemoveFromWishListMutation();
  const dispatch = useDispatch();

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

  const handleDelete = async (productId) => {
    try {
      await deleteFromWishlist(productId);
      toast.success("Product removed successfully!");
    } catch (error) {
      toast.error("Failed to delete from wishlist");
    }
  };

  const handleAddToCart = (product) => {
    if (productVariants?.length) {
      dispatch(addToSelected(product));
    } else {
      dispatch(addToCart(product));
    }
  };

  // console.log(product);
  return (
    <div className="relative px-3 py-4 bg-white border-t border-slate-200 mb-3">
      <button
        className="absolute right-3 top-1 bg-transparent"
        onClick={() => handleDelete(id)}
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
              <span className="text-primary text-center bg-red-100 px-2 font-bold">
                Stock Out
              </span>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col justify-between w-full">
          <Link
            href={`/brands/${brand?.id}`}
            className={`text-primary ${stockOut ? "opacity-50" : ""}`}
          >
            {brand?.brand_name || "No Brand"}
          </Link>
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
              <h3 className="text-xl">Tk.{new_price}</h3>
              {typeof discount_percentage === "number" &&
              discount_percentage > 0 ? (
                <>
                  <del className="text-xl text-slate-300">Tk.{old_price}</del>
                </>
              ) : null}
            </div>
            {!stockOut ? (
              <button
                className="bg-primary py-2 px-3 text-white text-center active:scale-95"
                onClick={() => handleAddToCart(product)}
              >
                <HiOutlineShoppingCart size={16} />
                <span className="ml-2">Add to Cart</span>
              </button>
            ) : (
              <Link
                href={`/categories/${product.category?.slug}`}
                className="text-primary text-center font-bold border border-primary py-2 px-3 active:scale-95 cursor-pointer"
              >
                Similar Products
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishListCard;
