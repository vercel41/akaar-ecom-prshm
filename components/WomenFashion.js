import { fetchData } from "@/utils/fetchData";
import ProductSlider from "./elements/sliders/ProductSlider";

const WomenFashion = async () => {
  const data = await fetchData({ api: "products?category_id=14896" });
  const products = data?.data || [];

  return (
    <>
      <ProductSlider products={products} sliderId="women-fashion" />
    </>
  );
};

export default WomenFashion;
