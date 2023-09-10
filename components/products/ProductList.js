import React from "react";
import SingleProduct from "./SingleProduct";

export default function ProductList({ products }) {
  return (
    <div className="products-wpr grid grid-cols-4 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 gap-x-5 gap-y-12 mb-12">
      {products?.map((product, i) => (
        <div className="col-span-1" key={i}>
          <SingleProduct product={product} />
        </div>
      ))}
    </div>
  );
}
