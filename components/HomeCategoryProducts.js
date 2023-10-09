import { fetchData } from "@/utils/fetchData";
import ProductSlider from "./elements/sliders/ProductSlider";
import Link from "next/link";

const HomeCategoryProducts = async () => {
  const data = await fetchData({ api: "homepage-category?no_child=1" });
  const categoryWiseProducts = data?.data || [];
  // console.log(categoryWiseProducts);

  return categoryWiseProducts?.length
    ? categoryWiseProducts.map(({ category, products }, index) => (
        <div key={index} className="container">
          <div className="py-10 flex items-center justify-between">
            <h2 className="sec-title pb-3">{category?.category_name}</h2>
            <Link
              href={`/categories/${category?.slug}`}
              className="text-lg hover:text-secondary"
            >
              See All{" "}
            </Link>
          </div>
          <div className="">
            <ProductSlider products={products} sliderId={index} />
          </div>
        </div>
      ))
    : null;
};

export default HomeCategoryProducts;
