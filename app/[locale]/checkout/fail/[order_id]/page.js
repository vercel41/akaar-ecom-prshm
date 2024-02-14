"use client";
import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import ArticleLoader from "@/components/elements/loaders/ArticleLoader";

const Lottie = dynamic(() => import("lottie-react"));
import failedAnimation from "@/public/assets/lottie/payment_failed.json";
import { siteConfig } from "@/config/site";
import PaymentModal from "@/components/modals/PaymentModal";
import useOrderSummary from "@/hooks/useOrderSummary";
import { useSelector } from "react-redux";

const PaymentFail = ({ params }) => {
	const { order_id } = params;
	const [selectedOrder, setSelectedOrder] = useState(null);
	const { order, loading, error } = useOrderSummary(order_id);
	const { settings } = useSelector((state) => state.common);
	const isGuestCheckout = !!settings?.guest_checkout;

	return (
		<>
			<div className="container">
				<div className="w-full md:w-[540px] mx-auto my-12 md:my-28  p-5 border border-slate-200">
					<div className="text-center">
						<div className="flex-center h-36">
							<Lottie
								animationData={failedAnimation}
								className="h-full"
								loop={false}
							/>
						</div>
						<h1 className="text-red-500 text-4xl mt-2 font-bold">
							Payment Failed
						</h1>
						<h3 className="text-slate-600 mt-2 text-xl">
							Your order has been confirmed, but payment not complete
						</h3>
					</div>
					{loading ? (
						<ArticleLoader />
					) : (
						<>
							<div className="order-info bg-slate-50 px-3 py-4 m-4 border-y border-slate-200">
								<div className="flex-between my-2">
									<p>Invoice No</p>
									<p>{order?.invoice_no}</p>
								</div>
								<div className="flex-between my-2">
									<p>Due Amount</p>
									<p>
										{siteConfig.currency.shortForm}
										{order?.due_amount}
									</p>
								</div>
							</div>
							<div className="order-actions px-4 my-6 flex flex-col md:flex-row gap-4 justify-between items-center">
								{!isGuestCheckout && (
									<Link
										href={`/dashboard/my-orders/details/${order_id}`}
										className="border border-primary py-3 w-full px-6 text-center active:scale-95"
									>
										View Order
									</Link>
								)}
								<button
									onClick={() => setSelectedOrder(order?.id)}
									className="bg-primary py-3 w-full px-6 text-white text-center active:scale-95"
								>
									Make payment
								</button>
							</div>
						</>
					)}
				</div>
			</div>
			{selectedOrder && (
				<PaymentModal
					selectedOrder={selectedOrder}
					setSelectedOrder={setSelectedOrder}
				/>
			)}
		</>
	);
};

export default PaymentFail;
