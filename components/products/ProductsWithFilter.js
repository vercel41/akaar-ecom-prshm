import React from "react";
import SortSelect from "@/components/elements/SortSelect";
import ProductList from "./ProductList";
import { fetchData } from "@/lib/fetch-data";
import PaginationWithSummery from "../PaginationWithSummery";
import NoProducts from "./NoProducts";
import FilterMenu from "../elements/FilterMenu";
import ProductFilters from "./ProductFilters";
import FilterPanel from "../side-drawers/FilterPanel";

const ProductsWithFilter = async ({ customSearchParams = {}, category }) => {
	const params = new URLSearchParams(customSearchParams);
	const productResponse = await fetchData({
		api: `products?per_page=20&${params.toString()}`,
	});
	const products = productResponse?.data || [];
	const meta = productResponse?.meta || {};

	return (
		<>
			<div className="container mb-3 md:mb-20">
				<div className="actions-bar flex justify-between items-center mb-3 md:mb-8">
					<div className="">
						<FilterMenu />
						{/* <FilterPanel category={category} /> */}
						{/* <p>Total {meta?.total} products found</p> */}
					</div>
					<div className="">
						<SortSelect />
					</div>
				</div>
				<div className="lg:flex gap-4">
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
