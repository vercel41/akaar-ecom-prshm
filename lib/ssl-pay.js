import { toast } from "react-toastify";
import getToken from "../utils/token";

/**
 * The function `handleSSLOrderPayLater` is an asynchronous function that handles the payment process
 * for an order using SSLCZ gateway.
 * @param orderId - The orderId parameter is the unique identifier for the order that needs to be
 * processed for SSL payment.
 * @param setLoading - A function that sets the loading state of the component. It is used to indicate
 * that the payment process is in progress.
 */
const handleSSLOrderPayLater = async (orderId, setLoading) => {
	try {
		setLoading(true);
		const res = await fetch(`/api/payments/sslcz/${orderId}`, {
			headers: {
				authorization: `Bearer ${getToken()}`,
			},
		});
		const data = await res.json();
		// console.log(data);
		setLoading(false);
		if (data?.GatewayPageURL) {
			toast.success("Online payment is processing please wait");
			window.location.replace(data.GatewayPageURL);
		} else {
			toast.error("Something went wrong");
		}
	} catch (error) {
		setLoading(false);
		toast.error("Something went wrong...", error);
	}
};

export default handleSSLOrderPayLater;
