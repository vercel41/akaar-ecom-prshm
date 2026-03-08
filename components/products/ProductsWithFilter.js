import React from "react";
import SortSelect from "@/components/elements/SortSelect";
import ProductList from "./ProductList";
import { fetchData } from "@/lib/fetch-data";
import PaginationWithSummery from "../PaginationWithSummery";
import NoProducts from "./NoProducts";
import FilterMenu from "../elements/FilterMenu";
import ProductFilters from "./ProductFilters";
import FilterPanel from "../side-drawers/FilterPanel";
import PageSize from "../elements/PageSize";
import FallbackUI from "../elements/fallback-ui";

const ProductsWithFilter = async ({ customSearchParams = {}, category }) => {
  const params = new URLSearchParams(customSearchParams);

	// remove unwanted tracking params
	const blockedParams = [
	"fbclid",
	"ttclid",
	"gclid",
	"utm_source",
	"utm_medium",
	"utm_campaign"
	];

	blockedParams.forEach(param => params.delete(param));

  const productResponse = await fetchData({
    api: `products?per_page=30&${params.toString()}`,
  });
  const products = productResponse?.data;

  if (!products) {
		return (
		  <FallbackUI message="Failed to load some data. Please refresh the page." />
		);
	}

  const meta = productResponse?.meta || {};

  return (
    <>
      <div className="mb-3 md:mb-20">
        <div className="actions-bar flex justify-between items-center mb-3 md:mb-8 border-b border-gray-300 py-5 container-fluid px-6">
          <div className="flex items-center gap-48 w-1/2">
            <div>
              <FilterMenu />
            </div>
            <div className="hidden lg:block">
              <PageSize />
            </div>
          </div>
          <div className="">
            <SortSelect />
          </div>
        </div>
        <div className="lg:flex gap-4 md:mx-[50px] ">
          <div className="hidden md:block">
            <ProductFilters category={category} />
          </div>
          {products?.length ? (
            <ProductList products={products} />
          ) : (
            <NoProducts />
          )}
        </div>
        <PaginationWithSummery
          meta={meta}
          totalItemsShowing={products?.length}
        />
      </div>
      <FilterPanel category={category} />
    </>
  );
};
export default ProductsWithFilter;
