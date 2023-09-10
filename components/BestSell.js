import BestSellSlider from "./elements/sliders/BestSell";
import { fetchData } from "@/utils/fetchData";

const BestSell = async () => {
  const data = await fetchData({ api: "product-bestsale" });
  const bestProducts = data?.data || [];

  return (
    <>
      <BestSellSlider bestProducts={bestProducts} />
    </>
  );
};

export default BestSell;
