import Link from "next/link";
import AllProducts from "@/components/products/AllProducts";
import LastVisitedProducts from "@/components/products/LastVisitedProducts";
import ProductDetails from "./ProductDetails";
import { fetchData } from "@/utils/fetchData";
import { notFound } from "next/navigation";
import React from "react";
import { getSlicedText } from "@/utils/formatText";

const ProductView = async ({ params }) => {
  const { slug } = params;
  if (slug === "null") return notFound();
  const [settingsRes, productRes] = await Promise.allSettled([
    fetchData({ api: `info/basic` }),
    fetchData({ api: `products/${slug}` }),
  ]);

  const settings =
    settingsRes.status === "fulfilled" ? settingsRes.value?.data || {} : {};
  const product =
    productRes.status === "fulfilled" ? productRes.value?.data || [] : [];

  //Category Filter
  const customSearchParams = {
    category_id: product?.category?.id,
  };

  return (
    <>
      <div className="container">
        <div className="breadcrumb breadcrumb-2 py-5">
          <div className="container">
            <div>
              <Link
                href={`/`}
                className="text-base text-slate-600 hover:text-primary"
              >
                Home
              </Link>
              <Link
                href={`/products`}
                className="text-base text-slate-600 hover:text-primary"
              >
                Products
              </Link>
              <Link
                href={`/products/${slug}`}
                className={`text-base text-slate-900 hover:text-primary`}
              >
                {getSlicedText(slug, 50)}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <ProductDetails product={product} settings={settings}></ProductDetails>
      </div>
      <div className="all-products py-14">
        <div className="container">
          <div className="sec-heading w-full flex justify-between items-center border-b border-slate-200 pb-3">
            <h2 className="sec-title">একই ক্যাটাগরির আরও প্রোডাক্ট</h2>
          </div>

          <div className="category-products mt-6">
            <AllProducts customSearchParams={customSearchParams} />
          </div>
        </div>
      </div>

      <LastVisitedProducts visitedProductId={product?.id} />
    </>
  );
};

export default ProductView;
