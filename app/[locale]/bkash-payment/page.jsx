"use client";

import { setGlobalLoader } from "@/store/features/commonSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function Home() {
	const dispatch = useDispatch();

	const bkashPaymentHandler = async () => {
		dispatch(setGlobalLoader(true));

		const res = await fetch("/api/payments/bkash", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				// authorization: `Bearer ${getToken()}`,
			},
			body: JSON.stringify({
				amount: 1,
				order_id: "fdfdfdfdfdf",
			}),
		});
		const result = await res.json();
		dispatch(setGlobalLoader(false));
		console.log(result);
		if (result?.status) {
			toast.success("Online payment is processing please wait");
			console.log(result?.data);
			window.location.replace(result?.data?.bkashURL);
		} else {
			toast.error("Something went wrong");
		}
	};
	return (
		<div className="flex items-center justify-center my-[100px]">
			<button
				className="bg-blue-500 text-white px-3 py-2 rounded-md"
				onClick={bkashPaymentHandler}
			>
				Pay With Bkash
			</button>
		</div>
	);
}
