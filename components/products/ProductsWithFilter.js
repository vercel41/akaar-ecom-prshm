import React from "react";
// import Filter from "@/components/Filter";
import SortSelect from "@/components/elements/SortSelect";
import ProductList from "./ProductList";
import { fetchData } from "@/utils/fetchData";
import PaginationWithSummery from "../PaginationWithSummery";
import NoProducts from "./NoProducts";
// import FilterPanel from "../side-drawers/FilterPanel";
import FilterAction from "../elements/FilterAction";
import FilterMenu from "./FilterMenu";

const ProductsWithFilter = async ({ customSearchParams = {}, category }) => {
  const params = new URLSearchParams(customSearchParams);
  const productResponse = await fetchData({
    api: `products?${params.toString()}`,
  });
  const products = productResponse?.data || [];
  const meta = productResponse?.meta || {};

  return (
    <div className="container mb-20">
      <div className="actions-bar flex justify-between items-center mb-8">
        <div className="">
          <FilterAction />
          {/* <FilterPanel category={category} /> */}
          {/* <p>Total {meta?.total} products found</p> */}
        </div>
        <div className="">
          <SortSelect />
        </div>
      </div>
      <div className="lg:flex gap-4 items-start">
        <FilterMenu category={category} />
        {products?.length ? (
          <ProductList products={products} />
        ) : (
          <NoProducts />
        )}
      </div>
      <PaginationWithSummery meta={meta} totalItemsShowing={products?.length} />
    </div>
  );
};
export default ProductsWithFilter;
