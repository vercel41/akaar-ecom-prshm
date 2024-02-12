"use client";
import Image from "next/image";
import Modal from "../elements/Modal";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomRadio from "../elements/CustomRadio";
import ItemsListLoader from "../elements/loaders/ItemsListLoader";
import { useGetPaymentMethodsQuery } from "@/store/features/api/paymentMethodsAPI";
import { setGlobalLoader } from "@/store/features/commonSlice";
import handleOrderPayLater from "@/lib/order-pay";

const PaymentModal = ({ selectedOrder, setSelectedOrder }) => {
	const { translations } = useSelector((state) => state.common);
	const [selectedPayMethod, setSelectedPayMethod] = useState(null);
	const { data: paymentMethodsData, isLoading } = useGetPaymentMethodsQuery();
	const paymentMethods = paymentMethodsData?.data || {};
	const dispatch = useDispatch();

	return (
		<Modal
			showModal={!!selectedOrder}
			setShowModal={() => setSelectedOrder(null)}
			title={translations["sdsd"] || "Payment Options"}
		>
			<div className="md:w-[500px]">
				{isLoading ? (
					<ItemsListLoader noImage={true} numItems={2} />
				) : (
					<div className="flex flex-col gap-3 mt-3">
						{Object.keys(paymentMethods).map((method, index) =>
							paymentMethods[method].status === 1 &&
							paymentMethods[method].key !== "COD" ? (
								<div
									key={index}
									onClick={() => setSelectedPayMethod(paymentMethods[method])}
									className="flex items-center justify-between border border-slate-200 p-3"
								>
									<CustomRadio
										isChecked={
											paymentMethods[method].title === selectedPayMethod?.title
										}
										label={paymentMethods[method].title}
									/>
									<div className="">
										<Image
											src={paymentMethods[method].icon}
											height={32}
											width={150}
											alt="icon"
											className="h-8 w-fit max-w-[150px]"
										/>
									</div>
								</div>
							) : null
						)}
					</div>
				)}
				<div className="order-actions mt-6 flex flex-col md:flex-row gap-4 justify-between items-center">
					<button
						className="border border-primary py-3 w-full px-6 text-center active:scale-95"
						onClick={() => setSelectedOrder(null)}
					>
						Cancel
					</button>
					<button
						onClick={() =>
							handleOrderPayLater(
								selectedOrder,
								selectedPayMethod?.title,
								(loading) => dispatch(setGlobalLoader(loading))
							)
						}
						disabled={!selectedPayMethod}
						className={`bg-primary py-3 w-full px-6 text-white text-center active:scale-95 ${
							!selectedPayMethod ? "opacity-30 cursor-not-allowed" : ""
						}`}
					>
						Confirm
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default PaymentModal;
