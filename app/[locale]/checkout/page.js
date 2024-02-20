"use client";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

import {
	getCartTotal,
	getCouponDiscount,
	getOrderFormattedCartItems,
} from "@/lib/checkout";

//components
import CartCard from "@/components/cards/CartCard";
import CustomRadio from "@/components/elements/CustomRadio";
import CouponModal from "@/components/modals/CouponModal";
import ArticleLoader from "@/components/elements/loaders/ArticleLoader";
import RequireAuth from "@/components/hoks/RequireAuth";
import FieldsetInput from "@/components/elements/FieldsetInput";
import * as pixel from "/lib/fpixel";

//Icons
import { FiPlus } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { useGetPaymentMethodsQuery } from "@/store/features/api/paymentMethodsAPI";
import { siteConfig } from "@/config/site";
import useOrderPlace from "@/hooks/useOrderPlace";
import useProfileUpdate from "@/hooks/useProfileUpdate";

const Checkout = () => {
	// Dynamic delivery charges
	const { settings, translations, isFbPixelInitialized } = useSelector(
		(state) => state.common
	);
	const flag = useRef(true);
	// console.log(settings);
	const deliveryMethods = [
		{
			key: "inside dhaka",
			title: `${translations["inside-dhaka"] || "Inside Dhaka"}`,
			charges: settings?.inside_dhaka_delivery_charges,
		},
		{
			key: "outside dhaka",
			title: `${translations["outside-dhaka"] || "Outside Dhaka"}`,
			charges: settings?.outside_dhaka_delivery_charges,
		},
	];

	const [deliveryMethod, setDeliveryMethod] = useState(deliveryMethods[0]);
	const [selectedPayMethod, setSelectedPayMethod] = useState(null);
	const [orderCollapsed, setOrderCollapsed] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const { cart, discountCoupon } = useSelector((state) => state.cart);
	const { user, isLoading } = useSelector((state) => state.auth);
	const { handleOrderPlace } = useOrderPlace(); //custom hook for separating order place business logics
	const { handleUserUpdate } = useProfileUpdate(); //custom hook for separating profile update business logics

	const { data: paymentMethodsData } = useGetPaymentMethodsQuery();
	const paymentMethods = useMemo(
		() => paymentMethodsData?.data || {},
		[paymentMethodsData]
	);

	//slicing cart items based on orderCollapsed
	const cartItems = orderCollapsed ? cart : cart.slice(0, 3);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	useEffect(() => {
		reset();
	}, [user, reset]);

	//Summary calculation
	// const total = getMultipliedColumnTotal(cart, "quantity", "new_price");
	const total = getCartTotal(cart);
	const discountedPrice = getCouponDiscount(discountCoupon, total);
	const totalWithDiscount = total - discountedPrice;

	//Handling free delivery charge
	const deliveryCharge =
		settings?.free_delivery_charges_limit > totalWithDiscount
			? deliveryMethod.charges
			: 0;

	const grandTotal = totalWithDiscount + deliveryCharge;

	// console.log(isDeliveryCharge);

	//auto select payment method
	useEffect(() => {
		if (Object.keys(paymentMethods).length > 0) {
			let activePayments = Object.values(paymentMethods).filter(
				(payMethod) => payMethod?.status === 1
			);

			if (
				activePayments?.length > 1 &&
				settings?.is_delivery_charge_required &&
				activePayments[0].key === "COD" &&
				deliveryCharge
			) {
				setSelectedPayMethod(activePayments[1]);
			} else {
				setSelectedPayMethod(activePayments[0]);
			}
		}
	}, [paymentMethods, deliveryCharge, settings?.is_delivery_charge_required]);

	const paymentOptions = [
		{
			key: "delivery_charge_payment",
			title: `Pay delivery charge only`,
			value: deliveryMethod.charges,
		},
		{
			key: "total_payment",
			title: `Pay total amount`,
			value: grandTotal,
		},
	];
	const [selectedPaymentOption, setSelectedPaymentOption] = useState(
		settings?.is_delivery_charge_required ? paymentOptions[0] : null
	);

	const handleCheckoutSubmit = async (data) => {
		let phone = data?.phone;
		let alt_phone = data?.phone;
		let fullAddress = data.address + ", " + data.city;

		//for authorized u
		if (!settings?.guest_checkout) {
			alt_phone =
				siteConfig.phone.countryCode + user?.phone || user?.alt_phone_no;
		}
		const newOrder = {
			name: data.name,
			alt_name: data.name,
			phone: phone,
			alt_phone: alt_phone,
			address: fullAddress,
			alt_address: fullAddress,
			order_items: getOrderFormattedCartItems(cart),
			payment_method: selectedPayMethod,
			delivery_type: deliveryCharge ? deliveryMethod.key : "free delivery",
			delivery_charge: deliveryCharge,
			coupon: discountCoupon?.code || null,
			coupon_discount: discountedPrice,
			subtotal: total,
			after_discount: totalWithDiscount,
			grand_total: grandTotal,
			paymentOption: selectedPaymentOption,
			// note: "",
		};
		// console.log(newOrder);
		handleOrderPlace(newOrder);

		// updating user for the first time only not applicable for guest checkout
		if (
			((!user?.phone && !user?.alt_phone_no) || !user?.address) &&
			!settings?.guest_checkout
		) {
			handleUserUpdate({
				...user,
				alt_phone_no: user?.alt_phone_no || data?.phone,
				address: user.address || data?.address,
				city: data?.city,
			});
		}
		// else alert("user not updated");
	};

	// //Facebook Pixel view content event
	useEffect(() => {
		// Check if product ID exists to avoid errors
		if (isFbPixelInitialized && flag.current && cart.length > 0) {
			const productContents = cart.map((item) => ({
				id: item.id,
				name: item.product_name,
				quantity: item.quantity,
				price: item.new_price,
				content_image_url: item.image,
				// category: item.category,
				// Add other optional properties if needed
			}));

			// console.log(productContents);

			pixel.event("InitiateCheckout", {
				value: total, // Total order value in BDT
				currency: "BDT",
				content_ids: cart.map((item) => item.id),
				content_type: "product",
				contents: productContents,
				num_items: cart.length,
			});
			flag.current = false;
		}
	}, [cart, total, isFbPixelInitialized]);

	return (
		<section className="container pb-8">
			<div className="breadcrumb breadcrumb-2 py-5">
				<div className="">
					<div>
						<Link
							href={`/`}
							className="text-base text-slate-600 hover:text-secondary"
						>
							{translations["home"] || "Home"}
						</Link>
						<Link
							href={`/checkout`}
							className="text-base text-slate-600 hover:text-secondary"
						>
							{translations["checkout"] || "Checkout"}
						</Link>
					</div>
				</div>
			</div>
			<div className="grid lg:grid-cols-2 mb-8 gap-14">
				<div className="border border-slate-200">
					<div className="border-b border-slate-200 text-center lg:text-left p-5">
						<h3 className="text-xl">
							{cart.length}{" "}
							{translations["item-in-your-bag"] || "item in your bag"}
						</h3>
					</div>
					<div className="border-b border-slate-200 p-5">
						<div className="">
							{cartItems.map((item, index) =>
								index == 2 && !orderCollapsed ? (
									<div key={item} className="relative">
										<CartCard item={item} />
										<div className="w-full h-full rounded absolute left-0 top-0 flex-center backdrop-blur-sm">
											<button
												className="text-btn mt-20 font-bold"
												onClick={() => setOrderCollapsed(true)}
											>
												<FiPlus />
												{cart.length - 2}
											</button>
										</div>
									</div>
								) : (
									<CartCard key={item} item={item} />
								)
							)}
						</div>
					</div>
					<div className="px-5">
						{settings?.free_delivery_charges_limit > totalWithDiscount ? (
							<div className="p-4">
								<h4 className="text-slate-700 font-bold">
									{translations["delivery-options"] || "Delivery Options"}
								</h4>
								<div className="flex flex-col gap-3 pt-3">
									{deliveryMethods.map((dm) => (
										<button
											key={dm.key}
											className="flex gap-2 items-center border border-slate-200 p-3"
											onClick={() => setDeliveryMethod(dm)}
										>
											<CustomRadio
												isChecked={deliveryMethod.key === dm.key}
												label={dm.title}
												// onClick={() => setDeliveryMethod(dm)}
											/>
											<p>
												{siteConfig.currency.sign}
												{dm.charges}
											</p>
										</button>
									))}
								</div>
							</div>
						) : null}
						<div className="text-slate-700 p-4 bg-white my-3">
							<div className="flex-between my-2">
								<p>{translations["total"] || "Total"}</p>
								<p>
									{siteConfig.currency.shortForm}
									{total}
								</p>
							</div>
							<div className="flex-between my-2">
								<p>{translations["discount-amount"] || "Discount Amount"}</p>
								<p className="">
									-{siteConfig.currency.shortForm}
									{discountedPrice}
								</p>
							</div>
							<div className="flex-between my-2">
								<p>{translations["coupon-discount"] || "Coupon Discount"}</p>
								{discountCoupon ? (
									<span className="text-primary">{discountCoupon.code}</span>
								) : (
									<button
										className="text-btn underline"
										onClick={() => setShowModal(true)}
									>
										<AiOutlinePlus size={24} />
									</button>
								)}
							</div>
							<div className="border-b border-slate-300 my-2"></div>
							<div className="flex-between my-2">
								<p>
									{translations["total-with-discount"] || "Total with discount"}
								</p>
								<p>
									{siteConfig.currency.shortForm}
									{totalWithDiscount}
								</p>
							</div>
							<div className="flex-between my-2">
								<p>
									{translations["delivery-charge"] || "Delivery Charge"}{" "}
									{!deliveryCharge && (
										<span className="bg-green-100 px-2 text-green-500">
											Free
										</span>
									)}
								</p>
								<p>
									{siteConfig.currency.shortForm}
									{deliveryCharge}
								</p>
							</div>
							<div className="border-b border-slate-900 my-2"></div>
							<div className="flex-between my-2 font-bold">
								<p>{translations["grand-total"] || "Grand Total"}</p>

								<p>
									{siteConfig.currency.shortForm}
									{grandTotal}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div
				// className="border border-slate-200"
				>
					<div className="text-center lg:text-left pb-5">
						<h3 className="text-xl">
							{translations["shipping-address"] || "Shipping Address"}
						</h3>
					</div>
					<div className="border-b border-slate-200">
						<form
							className="w-full"
							onSubmit={handleSubmit(handleCheckoutSubmit)}
						>
							{isLoading ? (
								<ArticleLoader />
							) : (
								<>
									<div className="form-control mb-6">
										<FieldsetInput
											label={`${translations["name"] || "Name"}`}
											name="name"
											defaultValue={user?.name}
											register={register("name", {
												required: "Name is required.",
											})}
										/>
										{errors.name && (
											<p className="errorMsg">{errors.name.message}</p>
										)}
									</div>

									<div className="form-control mb-6">
										<FieldsetInput
											label={`${
												translations["phone-number"] || "Phone Number"
											}`}
											name="phone"
											defaultValue={user?.phone || user?.alt_phone_no}
											register={register("phone", {
												required: "Phone number is required.",
												pattern: {
													value: siteConfig.phone.patternWithCode,
													message: "Please enter a valid bangladeshi number",
												},
											})}
											type="tel"
											// disabled={!settings?.guest_checkout}
										/>

										{errors.phone && (
											<p className="errorMsg">{errors.phone.message}</p>
										)}
									</div>
									<div className="form-control mb-6">
										<FieldsetInput
											label={translations["address"] || "Address"}
											name="address"
											defaultValue={user?.address}
											register={register("address", {
												required: "Address line is required.",
											})}
										/>
										{errors.address && (
											<p className="errorMsg">{errors.address.message}</p>
										)}
									</div>
									<div className="form-control mb-6">
										<FieldsetInput
											label={translations["city"] || "City"}
											name="city"
											defaultValue={user?.city}
											register={register("city", {
												required: "City is required.",
											})}
										/>
										{errors.city && (
											<p className="errorMsg">{errors.city.message}</p>
										)}
									</div>
								</>
							)}
							<div className="form-control my-6">
								<div className="border-b-2 border-slate-300 border-dashed"></div>
							</div>
							{settings?.is_delivery_charge_required && deliveryCharge ? (
								<div className="form-control">
									<h4 className="text-slate-700 font-bold">
										{translations["payment-options"] || "Payment Options"}
									</h4>
									<div className="flex flex-col gap-3 pt-3">
										{paymentOptions.map((payOption) => (
											<button
												key={payOption.key}
												type="button"
												className="flex gap-2 items-center border border-slate-200 p-3"
												onClick={() => setSelectedPaymentOption(payOption)}
											>
												<CustomRadio
													isChecked={
														selectedPaymentOption.key === payOption.key
													}
													label={payOption.title}
													// onClick={() => setDeliveryMethod(pt)}
												/>
												<p>
													{siteConfig.currency.sign}
													{payOption.value}
												</p>
											</button>
										))}
									</div>
								</div>
							) : null}
							{selectedPayMethod && (
								<div className="form-control mt-4">
									<h4 className="text-slate-700 font-bold">
										{translations["payment-method"] || "Payment Method"}
									</h4>
									<div className="flex flex-col gap-3 mt-3">
										{Object.keys(paymentMethods).map((method, index) =>
											paymentMethods[method].status === 1 &&
											!(
												settings?.is_delivery_charge_required &&
												paymentMethods[method].key === "COD" &&
												deliveryCharge
											) ? (
												<div
													key={index}
													type="button"
													onClick={() =>
														setSelectedPayMethod(paymentMethods[method])
													}
													className="flex items-center justify-between border border-slate-200 p-3 cursor-pointer"
												>
													<CustomRadio
														isChecked={
															paymentMethods[method].title ===
															selectedPayMethod.title
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
								</div>
							)}
							<div className="form-control mt-7">
								<button
									disabled={!cart?.length}
									type="submit"
									className="primary-btn w-full disabled:bg-slate-300 disabled:cursor-not-allowed"
									style={{
										backgroundColor: settings?.colors?.primary,
										color: settings?.colors?.primary_text,
									}}
								>
									{translations["order-now"] || "Order Now"}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<CouponModal
				showModal={showModal}
				setShowModal={setShowModal}
				// total={total} //cart items total
			/>
		</section>
	);
};

export default RequireAuth(Checkout);
