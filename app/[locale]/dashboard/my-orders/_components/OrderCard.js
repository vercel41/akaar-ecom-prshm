"use client";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { HiLocationMarker } from "react-icons/hi";
import { HiArrowLongRight } from "react-icons/hi2";
import orderFilterKeys from "./OrderFilterKeys";
import handleSSLOrderPayLater from "@/lib/ssl-pay";
import { setGlobalLoader } from "@/store/features/commonSlice";
import { getBdFormattedDate } from "@/utils/format-date";

function OrderCard({ order }) {
	const dispatch = useDispatch();

	const {
		id,
		invoice_no,
		sale_date,
		status,
		total_amount,
		// paid_amount,
		due_amount,
		shipping,
		total_product,
		payment_type,
	} = order;

	const getOrderStatus = (status) => {
		let statusElement = <span className="rounded-lg px-2 py-1">{status}</span>;
		switch (status) {
			case orderFilterKeys.pending:
				statusElement = (
					<span className="rounded-lg px-2 py-1 bg-yellow-500">পেন্ডিং</span>
				);
				break;
			case orderFilterKeys.confirmed:
				statusElement = (
					<span className="rounded-lg px-2 py-1 bg-secondary-700">নিশ্চিত</span>
				);
				break;
			case orderFilterKeys.inDeliver:
				statusElement = (
					<span className="rounded-lg px-2 py-1 bg-blue-500">ডেলিভারিতে</span>
				);
				break;
			case orderFilterKeys.complete:
				statusElement = (
					<span className="rounded-lg px-2 py-1 bg-green-500">সম্পন্ন</span>
				);
				break;
			case orderFilterKeys.cancelled:
				statusElement = (
					<span className="rounded-lg px-2 py-1 bg-red-500">বাতিল</span>
				);
				break;
		}
		return statusElement;
	};

	return (
		<div className="text-slate-900 p-4 rounded-xl bg-slate-100 hover:border hover:border-primary my-4">
			<div className="grid grid-cols-4 justify-between">
				<div>
					<h3 className="text-slate-500 mb-3">তারিখ</h3>
					<h3>{getBdFormattedDate(sale_date)}</h3>
				</div>
				<div>
					<h3 className="text-slate-500 mb-3">অর্ডার আইডি</h3>
					<h3>{invoice_no}</h3>
				</div>
				<div>
					<h3 className="text-slate-500 mb-3">টাকার পরিমান</h3>
					<h3>
						৳ {total_amount || "Invalid"}{" "}
						<span
							className={`${
								due_amount > 0 ? "text-red-500" : "text-green-500"
							}`}
						>
							{due_amount > 0
								? payment_type !== "COD"
									? "পেমেন্ট অসম্পূর্ণ"
									: "বাকি"
								: "পরিশোধ"}
						</span>
					</h3>
				</div>
				{due_amount > 0 && payment_type !== "COD" ? (
					<div className="text-right">
						<button
							onClick={() =>
								handleSSLOrderPayLater(id, (loading) =>
									dispatch(setGlobalLoader(loading))
								)
							}
							className="inline-block bg-primary py-2 px-4 text-white rounded-lg text-center active:scale-95"
						>
							পেমেন্ট করুন
						</button>
					</div>
				) : (
					<div className="text-right">
						<h3 className="text-white mb-3">{getOrderStatus(status)}</h3>
						<h3>{total_product} টি প্রডাক্ট</h3>
					</div>
				)}
			</div>
			<div className="border-b border-slate-300 my-3"></div>
			<div className="flex justify-between items-center">
				<h3>
					<HiLocationMarker className="text-red-500" /> {shipping?.address}
				</h3>
				<Link
					href={`/dashboard/my-orders/details/${id}`}
					className="text-slate-500 hover:text-secondary"
				>
					বিস্তারিত দেখুন <HiArrowLongRight />
				</Link>
			</div>
		</div>
	);
}

export default OrderCard;
