"use client";
import React from "react";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import Modal from "../elements/Modal";
import ReviewImageSlider from "../elements/sliders/ReviewImageSlider";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { getFormattedDate } from "@/utils/format-date";
import { useGetReviewDetailsQuery } from "@/store/features/api/productReviewAPI";
import ItemsListLoader from "../elements/loaders/ItemsListLoader";
import useAddReviewReaction from "@/hooks/useAddReviewReaction";
import { useSelector } from "react-redux";

export default function ReviewViewModal({
	showModal,
	setShowModal,
	review: reviewFromProp,
	reviewId: reviewIdProp,
}) {
	const { user } = useSelector((state) => state.auth);
	let review = {};
	let api = user ? reviewIdProp + `?reference_id=${user.id}` : reviewIdProp;
	const { data, isLoading } = useGetReviewDetailsQuery(api, {
		skip: !reviewIdProp,
	});
	const reviewFromId = data?.data || {};

	if (reviewFromProp) {
		review = { ...reviewFromProp };
	} else {
		review = { ...reviewFromId };
	}

	const { handleReviewReact } = useAddReviewReaction(); //custom hook for reusing

	return (
		<Modal
			showModal={showModal}
			setShowModal={setShowModal}
			title={"কাস্টমারের দেয়া রিভিউ ছবি গুলো"}
		>
			{isLoading && reviewIdProp ? (
				<ItemsListLoader noImage={true} numItems={4} />
			) : (
				<div className="flex gap-6">
					<ReviewImageSlider images={review.images} />
					<div className="w-[245px]">
						<div id="user-info">
							<div className="flex items-center mb-4">
								<Rating
									initialValue={review.rating}
									allowFraction
									readonly
									size={24}
									transition
									fillColor="#F59E0B"
								/>
							</div>
							<div className="flex items-center gap-2">
								<div className="h-7 min-w-7 rounded-full">
									{review.customer?.image ? (
										<Image
											src={review.customer.image}
											alt={"male"}
											width={28}
											height={28}
											className="h-7 min-w-7 rounded-full"
										/>
									) : (
										<div className="h-7 min-w-7 rounded-full bg-slate-200 flex justify-center items-center font-semibold">
											{review.customer?.name.slice(0, 1)}
										</div>
									)}
								</div>

								<span className="font-bold overflow-text line-clamp-2">
									{review.customer?.name}
								</span>
							</div>

							<p className="text-slate-600 mt-3">
								{getFormattedDate(review.created_at)}
							</p>
						</div>
						<div
							id="review"
							className="border-b border-slate-200 py-4 flex flex-col gap-8 justify-center"
						>
							<p className="text-slate-700">{review.comment}</p>
							{review.product_variant && (
								<div className="actions flex-between text-slate-600">
									<p>কালার: {review.product_variant?.color}</p>
									<p>সাইজ: {review.product_variant?.size}</p>
								</div>
							)}
						</div>
						<div className="flex justify-end gap-4">
							<button
								onClick={() => handleReviewReact("like", review?.id)}
								className={`icon-btn hover:text-secondary ${
									review.is_liked ? "text-primary" : "text-slate-700"
								}`}
							>
								<AiFillLike /> {review.likes_count}
							</button>
							<button
								onClick={() => handleReviewReact("dislike", review?.id)}
								className={`icon-btn hover:text-secondary ${
									review.is_disliked ? "text-primary" : "text-slate-700"
								}`}
							>
								<AiFillDislike /> {review.dislikes_count}
							</button>
						</div>
					</div>
				</div>
			)}
		</Modal>
	);
}
