"use client";
import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";
import { getFormattedDate } from "@/utils/format-date";
const Lottie = dynamic(() => import("lottie-react"));
import successAnimation from "@/public/assets/lottie/success_2.json";
import { siteConfig } from "@/config/site";

const OrderSuccess = ({ params }) => {
	const { order_info, locale } = params;

	// console.log(order_info);
	return (
		<div className="container">
			<div className="w-full md:w-[540px] mx-auto my-12 md:my-28 p-5 border border-slate-200">
				<div className="text-center font-bold">
					<div className="flex-center h-28">
						<Lottie
							animationData={successAnimation}
							className="h-full"
							loop={false}
						/>
					</div>
					<h1 className="text-slate-800 text-3xl font-title">
						Order Successful!
					</h1>
					<h3 className="text-slate-800 text-2xl my-2">
						Thank you for ordering
					</h3>
				</div>
				<div className="order-info">
					<div className="order-info bg-slate-50 py-4 m-4 border-y border-slate-200">
						<div className="flex-between my-2">
							<p>Invoice No</p>
							<p>#{order_info[1]}</p>
						</div>
						<div className="flex-between my-2">
							<p>Date</p>
							<p>{getFormattedDate(new Date())}</p>
						</div>
						<div className="border-b border-slate-700 my-2"></div>
						<div className="flex-between my-2 font-bold">
							<p>
								Amount <span className="bg-red-100 px-2 text-red-500">Due</span>
							</p>
							<p>
								{siteConfig.currency.shortForm}
								{order_info[2]}
							</p>
						</div>
					</div>
					<div className="actions px-4 my-6 flex flex-col md:flex-row gap-4 justify-between items-center">
						<Link
							target="_blank"
							href={`${process.env.serverBaseUrl}/in/${order_info[3]}/${order_info[0]}/sale`}
							className="border border-primary py-3 w-full px-6 text-center active:scale-95"
						>
							Download Invoice
						</Link>
						<Link
							href={"/products"}
							className="bg-primary py-3 w-full px-6 text-white text-center active:scale-95"
						>
							Continue shopping
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderSuccess;
