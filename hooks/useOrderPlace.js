import { toast } from "react-toastify";

import getToken from "@/utils/token";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { clearCart, clearDiscountInfo } from "@/store/features/cartSlice";
import { setGlobalLoader } from "@/store/features/commonSlice";
import { usePlaceAnOrderMutation } from "@/store/features/api/orderAPI";

const useOrderPlace = () => {
	const [placeAnOrder] = usePlaceAnOrderMutation();
	const { settings } = useSelector((state) => state.common);
	const isGuestCheckout = !!settings?.guest_checkout;
	const dispatch = useDispatch();
	const router = useRouter();

	const getPaymentUriByTitle = (title) => {
		switch (title) {
			case "Bkash Payment":
				return "/api/payments/bkash";
			case "SSL Payment":
				return "/api/payments/sslcz";
			default:
				return null;
		}
	};

	const handleOrderPlace = async (newOrder) => {
		console.log(newOrder);

		// if (newOrder.payment_method?.key !== "COD" && isGuestCheckout) {
		// 	toast.error("Guest Payment Option is not available yet");
		// 	return;
		// }

		// dispatch(setGlobalLoader(true));
		if (newOrder.payment_method?.key !== "COD") {
			newOrder.payment_type = "Online"; //forcing to use payment type Online
			let paymentUri = getPaymentUriByTitle(newOrder.payment_method?.title);
			let isDeliveryChargePayment =
				newOrder?.paymentOption?.key === "delivery_charge_payment" &&
				newOrder?.delivery_charge
					? true
					: false;
			delete newOrder.payment_method;
			delete newOrder.paymentOption;
			// console.log(newOrder);
			// console.log(isDeliveryChargePayment);
			try {
				const res = await fetch(paymentUri, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						authorization: getToken(),
					},
					body: JSON.stringify({
						newOrder,
						isGuestCheckout,
						isDeliveryChargePayment,
					}),
				});
				const data = await res.json();
				dispatch(setGlobalLoader(false));
				// console.log(data);
				if (data?.GatewayPageURL) {
					toast.success("Online payment is processing please wait");
					dispatch(clearDiscountInfo());
					dispatch(clearCart());
					window.location.replace(data.GatewayPageURL);
				} else {
					toast.error("Something went wrong");
				}
			} catch (error) {
				dispatch(setGlobalLoader(false));
				toast.error("Something went wrong...", error);
			}
		} else {
			newOrder.payment_type = "COD"; //forcing to use payment type COD
			delete newOrder.payment_method;
			placeAnOrder({ newOrder, isGuestCheckout })
				.unwrap()
				.then((response) => {
					// Handle the successful response if necessary
					// console.log(response);
					dispatch(clearDiscountInfo());
					dispatch(clearCart());
					dispatch(setGlobalLoader(false));
					toast.success("Order successful");
					const { sale } = response || {};
					router.push(`checkout/success/${sale?.id}`);
				})
				.catch((error) => {
					// Handle the error if necessary
					dispatch(setGlobalLoader(false));
					toast.error("Failed to place an order");
					console.log(error);
				});
		}
	};
	return {
		handleOrderPlace,
	};
};

export default useOrderPlace;
