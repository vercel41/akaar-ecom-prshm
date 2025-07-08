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

export const getProductPixelData = (product = {}) => {
  // console.log(product);
  return {
    value: product?.new_price, // Individual product price in BDT
    currency: "BDT",
    content_ids: [product.id], // 'REQUIRED': array of product IDs,
    content_type: "product", // RECOMMENDED: Either product or product_group based on the content_ids or contents being passed.
    content_name: product?.product_name,
    content_image_url: product?.image,
  };
};

export const getInitiateCheckoutPixelData = (items = [], total) => {
  const itemContents = items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    item_price: item.new_price,
    name: item.product_name,
    content_image_url: item.image,
  }));
  return {
    value: total, // Total order value in BDT
    currency: "BDT",
    content_ids: items.map((item) => item.id),
    content_type: "product",
    contents: itemContents,
    num_items: items.length,
  };
};

export const getPurchasedItemsPixelData = (contents = [], total) => {
  return {
    value: total, // Total order value in BDT
    currency: "BDT",
    content_ids: contents.map((item) => item.id),
    content_type: "product",
    contents,
    num_items: contents.length,
  };
};
/**
 * The function `contentItems` maps an array of items to a new array with specific properties renamed.
 * @param [items] - The `items` parameter is an array of objects containing information about different
 * products. Each object in the array should have the following properties:
 */
export const contentItems = (items = []) =>
  items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    item_price: item.new_price,
    name: item.product_name,
    content_image_url: item.image,
  }));
