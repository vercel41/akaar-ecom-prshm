import { fetchData } from "@/lib/fetch-data";
// import ProductSlider from "@/components/ProductSlider";
import ProductList from "@/components/products/ProductList";

const NewArrival = async () => {
	const data = await fetchData({ api: "product-latest?per_page=5" });
	const products = data?.data || [];
	// console.log(products);
	return (
		<>
			{/* Slider view  */}
			{/* <ProductSlider products={products} sliderId="new-arrival" /> */}
			<ProductList products={products} fixedItems={true} />
		</>
	);
};

export default NewArrival;
