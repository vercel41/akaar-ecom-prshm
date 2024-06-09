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
import RequireAuth from "@/components/hoks/RequireAuth";
import * as pixel from "/lib/fpixel";

//Icons
import { FiPlus } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { useGetPaymentMethodsQuery } from "@/store/api/paymentMethodsAPI";
import { siteConfig } from "@/config/site";
import useOrderPlace from "@/hooks/useOrderPlace";
import useProfileUpdate from "@/hooks/useProfileUpdate";
import ShippingForm from "./ShippingForm";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { toast } from "react-toastify";

const Checkout = () => {
	// Dynamic delivery charges
	const { settings, translations, isFbPixelInitialized } = useSelector(
		(state) => state.common
	);
	const flag = useRef(true);
	// console.log(settings);
	const deliveryAreas = [
		{
			key: `inside dhaka`,
			title: `Inside ${settings?.delivery_region || "Dhaka"}`,
			charges: settings?.inside_dhaka_delivery_charges,
		},
		// {
		// 	key: "sub dhaka",
		// 	title: `Sub ${settings?.delivery_region || "Dhaka"}`,
		// 	charges: settings?.sub_dhaka_delivery_charges,
		// },
		{
			key: "outside dhaka",
			title: `Outside ${settings?.delivery_region || "Dhaka"}`,
			charges: settings?.outside_dhaka_delivery_charges,
		},
	];

	const [deliveryArea, setDeliveryArea] = useState(null); // default delivery area removed
	const [isDeliveryChargeRequired, setIsDeliveryChargeRequired] =
		useState(false);
	const [selectedPayMethod, setSelectedPayMethod] = useState(null);
	const [orderCollapsed, setOrderCollapsed] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const { cart, discountCoupon } = useSelector((state) => state.cart);
	const { user, isLoading } = useSelector((state) => state.auth);
	const { handleOrderPlace } = useOrderPlace(); //custom hook for separating order place business logics
	const { handleUserUpdate } = useProfileUpdate(); //custom hook for separating profile update business logics
	const isMobile = useMediaQuery("(max-width: 768px)"); // checking for mobile

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
		settings?.free_delivery_charges_limit > totalWithDiscount ||
		settings?.free_delivery_charges_limit <= 0
			? deliveryArea?.charges || 0
			: 0;

	const grandTotal = totalWithDiscount + deliveryCharge;

	//Handling delivery area and delivery charge Required
	const handleDeliveryAreaChange = (area) => {
		setDeliveryArea(area);
		switch (area?.key) {
			case "inside dhaka":
				settings?.is_delivery_charge_required_for_inside
					? setIsDeliveryChargeRequired(true)
					: setIsDeliveryChargeRequired(false);
				break;
			case "sub dhaka":
				settings?.is_delivery_charge_required_for_sub_region
					? setIsDeliveryChargeRequired(true)
					: setIsDeliveryChargeRequired(false);
				break;
			case "outside dhaka":
				settings?.is_delivery_charge_required_for_outside
					? setIsDeliveryChargeRequired(true)
					: setIsDeliveryChargeRequired(false);
				break;
			default:
				setIsDeliveryChargeRequired(false);
				break;
		}
	};

	// console.log(isDeliveryCharge);

	//auto select payment method
	useEffect(() => {
		if (Object.keys(paymentMethods).length > 0) {
			let activePayments = Object.values(paymentMethods).filter(
				(payMethod) => payMethod?.status === 1
			);

			if (
				activePayments?.length > 1 &&
				isDeliveryChargeRequired &&
				activePayments[0].key === "COD" &&
				deliveryCharge
			) {
				setSelectedPayMethod(activePayments[1]);
			} else {
				setSelectedPayMethod(activePayments[0]);
			}
		}
	}, [paymentMethods, deliveryCharge, isDeliveryChargeRequired]);

	const paymentOptions = [
		{
			key: "delivery_charge_payment",
			title: `Pay delivery charge only`,
			value: deliveryArea?.charges || 0,
		},
		{
			key: "total_payment",
			title: `Pay total amount`,
			value: grandTotal,
		},
	];
	const [selectedPaymentOption, setSelectedPaymentOption] = useState(
		"delivery_charge_payment"
	);

	const handleCheckoutSubmit = async (data) => {
		if (!deliveryArea) {
			document.getElementById("deliveryAreaError").classList.remove("hidden");
			toast.error("Please select delivery area");
			return;
		}

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
			delivery_type: deliveryCharge ? deliveryArea.key : "free delivery",
			delivery_charge: deliveryCharge,
			coupon: discountCoupon?.code || null,
			coupon_discount: discountedPrice,
			subtotal: total,
			after_discount: totalWithDiscount,
			grand_total: grandTotal,
			paymentOption:
				isDeliveryChargeRequired && deliveryCharge
					? selectedPaymentOption
					: "total_payment",
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

	// Facebook Pixel Initiate Checkout Event
	useEffect(() => {
		// Check if product ID exists to avoid errors
		if (isFbPixelInitialized && flag.current && cart.length > 0) {
			pixel.event(
				"InitiateCheckout",
				pixel.getInitiateCheckoutPixelData(cart, total)
			);
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
			{/* Shipping Address are for mobile  */}
			{isMobile && (
				<ShippingForm
					handleSubmit={handleSubmit}
					errors={errors}
					register={register}
					isLoading={isLoading}
					handleCheckoutSubmit={handleCheckoutSubmit}
					user={user}
					translations={translations}
				/>
			)}
			<div className="grid lg:grid-cols-2 mb-8 gap-14">
				<div
					id="checkout-left"
					className="border border-slate-200 grid grid-cols-1"
				>
					{/* Delivery Options  */}
					{settings?.free_delivery_charges_limit > totalWithDiscount ||
					settings?.free_delivery_charges_limit <= 0 ? (
						<div className="lg:order-2 px-3 lg:px-9 py-4">
							<h4 className="text-slate-700 font-bold">
								{translations["select-delivery-area"] || "Select Delivery Area"}
							</h4>
							<div className="flex flex-col gap-3 pt-3">
								{deliveryAreas.map((area) => (
									<button
										key={area.key}
										className="flex gap-2 items-center border border-slate-200 p-3"
										onClick={() => handleDeliveryAreaChange(area)}
									>
										<CustomRadio
											isChecked={deliveryArea?.key === area.key}
											label={area.title}
											// onClick={() => setDeliveryArea(area)}
										/>
										<p>
											{siteConfig.currency.sign}
											{area.charges}
										</p>
									</button>
								))}
							</div>
							{!deliveryArea && (
								<p id="deliveryAreaError" className="hidden errorMsg">
									You must select delivery area
								</p>
							)}
						</div>
					) : null}
					{/* Cart Items  */}
					<div className="lg:order-1">
						<div className="border-b border-slate-200 text-left p-3 lg:p-5">
							<h3 className="text-xl">
								{cart.length}{" "}
								{translations["item-in-your-bag"] || "item in your bag"}
							</h3>
						</div>
						<div className="border-b border-slate-200 p-3 lg:p-5">
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
					</div>

					{/* Order Summery  */}
					<div className="lg:order-3 text-slate-700 px-3 lg:px-9 py-4 bg-white my-3">
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
						{deliveryArea && (
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
						)}
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
				<div id="checkout-right">
					{/* Shipping Address Area for web*/}
					{!isMobile && (
						<ShippingForm
							handleSubmit={handleSubmit}
							errors={errors}
							register={register}
							isLoading={isLoading}
							handleCheckoutSubmit={handleCheckoutSubmit}
							user={user}
							translations={translations}
						/>
					)}
					{/* Payment Area  */}
					<div>
						{isDeliveryChargeRequired && deliveryCharge ? (
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
											onClick={() => setSelectedPaymentOption(payOption.key)}
										>
											<CustomRadio
												isChecked={payOption.key === selectedPaymentOption}
												label={payOption.title}
												// onClick={() => setDeliveryArea(pt)}
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
											isDeliveryChargeRequired &&
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
					</div>
					{/* Order Now Button  */}
					<div className="form-control mt-7">
						<button
							disabled={!cart?.length}
							// type="submit"
							onClick={() => handleSubmit(handleCheckoutSubmit)()}
							className="primary-btn w-full disabled:bg-slate-300 disabled:cursor-not-allowed"
							style={{
								backgroundColor: settings?.colors?.primary,
								color: settings?.colors?.primary_text,
								border: `1px solid ${settings?.colors?.primary_text}`,
							}}
						>
							{translations["order-now"] || "Order Now"}
						</button>
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
