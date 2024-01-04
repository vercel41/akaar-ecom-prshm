"use client";
import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import ArticleLoader from "@/components/elements/loaders/ArticleLoader";
import { useGetOrderByIdQuery } from "@/store/features/api/orderAPI";
import handleSSLOrderPayLater from "@/lib/ssl-pay";
import { setGlobalLoader } from "@/store/features/commonSlice";
const Lottie = dynamic(() => import("lottie-react"));
import failedAnimation from "@/public/assets/lottie/payment_failed.json";

const PaymentFail = ({ params }) => {
	const dispatch = useDispatch();
	const { order_id, locale } = params;
	const { data: orderData, isLoading } = useGetOrderByIdQuery({
		order_id,
		locale,
	});
	const order = orderData?.sale || null;

	return (
		<div className="container min-h-screen">
			<div className="w-full md:w-[540px] mx-auto mt-12 lg:mt-28  mb-12 p-5 border border-slate-200">
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
				{isLoading ? (
					<ArticleLoader />
				) : (
					<>
						<div className="order-info bg-slate-50 py-4 m-4 border-y border-slate-200">
							<div className="flex-between my-2">
								<p>Invoice No</p>
								<p>{order?.invoice_no}</p>
							</div>
							<div className="flex-between my-2">
								<p>Due Amount</p>
								<p>Tk.{order?.due_amount}</p>
							</div>
						</div>
						<div className="order-actions px-4 my-6 flex flex-col md:flex-row gap-4 justify-between items-center">
							<Link
								href={`/dashboard/my-orders/details/${order_id}`}
								className="border border-primary py-3 w-full px-6 text-center active:scale-95"
							>
								View Order
							</Link>
							<button
								onClick={() =>
									handleSSLOrderPayLater(order?.id, (loading) =>
										dispatch(setGlobalLoader(loading))
									)
								}
								className="bg-primary py-3 w-full px-6 text-white text-center active:scale-95"
							>
								Make payment
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default PaymentFail;
