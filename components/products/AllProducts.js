import { fetchData } from "@/utils/fetchData";
import SingleProduct from "./SingleProduct";
import PaginationWithSummery from "../PaginationWithSummery";

const AllProducts = async ({ customSearchParams = {}, pagination }) => {
  const params = new URLSearchParams(customSearchParams);
  const data = await fetchData({ api: `products?${params.toString()}` });
  const products = data?.data || [];
  const meta = data?.meta || {};

  return (
    <>
      <div className="products-wpr grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-5 gap-y-12 mb-12">
        {products?.map((product, i) => (
          <div className="col-span-1" key={i}>
            <SingleProduct product={product} />
          </div>
        ))}
      </div>
      {pagination && (
        <PaginationWithSummery
          meta={meta}
          totalItemsShowing={products?.length}
        />
      )}
    </>
  );
};

export default AllProducts;
