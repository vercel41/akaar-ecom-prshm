"use client";

import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../elements/loaders/Loader";
import { addToCart, addToSelected } from "@/store/features/cartSlice";
import { getDaysSinceCreation } from "@/utils/format-date";
import { getSalePercent } from "@/utils/percent";
import noImage from "@/public/assets/images/no-image.png";

import {
	HiOutlineHeart,
	HiOutlineShoppingCart,
	HiArrowLongRight,
} from "react-icons/hi2";
import { siteConfig } from "@/config/site";
import useWishList from "@/hooks/useWishList";
import useHover from "@/hooks/useHover";

const ProductCard = ({ product, isFlashSale }) => {
	const { settings, translations } = useSelector((state) => state.common);
	const [loading, setLoading] = useState(true);
	const { isHovered: isHoveredElement1, bind: bindElement1 } = useHover();
	const { isHovered: isHoveredElement2, bind: bindElement2 } = useHover();
	const {
		handleAddToWishlist,
		handleWishListProductStatus,
		handleRemoveFromWishlist,
	} = useWishList();
	const dispatch = useDispatch();
	const router = useRouter();

	const {
		id,
		slug,
		image,
		product_name,
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
		if (!stock_qty || stock_qty <= 0) {
			toast.error("stock out");
			return;
		}
		if (productVariants?.length) {
			dispatch(addToSelected(product));
		} else {
			dispatch(addToCart(product));
		}
	};

	// Buy Now action
	const handleCheckout = (product) => {
		if (!stock_qty || stock_qty <= 0) {
			toast.error("stock out");
			return;
		}
		if (productVariants.length) {
			dispatch(addToSelected(product));
		} else {
			dispatch(addToCart(product));
			router.push("/checkout");
		}
	};

	const isInWishlist = handleWishListProductStatus(id);

	return (
		<>
			{!loading ? (
				<>
					<div
						className="product-card-wrap bg-white rounded shadow p-3 mb-4"
						// style={{ border: `1px solid ${settings?.colors?.primary}` }}
					>
						<div className="product-img-action-wrap relative @container">
							{getDaysSinceCreation(created_at) < 8 && (
								<div className="absolute top-2 left-2 z-20">
									<span
										className="text-sm px-1  active:scale-90"
										style={{
											backgroundColor: settings?.colors?.primary,
											color: settings?.colors?.primary_text,
										}}
									>
										New
									</span>
								</div>
							)}
							{!settings?.guest_checkout ? (
								<div className="absolute top-2 right-2 z-20">
									<button
										aria-label="Add To Wishlist"
										className={`border px-1 active:scale-90 rounded`}
										style={{
											backgroundColor: isInWishlist
												? settings?.colors?.primary
												: "white",
											color: isInWishlist
												? settings?.colors?.primary_text
												: settings?.colors?.primary,
										}}
										onClick={(e) =>
											!isInWishlist
												? handleAddToWishlist(id)
												: handleRemoveFromWishlist(id)
										}
									>
										<HiOutlineHeart />
									</button>
								</div>
							) : null}
							<div
								className={`product-img overflow-hidden h-[180px] @[200px]:h-[270px] @[250px]:h-[340px]`}
							>
								<Link href="/products/[slug]" as={`/products/${slug}`}>
									<Image
										className="default-img h-full w-full object-cover hover:scale-125 transition-all duration-300 ease-in-out rounded-t"
										src={image || noImage}
										alt={product_name}
										width={226}
										height={400}
									/>
								</Link>
							</div>
						</div>
						<div className="product-content-wrap">
							<h2>
								<Link
									href={`/products/${slug}`}
									className="product-title text-base text-slate-900 font-body overflow-text"
								>
									{product_name}
								</Link>
							</h2>
							<div className="product-price mb-3 flex flex-col md:flex-row font-title md:items-center gap-2 md:justify-between">
								<span className="font-semibold ">
									{siteConfig.currency.shortForm}
									{new_price}
									{typeof discount_percentage === "number" &&
									discount_percentage > 0 ? (
										<>
											<del className="pl-2 old-price font-normal text-slate-400">
												{siteConfig.currency.shortForm}
												{old_price}
											</del>
											{/* <span className="discount inline-block text-xs text-white bg-red-500 rounded-md py-1 px-1 ml-2">
                        -{getFractionFixed(discount_percentage)}%
                      </span> */}
										</>
									) : null}
								</span>
								{/* <h3 className="">
									{stock_qty ? (
										`Stock: ${stock_qty}`
									) : (
										<span className="text-red-300 font-title">Stock Out</span>
									)}
								</h3> */}
							</div>

							<div className="product-actions flex justify-between items-center gap-1 sm:gap-2">
								<button
									aria-label="Add To Cart"
									className="action-btn p-1 lg:px-2 text-sm lg:text-lg rounded "
									onClick={(e) => handleAddToCart(product)}
									{...bindElement1}
									style={{
										border: `1px solid ${settings?.colors?.primary}`,
										backgroundColor: isHoveredElement1
											? settings?.colors?.primary
											: "transparent",
										color: isHoveredElement1
											? settings?.colors?.primary_text
											: settings?.colors?.primary,
									}}
								>
									<HiOutlineShoppingCart
										size={20}
										className="active:scale-90"
									/>
								</button>
								<button
									onClick={() => handleCheckout(product)}
									{...bindElement2}
									className="action-btn p-1 text-sm lg:text-lg lg:px-4 py-1 w-full rounded"
									style={{
										border: `1px solid ${settings?.colors?.primary}`,
										backgroundColor: isHoveredElement2
											? settings?.colors?.primary
											: "transparent",
										color: isHoveredElement2
											? settings?.colors?.primary_text
											: settings?.colors?.primary,
									}}
								>
									{translations["buy-now"] || "Buy Now"}{" "}
									<HiArrowLongRight className="" size={20} />
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

export default ProductCard;
