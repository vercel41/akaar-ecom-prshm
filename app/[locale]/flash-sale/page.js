import { Suspense } from "react";
import SortSelect from "@/components/elements/SortSelect";
import ProductList from "@/components/products/ProductList";

// ** Imoprt icons
import Timer from "@/components/elements/Timer";
import { fetchData } from "@/utils/fetchData";
import { notFound } from "next/navigation";
import PaginationWithSummery from "@/components/PaginationWithSummery";

// ** Search Fallback
function SearchBarFallback() {
  return <>placeholder</>;
}

const FlashSellingProducts = async ({ searchParams }) => {
  const params = new URLSearchParams(searchParams);
  // console.log(searchParams);
  const flashSaleResponse = await fetchData({
    api: `product-flash-sale?${params.toString()}`,
  });
  const flashSaleInfo = flashSaleResponse?.flashSale || {};
  const products = flashSaleResponse?.data || [];
  const meta = flashSaleResponse?.meta || {};
  if (flashSaleResponse?.status === false) return notFound();

  return (
    <>
      <div
      // className="breadcrumb bg-[url('/assets/images/banner/flash-banner.png')] bg-no-repeat bg-cover py-6"
      // className="bg-no-repeat bg-cover w-full h-[240px] breadcrumb py-6"
      // style={{
      //   backgroundImage: `url(${flashSaleInfo?.banner_image})`,
      // }}
      >
        <div className="container">
          <div className="flex flex-col items-center justify-center text-center my-4">
            <h3 className="text-2xl font-bold font-title text-slate-700 mb-2">
              {flashSaleInfo?.title}
            </h3>
            <p className="text-lg text-slate-600 mb-4">Deals End In</p>
            <Timer targetDate={flashSaleInfo?.expire_time} />
          </div>
        </div>
      </div>

      <div className="container lg:mb-20">
        <div className="toolbar flex justify-between items-center bg-slate-50 rounded-xl py-3 my-5">
          <p>Total {products?.length} products</p>
          <Suspense fallback={<SearchBarFallback />}>
            <SortSelect />
          </Suspense>
        </div>
        <ProductList products={products} isFlashSale />
        <PaginationWithSummery
          meta={meta}
          totalItemsShowing={products?.length}
        />
      </div>
    </>
  );
};

export default FlashSellingProducts;
