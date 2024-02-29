// Calculating coupon discount
/**
 * The getCouponDiscount function calculates the discount amount based on the discount coupon type and
 * total price.
 * @param discountCoupon - An object representing the discount coupon. It should have the following
 * properties:
 * @param totalPrice - The total price of the items in the cart.
 * @returns The function `getCouponDiscount` returns the discount amount based on the discount coupon
 * and total price.
 */
export const getCouponDiscount = (discountCoupon, totalPrice) => {
	if (
		!discountCoupon ||
		discountCoupon?.coupon_type !== "cart" ||
		discountCoupon?.minimum_order > totalPrice // minimum_order_amount
	) {
		return 0;
	}
	let discountAmount = 0;
	if (discountCoupon?.discount_type === "percentage") {
		discountAmount = totalPrice * (discountCoupon?.discount_amount / 100);
		if (discountAmount > discountCoupon?.max_discount) {
			return discountCoupon?.max_discount || 0;
		}
		return discountAmount;
	} else if (discountCoupon?.discount_type === "flat") {
		return discountCoupon?.discount_amount;
	}
	return discountAmount;
};

//Formatting cart items for order
/**
 * The function `getOrderFormattedCartItems` takes an array of cart items and returns an array of
 * formatted order items.
 * @param allCartItems - An array of objects representing the items in the cart. Each object should
 * have the following properties:
 * @returns an array of objects with the following properties: barcode_id, quantity, and price.
 */
export const getOrderFormattedCartItems = (allCartItems) => {
	const order_items = allCartItems.map((item) => {
		return {
			barcode_id: item.barcodeId,
			quantity: item.quantity,
			price: item.selectedBarCode.discount_selling_price || 0,
		};
	});
	return order_items;
};

// (item.minimum_wholesale_quantity > 0 &&
// item.quantity >= item.minimum_wholesale_quantity

/**
 * The function calculates the total price of items in a shopping cart based on their quantity and
 * discount selling price.
 * @param allCartItems - An array of objects representing the items in the cart. Each object should
 * have the following properties:
 * @returns the total value of the cart items.
 */
export const getCartTotal = (allCartItems) => {
	let total = 0;
	if (Array.isArray(allCartItems)) {
		allCartItems.forEach((item) => {
			total +=
				(item?.quantity || 1) * item.selectedBarCode.discount_selling_price ||
				0;
		});
	}
	return total;
};
