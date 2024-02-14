import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { postData } from "@/lib/post-data";
import { handleOrderSSLPay } from "./SSLPayment";

export async function POST(request) {
	const { newOrder, isGuestCheckout } = await request.json();
	const headersList = headers();
	const bearerToken = headersList.get("authorization");
	// console.log(bearerToken);

	try {
		const order = await postData(
			{
				api: isGuestCheckout ? "guest-checkout" : "checkout",
				authorization: `Bearer ${bearerToken}`,
			},
			newOrder
		);
		if (order?.status === false) {
			console.log(order, "order creation response in ssl");
			return NextResponse.error(
				{ message: "Order Creation failed" },
				{ status: 500 }
			);
		}
		// console.log(order);
		//Initializing SSL payment using order data
		const sslResponse = await handleOrderSSLPay(order);

		return NextResponse.json(
			{
				GatewayPageURL: sslResponse.GatewayPageURL,
				status: true,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("An error occurred:", error);
		return NextResponse.error(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}
