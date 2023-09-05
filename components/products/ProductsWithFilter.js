import React from "react";
// import Filter from "@/components/Filter";
import SortSelect from "@/components/elements/SortSelect";
import ProductList from "./ProductList";
import { fetchData } from "@/utils/fetchData";
import PaginationWithSummery from "../PaginationWithSummery";
import NoProducts from "./NoProducts";
import FilterPanel from "../side-drawers/FilterPanel";
import FilterMenu from "../elements/FilterMenu";

const ProductsWithFilter = async ({ customSearchParams = {}, category }) => {
  const params = new URLSearchParams(customSearchParams);
  const productResponse = await fetchData({
    api: `products?${params.toString()}`,
  });
  const products = productResponse?.data || [];
  const meta = productResponse?.meta || {};

  return (
    <div className="container mb-20">
      <div className="toolbar grid grid-cols-5 gap-5 my-5 border">
        <div className="relative col-span-1">
          <FilterMenu />
          <FilterPanel category={category} />
        </div>
        <div className="col-span-4 flex justify-between items-center bg-slate-50 rounded-xl px-4 py-3">
          <p>এখানে {meta?.total} টি প্রডাক্ট আছে</p>
          <SortSelect />
        </div>
      </div>
      {products?.length ? <ProductList products={products} /> : <NoProducts />}
      <PaginationWithSummery meta={meta} totalItemsShowing={products?.length} />
    </div>
  );
};
export default ProductsWithFilter;
