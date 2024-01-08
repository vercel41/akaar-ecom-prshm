import { toast } from "react-toastify";

import getToken from "@/utils/token";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { clearCart, clearDiscountInfo } from "@/store/features/cartSlice";
import { setGlobalLoader } from "@/store/features/commonSlice";
import { usePlaceAnOrderMutation } from "@/store/features/api/orderAPI";

const useOrderPlace = () => {
	const [placeAnOrder] = usePlaceAnOrderMutation();
	const dispatch = useDispatch();
	const router = useRouter();
	const handleOrderPlace = async (newOrder) => {
		// console.log(newOrder);
		// "Online Payment"
		if (newOrder.payment_type !== "COD") {
			//currently getting payment_type "Online Payment" but checkout accepts "Online"
			newOrder.payment_type = "Online"; //forcing to use payment type Online
			try {
				const res = await fetch("/api/payments/sslcz", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						authorization: `Bearer ${getToken()}`,
					},
					body: JSON.stringify(newOrder),
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
			placeAnOrder(newOrder)
				.unwrap()
				.then((response) => {
					// Handle the successful response if necessary
					// console.log(response);
					dispatch(clearDiscountInfo());
					dispatch(clearCart());
					dispatch(setGlobalLoader(false));
					toast.success("Order successful");
					router.push(`checkout/success/${response?.sale?.id}`);
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
