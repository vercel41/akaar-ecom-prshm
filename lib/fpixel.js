export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

export const pageview = () => {
	window.fbq("track", "PageView");
};

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name, options = {}) => {
	try {
		window.fbq("track", name, options);
	} catch (error) {}
};

/**
 * The function `getProductPixelData` returns an object with product pixel data based on the provided
 * product information.
 * @param [product] - The `getProductPixelData` function takes a `product` object as a parameter. This
 * object should have the following properties:
 * @returns An object is being returned with the following properties:
 * - value: The new price of the product in BDT
 * - currency: The currency set to BDT
 * - content_ids: An array containing the product ID
 * - content_type: Set to "product"
 * - content_name: The name of the product
 * - content_image_url: The URL of the product image
 * - content_category: The
 */
export const getProductPixelData = (product = {}) => {
	// console.log(product);
	return {
		value: product?.new_price, // Individual product price in BDT
		currency: "BDT",
		content_ids: [product.barcode], // An array of product IDs, e.g. ["product.id],
		content_type: "product",
		content_name: product?.product_name,
		content_image_url: product?.image,
		content_category: product?.category?.category_name,
	};
};

/**
 * The function `getPurchaseItemsPixelData` generates pixel data for purchase items in a JavaScript
 * environment.
 * @param [items] - The `items` parameter is an array containing information about the purchased items.
 * Each item object in the array should have properties like `id`, `product_name`, `quantity`,
 * `new_price`, `image`, and optionally `category` with `category_name`.
 * @param total - The `total` parameter represents the total value of the purchase order in Bangladeshi
 * Taka (BDT).
 * @returns The function `getPurchaseItemsPixelData` returns an object with the following properties:
 * - `value`: Total order value in BDT
 * - `currency`: Currency set to "BDT"
 * - `content_type`: Set to "product"
 * - `contents`: An array of objects containing information about each item in the purchase, including
 * id, name, quantity, price, content_image_url, currency
 */
export const getPurchaseItemsPixelData = (items = [], total) => {
	// console.log(items);
	const itemContents = items.map((item) => ({
		id: item.barcode,
		name: item.product_name,
		quantity: item.quantity,
		item_price: item.new_price,
		price: item.new_price,
		content_image_url: item.image,
		currency: "BDT",
		// category: item?.category?.category_name || "",
		// Add other optional properties if needed
	}));
	return {
		value: total, // Total order value in BDT
		currency: "BDT",
		// content_type: "product",
		contents: itemContents,
		num_items: items.length,
	};
};
