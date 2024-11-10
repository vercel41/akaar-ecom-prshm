import { fetchData } from "@/lib/fetch-data";
import ProductCard from "../cards/ProductCard";
import PaginationWithSummery from "../PaginationWithSummery";
import { siteConfig } from "@/config/site";

const AllProducts = async ({ customSearchParams = {}, pagination }) => {
  const params = new URLSearchParams(customSearchParams);
  const data = await fetchData({ api: `products?${params.toString()}` });
  const products = data?.data || [];
  const meta = data?.meta || {};

  return (
    <>
      <div className="products-wpr grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 gap-2 lg:gap-8 mb-12">
        {products?.map((product, i) => (
          <div className="col-span-1" key={i}>
            <ProductCard
              product={product}
              isSquareImage={siteConfig.isSquareImage}
            />
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
