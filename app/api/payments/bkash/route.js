// API route file
import { generateUniqueId } from "@/utils/get-unique";
import { NextResponse } from "next/server";
import generateGrantToken from "./helpers/grant-token";
import { getAuthHeaders } from "./helpers/bkash-headers";

let globalToken = null;

export async function POST(request) {
	// Call grantToken to generate the token before proceeding
	const { grantToken } = await generateGrantToken();
	if (!grantToken) {
		return NextResponse.json({ status: "token generation failed" });
	}

	globalToken = grantToken; // set the global token

	const { origin: baseUrl } = new URL(request.url);
	const { amount } = await request.json();
	const tranId = generateUniqueId(); // generating unique Id

	const result = await fetch(`${process.env.BKASH_BASE_URL}/create`, {
		method: "POST",
		headers: {
			...(await getAuthHeaders()),
			authorization: globalToken,
		},
		body: JSON.stringify({
			mode: "0011",
			payerReference: " ",
			callbackURL: `${baseUrl}/api/payments/bkash`,
			amount: amount ? amount : "1",
			currency: "BDT",
			intent: "sale",
			merchantInvoiceNumber: tranId,
		}),
	});
	const data = await result.json();

	return NextResponse.json({ status: "success", data: data });
}

export async function GET(request) {
	const { searchParams, origin: baseUrl } = new URL(request.url);
	const paymentID = searchParams.get("paymentID");
	const status = searchParams.get("status");
	console.log(paymentID);
	console.log(status);
	// console.log(globalToken, "global token from get");

	try {
		if (status === "success") {
			// console.log("Execute Payment API Start !!!");
			const executeResponse = await fetch(
				`${process.env.BKASH_BASE_URL}/execute`,
				{
					method: "POST",
					headers: {
						...(await getAuthHeaders()),
						authorization: globalToken,
					},
					body: JSON.stringify({
						paymentID,
					}),
				}
			);
			const result = await executeResponse.json();
			console.log("callback execute result", result);

			if (result.statusCode && result.statusCode === "0000") {
				console.log("Payment Successful !!! ");
				// save response in your db

				return NextResponse.redirect(
					`${baseUrl}/payment-success?data=${result.statusMessage}`,
					{
						status: 301,
					}
				);
			} else {
				console.log("Payment Failed !!!");

				return NextResponse.redirect(
					`${baseUrl}/payment-fail?data=${result.statusMessage}`,
					{
						status: 301,
					}
				);
			}
		} else {
			console.log("Payment cancelled !!!");

			return NextResponse.redirect(
				`${baseUrl}/payment-fail?data=${"cancelled"}`,
				{
					status: 301,
				}
			);
		}
	} catch (e) {
		console.error("Error occurred during payment:", e); // Log the error
		console.log("Payment Failed !!!");

		// return res.redirect(baseUrl)/payment-fail;
		return NextResponse.redirect(`${baseUrl}/payment-fail?data=failed`, {
			status: 301,
		});
	}
}
