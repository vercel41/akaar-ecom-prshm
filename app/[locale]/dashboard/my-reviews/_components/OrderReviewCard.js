"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import ReviewSummaryPopover from "./ReviewSummaryPopover";
import { getBdFormattedDate } from "@/utils/format-date";
import noImage from "@/public/assets/images/no-image.png";
import { Rating } from "react-simple-star-rating";

const OrderReviewCard = ({ sellReview }) => {
	const { id, total_review, delivered_at, products } = sellReview;
	// console.log(sellReview);
	const [reviewOpen, setReviewOpen] = useState(null);

	//Popover
	const popoverRef = useRef(null);

	// Function to toggle popover for a specific index
	const togglePopover = (index) => {
		if (reviewOpen !== null) {
			setReviewOpen(null);
		} else {
			setReviewOpen(index);
		}
	};

	//useRef issue need to fix
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (popoverRef.current && !popoverRef.current.contains(event.target)) {
				setReviewOpen(null);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
	//end of popover

	return (
		<div className="relative mb-8">
			<div className="sec-heading absolute top-[-10px] left-0 w-full px-8">
				<span className="bg-white text-secondary-700 px-2">
					ডেলিভারি সম্পন্ন হয়েছে: {getBdFormattedDate(delivered_at)}
				</span>
			</div>
			<div className="p-4 bg-white rounded-2xl border-2 border-slate-200 mb-3">
				<div className="ordered-items">
					{products.map((product, index) => (
						<div key={index + Date.now()} className={`flex gap-4 my-4`}>
							<div className="">
								<Image
									src={product.image || noImage}
									alt="product"
									height={80}
									width={80}
									className="h-20 w-20 rounded-lg"
								/>
							</div>
							<div className="flex flex-col gap-1 w-full">
								<h2>
									<Link
										href={`/products/${product.slug}`}
										className="product-title text-base font-semibold text-slate-900 font-body overflow-text"
									>
										{product.product_name}
									</Link>
								</h2>
								<div className="flex products-center justify-between text-sm">
									{product.color && product.size && (
										<div className="flex items-center gap-3">
											<div className="px-2 border border-slate-300 rounded-md">
												{product.color}
											</div>
											<div className="px-2 border border-slate-300 rounded-md">
												{product.size}
											</div>
										</div>
									)}
									{total_review ? (
										<div className="ml-auto relative" ref={popoverRef}>
											<span
												className="flex items-center gap-1 text-primary cursor-pointer"
												onClick={() => togglePopover(index)}
											>
												<Rating
													initialValue={product?.reviews?.rating || 5}
													allowFraction
													readonly
													size={24}
													transition
													fillColor="#F59E0B"
												/>
											</span>
											{reviewOpen === index && (
												<ReviewSummaryPopover review={product?.reviews} />
											)}
										</div>
									) : null}
								</div>
							</div>
						</div>
					))}
				</div>
				{!total_review ? (
					<div className="flex justify-end mt-4">
						<Link href={`/dashboard/my-reviews/new/${id}`} className="text-btn">
							রিভিউ লিখুন <BsArrowRight />
						</Link>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default OrderReviewCard;
