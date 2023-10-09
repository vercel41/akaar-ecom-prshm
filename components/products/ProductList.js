import React from "react";
import SingleProduct from "./SingleProduct";

export default function ProductList({ products, isFlashSale }) {
  return (
    <div className="products-wpr w-full grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-3 md:gap-5 mb-12">
      {products?.map((product, i) => (
        <div className="col-span-1" key={i}>
          <SingleProduct product={product} isFlashSale={isFlashSale} />
        </div>
      ))}
    </div>
  );
}
