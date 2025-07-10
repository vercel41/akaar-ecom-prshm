import { fetchData } from "@/lib/fetch-data";
// import ProductSlider from "@/components/ProductSlider";
import ProductList from "@/components/products/ProductList";

const Featured = async () => {
  const data = await fetchData({ api: "featured-product?per_page=4" });
  const products = data?.data || [];
  return <ProductList products={products} fixedItems={true} />;
};

export default Featured;
