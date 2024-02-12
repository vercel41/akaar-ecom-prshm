// API route file
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import generateGrantToken from "./helpers/grant-token";
import { getAuthHeaders } from "./helpers/bkash-headers";
import { postData } from "@/lib/post-data";

let bkashGrantToken = null;
let orderId = null;

export async function POST(request) {
	// Call grantToken to generate the token before proceeding
	const { grantToken } = await generateGrantToken();
	if (!grantToken) {
		return NextResponse.json({ status: "token generation failed" });
	}

	bkashGrantToken = grantToken; // set the global token
	const { origin: baseUrl } = new URL(request.url);
	const { newOrder, isGuestCheckout } = await request.json();
	const headersList = headers();
	const bearerToken = headersList.get("authorization");

	try {
		const order = await postData(
			{
				api: !isGuestCheckout ? "checkout" : "guest-checkout",
				authorization: `Bearer ${bearerToken}`,
			},
			newOrder
		);
		if (order?.status === false) {
			console.log(order, "order creation response in bkash");
			return NextResponse.error(
				{ message: "Order Creation failed" },
				{ status: 500 }
			);
		}
		// after order creation we need to initialize bkash payment
		const { sale } = order;
		orderId = sale.id; // set the global order id for failed payment

		const result = await fetch(`${process.env.BKASH_BASE_URL}/create`, {
			method: "POST",
			headers: {
				...(await getAuthHeaders()),
				authorization: bkashGrantToken,
			},
			body: JSON.stringify({
				mode: "0011",
				// payerReference: sale.customer.mobile,
				payerReference: bearerToken,
				callbackURL: `${baseUrl}/api/payments/bkash`,
				amount: sale.due_amount,
				currency: "BDT",
				intent: "sale",
				merchantInvoiceNumber: sale.id,
			}),
		});
		const data = await result.json();
		// console.log(data, "data");

		if (!data || data?.bkashURL === null) {
			return NextResponse.json({
				status: false,
			});
		}
		return NextResponse.json({
			GatewayPageURL: data.bkashURL,
			status: true,
		});
	} catch (error) {
		console.log(error);
		return NextResponse.error(
			{ message: "Order Creation failed" },
			{ status: 500 }
		);
	}
}

export async function GET(request) {
	const { searchParams, origin: baseUrl } = new URL(request.url);
	const paymentID = searchParams.get("paymentID");
	const status = searchParams.get("status");
	// console.log(orderId, "orderId");

	try {
		if (status === "success") {
			// console.log("Execute Payment API Start !!!");
			const executeResponse = await fetch(
				`${process.env.BKASH_BASE_URL}/execute`,
				{
					method: "POST",
					headers: {
						...(await getAuthHeaders()),
						authorization: bkashGrantToken,
					},
					body: JSON.stringify({
						paymentID,
					}),
				}
			);
			const result = await executeResponse.json();
			// console.log("callback execute result", result);
			if (result.statusCode && result.statusCode === "0000") {
				console.log("Payment Successful !!! ");
				// save response in your db
				const paymentData = {
					order_id: result.merchantInvoiceNumber,
					status: "successful",
					amount: result?.amount || 0,
					payment_method: "bkash",
					transaction_id: result?.trxID,
				};

				//Updating payment info of order
				const paymentUpdateResult = await postData(
					{
						api: "online-payment-status-change",
						authorization: `Bearer ${result.payerReference}`,
					},
					paymentData
				);

				// console.log(paymentUpdateResult);

				return NextResponse.redirect(
					`${baseUrl}/checkout/success/${result.merchantInvoiceNumber}`,
					{
						status: 301,
					}
				);
			} else {
				console.log("Payment Failed !!!");

				return NextResponse.redirect(
					`${baseUrl}/checkout/fail/${result.merchantInvoiceNumber}`,
					{
						status: 301,
					}
				);
			}
		} else {
			console.log("Payment cancelled !!!");

			return NextResponse.redirect(`${baseUrl}/checkout/fail/${orderId}`, {
				status: 301,
			});
		}
	} catch (e) {
		console.error("Error occurred during payment:", e); // Log the error
		// return res.redirect(baseUrl)/payment-fail;
		return NextResponse.redirect(`${baseUrl}/checkout/fail/${orderId}`, {
			status: 301,
		});
	}
}
