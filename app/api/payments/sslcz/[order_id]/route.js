import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { handleOrderSSLPay } from "../SSLPayment";

export async function GET(request, { params }) {
	const { order_id } = params;
	const headersList = headers();
	const bearerToken = headersList.get("authorization");

	try {
		// getting order detail using id
		const res = await fetch(`${process.env.server}/order/show/${order_id}`, {
			headers: {
				AmsPublickey: process.env.AMS_PUBLIC_KEY,
				AmsPrivateKey: process.env.AMS_PRIVATE_KEY,
				authorization: `Bearer ${bearerToken}`,
			},
		});
		const order = await res.json();
		// console.log(order);

		if (order?.status === false) {
			console.log(order, "Could not found the order");
			return NextResponse.error(
				{ message: "Could not found the order" },
				{ status: 404 }
			);
		}
		// console.log(order);
		//Initializing SSL payment using order data
		const sslResponse = await handleOrderSSLPay(order, bearerToken);

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
