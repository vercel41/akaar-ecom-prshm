"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Modal from "../elements/Modal";
import { useForm } from "react-hook-form";
import axiosInstance from "@/lib/axios-instance";
import { addDiscountInfo } from "@/store/features/cartSlice";
import { setGlobalLoader } from "@/store/features/commonSlice";

const CouponModal = ({ showModal, setShowModal }) => {
	const { translations } = useSelector((state) => state.common);
	const [error, setError] = useState("");
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data, event) => {
		event.preventDefault();
		setError("");
		dispatch(setGlobalLoader(true));
		try {
			const coupon = data.coupon_code;
			const response = await axiosInstance.get(`coupons/${coupon}`);
			dispatch(setGlobalLoader(false));
			if (response.status === 200) {
				dispatch(addDiscountInfo(response.data.data));
				toast.success(
					`Coupon added, Applicable for minimum order amount ${response.data.data.minimum_order}`
				);
				setShowModal(false); //closing coupon modal
			} else {
				setError("Invalid coupon code");
			}
		} catch (error) {
			setError(error?.response?.data?.message || "Invalid coupon code");
			dispatch(setGlobalLoader(false));
		}
	};
	return (
		<Modal
			showModal={showModal}
			setShowModal={setShowModal}
			title={translations["coupon"] || "Coupon"}
		>
			<div className="w-full lg:w-[27rem] text-slate-500">
				<form className="" onSubmit={handleSubmit(onSubmit)}>
					<div className="mt-6 mb-8 form-control">
						<input
							type="text"
							className="w-full"
							name="coupon_code"
							placeholder="Type coupon code here"
							{...register("coupon_code", {
								required: "Coupon code is required.",
							})}
						/>
						{errors.coupon_code && (
							<p className="errorMsg">{errors.coupon_code.message}</p>
						)}
						{error && (
							<p className="errorMsg">Invalid or Expired Coupon Code</p>
						)}
					</div>
					<div className="flex justify-center">
						<button type="submit" className="primary-btn px-16">
							Apply
						</button>
					</div>
				</form>
			</div>
		</Modal>
	);
};

export default CouponModal;
