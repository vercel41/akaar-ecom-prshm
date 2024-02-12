"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import NoItems from "../_components/NoItems";
import { getFormattedDate } from "@/utils/format-date";
import PaymentModal from "@/components/modals/PaymentModal";
import { useGetOrdersQuery } from "@/store/features/api/orderAPI";
import ItemsListLoader from "@/components/elements/loaders/ItemsListLoader";

const MyOrders = () => {
	const [selectedOrder, setSelectedOrder] = useState(null);
	const { data: ordersData, isLoading } = useGetOrdersQuery();
	const { settings, translations } = useSelector((state) => state.common);
	const myOrders = ordersData?.data || [];
	// console.log(myOrders);
	return (
		<>
			<div className="py-6 md:px-10 px-3">
				<h2 className="text-slate-600 text-2xl text-center md:text-start">
					{translations["recent-order-history"] || "Recent Order History"}
				</h2>

				{isLoading ? (
					<div className="py-4">
						<ItemsListLoader
							itemHeight={110}
							numItems={2}
							noImage={true}
							viewBoxWidth={900}
						/>
					</div>
				) : myOrders.length ? (
					<div className="py-3">
						<div class="flex flex-col">
							<div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
								<div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
									<div class="overflow-hidden">
										<table class="min-w-full border text-center text-sm font-light">
											<thead
												class="border-b font-medium"
												style={{
													backgroundColor: settings?.colors?.primary,
													color: settings?.colors?.primary_text,
												}}
											>
												<tr>
													<th scope="col" class="border-r px-6 py-3">
														{translations["sl"] || "SL"}
													</th>
													<th scope="col" class="border-r px-6 py-3">
														{translations["invoice_no"] || "Invoice_No"}
													</th>
													<th scope="col" class="border-r px-6 py-3">
														{translations["date"] || "Date"}
													</th>
													<th scope="col" class="border-r px-6 py-3">
														{translations["status"] || "Status"}
													</th>
													<th scope="col" class="border-r px-6 py-3">
														{translations["payment-type"] || "Payment Type"}
													</th>
												</tr>
											</thead>
											<tbody>
												{myOrders.map((order, index) => (
													<tr key={index} class="border-b">
														<td class="whitespace-nowrap border-r px-6 py-4 font-medium">
															{index + 1}
														</td>
														<td class="whitespace-nowrap border-r px-6 py-4">
															<Link
																href={`/dashboard/my-orders/details/${order.id}`}
																className="text-secondary"
															>
																#{order.invoice_no}
															</Link>
														</td>
														<td class="whitespace-nowrap border-r px-6 py-4">
															{getFormattedDate(order.sale_date)}
														</td>
														<td class="whitespace-nowrap border-r px-6 py-4">
															{order.status === "Delivery"
																? "Product on the way to shipment"
																: order.status}
														</td>
														<td class="whitespace-nowrap border-r px-6 py-4">
															{order.payment_type === "COD" ? (
																"Cash on Delivery"
															) : order.due_amount > 0 ? (
																<button
																	onClick={() => setSelectedOrder(order?.id)}
																>
																	Online{" "}
																	<span className="text-red-500 text-xs">
																		(Payment Failed)
																	</span>
																</button>
															) : (
																"Online"
															)}
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				) : (
					<NoItems title={"No Orders"} />
				)}
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

export default MyOrders;
