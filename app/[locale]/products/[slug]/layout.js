import { fetchData } from "@/lib/fetch-data";
import { notFound } from "next/navigation";

export const generateMetadata = async ({ params }, parent) => {
	// console.log(window.location.origin);
	const parentMetaData = await parent;
	let product = {};
	try {
		product = await fetchData({ api: `products/${params.slug}` });
	} catch (error) {
		return notFound();
	}

	return {
		title: `${product?.data?.product_name} || ${parentMetaData.applicationName}`,
		description:
			product?.data?.meta_description ||
			`${product?.data?.product_name} a product of ${parentMetaData.applicationName}`,
		openGraph: {
			title: product?.data?.product_name,
			description:
				product?.data?.meta_description ||
				`${product?.data?.product_name} a product of ${parentMetaData.applicationName}`,
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product?.data?.slug}`,
			siteName: parentMetaData.applicationName,
			images: [product?.data?.image],
			type: "website",
		},
	};
};

export default async function ProductDetailsLayout({ children }) {
	return <div>{children}</div>;
}
