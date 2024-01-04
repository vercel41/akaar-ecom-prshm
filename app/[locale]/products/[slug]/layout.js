import { fetchData } from "@/lib/fetch-data";
import { notFound } from "next/navigation";

export const generateMetadata = async ({ params }, parent) => {
	const parentMetaData = await parent;
	let product = {};
	try {
		product = await fetchData({ api: `products/${params.slug}` });
	} catch (error) {
		return notFound();
	}

	return {
		title: `${product?.data?.product_name} || ${parentMetaData.applicationName}`,
		description: `${product?.data?.product_name} a product of ${parentMetaData.applicationName}`,
	};
};

export default async function ProductDetailsLayout({ children }) {
	return <div>{children}</div>;
}
