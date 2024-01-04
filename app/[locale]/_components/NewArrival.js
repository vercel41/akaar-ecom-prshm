import { fetchData } from "@/lib/fetch-data";
import ProductSlider from "@/components/ProductSlider";

const NewArrival = async () => {
	const data = await fetchData({ api: "product-latest" });
	const products = data?.data || [];
	return <>{<ProductSlider products={products} sliderId="new-arrival" />}</>;
};

export default NewArrival;
