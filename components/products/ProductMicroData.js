import React from "react";

const ProductMicroData = ({ product }) => {
	const {
		product_name,
		meta_description = "Product description",
		new_price = 100,
		currency = "BDT",
		image,
		brand = { brand_name: "no brand" },
	} = product || {};

	return (
		<>
			<article itemType="https://schema.org/Product" itemProp="item">
				<meta itemProp="name" content={product_name} />
				<meta itemProp="description" content={meta_description} />
				<meta itemProp="brand" content={brand?.brand_name} />
				<meta itemProp="image" content={image} />

				<meta
					itemProp="offers"
					content={{
						"@type": "Offer",
						price: new_price,
						priceCurrency: currency,
					}}
				/>
			</article>
		</>
	);
};

export default ProductMicroData;
