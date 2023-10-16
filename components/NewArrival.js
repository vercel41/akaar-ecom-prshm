import { fetchData } from "@/utils/fetchData";
import ProductSlider from "./elements/sliders/ProductSlider";

const NewArrival = async () => {
  const data = await fetchData({ api: "product-latest" });
  const products = data?.data || [];
  return <>{<ProductSlider products={products} sliderId="new-arrival" />}</>;
};

export default NewArrival;
