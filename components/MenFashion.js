import { fetchData } from "@/utils/fetchData";
import ProductSlider from "./elements/sliders/ProductSlider";

const MenFashion = async () => {
  const data = await fetchData({ api: "products?category_id=14894" });
  const products = data?.data || [];

  return (
    <>
      <ProductSlider products={products} sliderId="men-fashion" />
    </>
  );
};

export default MenFashion;
