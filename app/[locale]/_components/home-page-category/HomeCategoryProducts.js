import Link from "next/link";
import { fetchData } from "@/lib/fetch-data";
import ProductCard from "@/components/cards/ProductCard";
import CategoryProducts from "./CategoryProducts";

const HomeCategoryProducts = async () => {
  const [transRes] = await Promise.allSettled([
    fetchData({ api: "translations" }),
  ]);
  const translations =
    transRes.status === "fulfilled" ? transRes.value?.data || {} : {};
  const data = await fetchData({
    api: "homepage-category?no_child=1",
  });
  const categoryWiseProducts = data?.data || [];

  return categoryWiseProducts?.length
    ? categoryWiseProducts.map(({ category, products }, index) => (
        <CategoryProducts key={index} products={products} />
      ))
    : null;
};

export default HomeCategoryProducts;
