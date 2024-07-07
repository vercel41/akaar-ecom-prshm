import React from "react";
import ProductCard from "../cards/ProductCard";
import { cn } from "@/utils";

export default function ProductList({ products, isFlashSale, fixedItems }) {
	return (
		<div className="products-wpr w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5  gap-3 md:gap-5 mb-3 md:mb-12 h-fit">
			{products?.map((product, i) => (
				<div className={cn("col-span-1",
					fixedItems && i > 3 && "hidden 2xl:block",
				)} key={i}>
					<ProductCard product={product} isFlashSale={isFlashSale} />
				</div>
			))}
		</div>
	);
}
