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
 * @returns an array of objects with the following properties: product_id, product_variant_id,
 * quantity, and price.
 */
export const getOrderFormattedCartItems = (allCartItems) => {
  const order_items = allCartItems.map((item) => {
    return {
      product_id: item.id,
      product_variant_id: item?.variantId || null,
      quantity: item.quantity,
      // price: item.new_price,

      //Added wholesale price
      price:
        item.minimum_wholesale_quantity > 0 &&
        item.quantity >= item.minimum_wholesale_quantity
          ? item.minimum_wholesale_price
          : item.new_price,
    };
  });
  return order_items;
};

/**
 * The `getCartTotal` function calculates the total price of all items in a shopping cart based on wholesale.
 * @param allCartItems - An array of objects representing the items in the cart. Each object should
 * have the following properties:
 * @returns the total value of the cart items.
 */
export const getCartTotal = (allCartItems) => {
  let total = 0;
  if (Array.isArray(allCartItems)) {
    allCartItems.forEach((item) => {
      total +=
        (item?.quantity || 1) *
        (item.minimum_wholesale_quantity > 0 &&
        item.quantity >= item.minimum_wholesale_quantity
          ? item.minimum_wholesale_price
          : item.new_price || 0);
    });
  }
  return total;
};
