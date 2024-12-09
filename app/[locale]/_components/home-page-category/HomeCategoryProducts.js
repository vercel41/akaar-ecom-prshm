import Link from "next/link";
import { fetchData } from "@/lib/fetch-data";
import ProductCard from "@/components/cards/ProductCard";
import CategoryProducts from "./CategoryProducts";

const HomeCategoryProducts = async () => {
  const [transRes, homePageCategoryRes] = await Promise.allSettled([
    fetchData({ api: "translations" }),
    fetchData({
      api: "homepage-category?no_child=1",
    }),
  ]);
  const translations =
    transRes.status === "fulfilled" ? transRes.value?.data || {} : {};

  const categoryWiseProducts =
    homePageCategoryRes.status === "fulfilled" ? homePageCategoryRes.value?.data || {} : {};

  // const categoryWiseProducts = data?.data || [];

  // console.log("categoryWiseProducts", categoryWiseProducts);

  // return null;

  return categoryWiseProducts?.length
    ? categoryWiseProducts.map(({ category, products, vdo_file }, index) => (
        <CategoryProducts key={index} products={products}  vdo_file={vdo_file}/>
      ))
    : null;
};

export default HomeCategoryProducts;
