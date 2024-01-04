"use client";
import { useState } from "react";
import NoItems from "../_components/NoItems";
import OrderReviewCard from "./_components/OrderReviewCard";
import { useGetUserReviewsQuery } from "@/store/features/api/productReviewAPI";
import {
	getFilteredByKeyNotValue,
	getFilteredByKeyValue,
} from "@/utils/filter-items";
import { getCountByKeyNotValue, getCountByKeyValue } from "@/utils/items-count";
import ItemsListLoader from "@/components/elements/loaders/ItemsListLoader";

export default function MyReview() {
	const { data, isLoading } = useGetUserReviewsQuery();
	const myReviews = data?.data || [];
	// console.log(myReviews);
	const [isReviewed, setIsReviewed] = useState(false);

	let filteredReviews = [];
	if (!isReviewed && !isLoading) {
		filteredReviews = getFilteredByKeyValue(myReviews, "total_review", 0);
	} else if (!isLoading) {
		filteredReviews = getFilteredByKeyNotValue(myReviews, "total_review", 0);
	}

	return (
		<div className="px-10 py-6">
			<div className="mb-6">
				<h2 className="text-slate-900 font-bold text-2xl">আমার রিভিউ</h2>
			</div>
			<div className="flex items-center mt-4 gap-4 border-b border-slate-300">
				<button
					className={`font-title bg-transparent box-border py-2 border-b-2 ${
						!isReviewed ? "border-primary" : "border-transparent"
					}`}
					onClick={() => setIsReviewed((preRevState) => !preRevState)}
				>
					<span>
						রিভিউ পেন্ডিং ({getCountByKeyValue(myReviews, "total_review", 0)})
					</span>
				</button>
				<button
					className={`font-title bg-transparent box-border py-2 border-b-2 ${
						isReviewed ? "border-primary" : "border-transparent"
					}`}
					onClick={() => setIsReviewed((preRevState) => !preRevState)}
				>
					<span>
						রিভিউ হয়েছে ({getCountByKeyNotValue(myReviews, "total_review", 0)})
					</span>
				</button>
			</div>
			{isLoading ? (
				<div className="py-8">
					<ItemsListLoader itemHeight={110} noImage={true} viewBoxWidth={900} />
				</div>
			) : (
				<div className="my-reviews mt-8">
					{filteredReviews.length ? (
						filteredReviews.map((sellReview, index) => (
							<OrderReviewCard key={index} sellReview={sellReview} />
						))
					) : (
						<NoItems title={"কোন রিভিউ নেই"} />
					)}
				</div>
			)}
		</div>
	);
}
