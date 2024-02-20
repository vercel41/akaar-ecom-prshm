import { toast } from "react-toastify";

import getToken from "@/utils/token";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { clearCart, clearDiscountInfo } from "@/store/features/cartSlice";
import { setGlobalLoader } from "@/store/features/commonSlice";
import { usePlaceAnOrderMutation } from "@/store/features/api/orderAPI";
import { getPaymentUriByTitle } from "@/lib/order-pay";
import { getCartTotal } from "@/lib/checkout";
import * as pixel from "/lib/fpixel";

const useOrderPlace = () => {
	const [placeAnOrder] = usePlaceAnOrderMutation();
	const { settings } = useSelector((state) => state.common);
	const { cart } = useSelector((state) => state.cart);

	const isGuestCheckout = !!settings?.guest_checkout;
	const dispatch = useDispatch();
	const router = useRouter();

	// Fb pixel purchase event
	const handleFbPixelPurchase = () => {
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

		pixel.event("Purchase", {
			value: getCartTotal(cart), // Total order value in BDT
			currency: "BDT",
			content_ids: cart.map((item) => item.id),
			content_type: "product",
			contents: productContents,
			num_items: cart.length,
		});
	};

	const handleOrderPlace = async (newOrder) => {
		// console.log(newOrder);

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
					handleFbPixelPurchase(); //for fb pixel
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
					handleFbPixelPurchase(); //for fb pixel
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
