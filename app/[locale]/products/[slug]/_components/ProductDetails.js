"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { getCouponDiscount } from "@/lib/checkout";
import { getSlicedText } from "@/utils/format-text";
import ViewHTML from "@/components/elements/ViewHTML";
import { addToCart } from "@/store/features/cartSlice";
import ProductVariantSelect from "@/components/products/ProductVariantSelect";
import * as pixel from "/lib/fpixel";

// ** Import Icon
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { TbTag } from "react-icons/tb";
import { IoCopy } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";
import ProductViewSlider from "./ProductViewSlider";
import { siteConfig } from "@/config/site";
import { IoIosFlash } from "react-icons/io";

const ProductDetails = ({ product, settings, translations }) => {
	const [selectedVariant, setSelectedVariant] = useState(null);
	const { isFbPixelInitialized } = useSelector((state) => state.common);
	const dispatch = useDispatch();
	const router = useRouter();
	const flag = useRef(true);

	const handleAddToCart = () => {
		if (!product?.stock_qty || product?.stock_qty <= 0) {
			toast.error("stock out");
			return;
		}
		if (product?.productVariants?.length) {
			if (
				!selectedVariant?.stock_quantity ||
				selectedVariant?.stock_quantity <= 0
			) {
				toast.error("No more stock for this variant");
				return;
			}
			const variantProduct = {
				...product,
				variantId: selectedVariant?.id,
				selectedVariant,
				// sizes: colors[selectedColor],
			};
			// console.log(variantProduct);
			dispatch(addToCart(variantProduct));
		} else {
			dispatch(addToCart(product));
		}

		// //Pixel Add to cart event
		pixel.event("AddToCart", pixel.getProductPixelData(product));
	};

	const handleBuyNow = () => {
		if (!product?.stock_qty || product?.stock_qty <= 0) {
			toast.error("stock out");
			return;
		}
		handleAddToCart();
		router.push("/checkout");
	};

	// //Facebook Pixel view content event
	useEffect(() => {
		// Check if product ID exists to avoid errors
		if (product && isFbPixelInitialized && flag.current) {
			pixel.event("ViewContent", pixel.getProductPixelData(product));
			flag.current = false;
		}
	}, [product, isFbPixelInitialized]);

	return (
		<>
			<div className="relative product-details">
				<div className="flex flex-col lg:flex-row gap-10">
					<div className="lg:w-1/2">
						<div className="sticky top-4">
							<ProductViewSlider product={product} settings={settings} />
						</div>
					</div>
					<div className="lg:w-1/2">
						<div className="product-content-wrap">
							<p className="text-sm font-bold text-primary capitalize mb-2">
								{product?.brand?.brand_name || "No Brand"}
							</p>
							<h5 className="text-2xl font-title font-bold text-slate-900">
								{getSlicedText(product?.product_name, 100)}
							</h5>
							<div className="product-price flex items-center gap-4 pt-4">
								<span className="text-xl font-title text-slate-900">
									{siteConfig.currency.shortForm}
									{product?.new_price || "0.00"}{" "}
								</span>
								{product?.discount_percentage > 0 ? (
									<>
										<del className="old-price text-lg/[24px] font-normal text-slate-400">
											{siteConfig.currency.shortForm}
											{product?.old_price ? `${product?.old_price}` : "0.00"}
										</del>
									</>
								) : null}
							</div>
							{product?.minimum_wholesale_quantity > 0 && (
								<div className="product-price flex items-center gap-4 pt-4">
									<span className="text-xl font-title text-slate-900">
										Wholesale Price {siteConfig.currency.shortForm}
										{product?.wholesale_price || "0.00"}{" "}
									</span>
									<span className="old-price text-lg/[24px] font-normal text-slate-400">
										(MOQ: {product?.minimum_wholesale_quantity})
									</span>
								</div>
							)}
							<div className="flex items-center gap-2 py-4 font-title text-lg">
								<span className="text-slate-900">SKU:</span>
								<span className="text-secondary">{product?.sku}</span>
							</div>

							{/* Rating Review and Share section  */}
							{/* <div className="meta-data flex items-center gap-8 my-2">
                <div className="flex gap-1 items-center">
                  <Rating
                    initialValue={product?.averate_rating || 5}
                    allowFraction
                    readonly
                    size={24}
                    fillColor="#F59E0B"
                  />
                  <span>{getFractionFixed(product?.averate_rating || 5)}</span>
                </div>
                <p>{formatLongNumber(product?.total_rating)} রেটিং</p>
                <p>
                  <HiChatBubbleLeftRight
                    size={20}
                    className="text-secondary-700"
                  />{" "}
                  {formatLongNumber(product?.toptal_question_answer || 0)}{" "}
                  প্রশ্ন এবং উত্তর
                </p>
                <SocialShare />
              </div> */}
							{/* short description  */}
							<ViewHTML
								htmlText={product?.product_short_description}
								className={"desc"}
							/>

							{
								product?.productVariants?.length ? (
									<ProductVariantSelect
										productVariants={product?.productVariants}
										selectedVariant={selectedVariant}
										setSelectedVariant={setSelectedVariant}
										sizeChart={product?.size_chart}
									/>
								) : null
								// <div className="product-size mt-8">
								// 	<h4 className="text-slate-900">
								// 		In-Stock: {product?.stock_qty || 0}
								// 	</h4>
								// </div>
							}

							{product?.coupons?.length ? (
								<div className="mt-5 mb-8">
									<p className="font-semibold font-title text-slate-900 mb-2">
										{translations["offer"] || "Offer"}{" "}
										<TbTag size={24} className="text-primary mb-1" />
									</p>
									<ul className="coupon-info">
										<li className="relative text-slate-900 pl-4">
											{translations["coupon-discount"] || "Coupon Discount"}:{" "}
											<span className="font-semibold text-title text-secondary-700">
												&#2547;
												{getCouponDiscount(
													product?.coupons[0],
													product.new_price
												)}{" "}
												{translations["discount"] || "Discount"}!
											</span>
										</li>
										<li className="relative text-slate-900 pl-4 my-2 before:!top-3">
											{translations["coupon-code"] || "Coupon Code"}:{" "}
											<span className="inline-block text-primary border border-dashed border-primary rounded px-2 py-1 ml-1">
												{product.coupons[0].code}{" "}
												<CopyToClipboard
													text={product.coupons[0].code}
													// onCopy={() => alert("copied")}
												>
													<IoCopy
														size={20}
														className="text-primary mb-1 active:scale-90"
													/>
												</CopyToClipboard>
											</span>
										</li>
										<li className="relative text-slate-900 pl-4 mb-3">
											{translations["applicable"] || "Applicable"}: ৳
											{product.coupons[0].max_discount}{" "}
											{translations["above-orders"] || "Above orders"} (
											{translations["only-on-first-purchase"] ||
												" Only on first purchase"}
											)
										</li>
									</ul>
								</div>
							) : null}
						</div>

						{/* Add to cart section  */}
						<div className="py-4">
							<div className="product-actions my-6 flex gap-4 justify-between items-center">
								<button
									className="bg-primary py-3 w-full px-2 lg:px-6 text-white  text-center active:scale-95 rounded"
									onClick={handleAddToCart}
									style={{
										backgroundColor: settings?.colors?.primary,
										color: settings?.colors?.primary_text,
									}}
								>
									<HiOutlineShoppingCart size={24} />
									<span className="ml-2">
										{translations["add-to-cart"] || "Add to cart"}
									</span>
								</button>
								<button
									onClick={handleBuyNow}
									className="bg-primary py-3 w-full px-2 lg:px-6 text-white  text-center active:scale-95 rounded"
									style={{
										backgroundColor: settings?.colors?.primary,
										color: settings?.colors?.primary_text,
									}}
								>
									<IoIosFlash size={24} />{" "}
									<span className="mr-2">
										{translations["buy-now"] || "Buy now"}
									</span>
								</button>
							</div>
						</div>

						{/* Product Descriptions */}
						<div className="pt-8 pb-4">
							<div className="description">
								<h4 className="text-2xl font-bold font-title text-slate-900">
									{translations["product-description"] || "Description"}:
								</h4>
								<ViewHTML htmlText={product?.details} />
							</div>
							{product.includedProducts?.length ? (
								<div className="mt-8">
									<h4 className="text-2xl font-bold font-title text-slate-900 mb-4">
										{translations["product-included"] || "Product Included"}
									</h4>
									<Image
										src={product.includedProducts[0]?.image}
										alt="Insta 360"
										width={628}
										height={510}
										className="w-full h-[300px] lg:h-[510px]"
									/>
								</div>
							) : null}
							{product?.review_video && (
								<div className="mt-8">
									<h4 className="text-2xl font-bold font-title text-slate-900">
										{translations["review-video"] || "Review Video"}
									</h4>
									{/* [&>div>iframe]:rounded-xl relative */}
									<div className="slider-imag mt-4 [&>div>iframe]:w-full">
										<ViewHTML htmlText={product?.review_video} />
									</div>
								</div>
							)}

							<div className="contact mt-8 bg-amber-200  border p-4 mb-4 text-center">
								<h5 className="text-2xl font-bold font-title text-slate-900 mb-3">
									{translations["contact-for-more-details"] ||
										"Contact for more details"}
								</h5>
								<p className="flex justify-center items-center gap-4">
									<span className="text-base text-slate-900">
										{translations["call-now"] || "Call Now"}:
									</span>{" "}
									<Link
										href={`tel:${settings?.phone[0]}`}
										className="text-2xl font-bold font-title text-primary"
									>
										<BsFillTelephoneFill /> {settings?.phone[0]}
									</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductDetails;
