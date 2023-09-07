import Link from "next/link";
import AllProducts from "@/components/products/AllProducts";
import LastVisitedProducts from "@/components/products/LastVisitedProducts";
import ProductDetails from "./ProductDetails";
import { fetchData } from "@/utils/fetchData";
import { notFound } from "next/navigation";
import React from "react";
import { getSlicedText } from "@/utils/formatText";

export const metadata = {
  title: "Sotota Stall || product details page",
  description: "product details page",
};

export default async function ProductDetailsLayout({ children, params }) {
  const { slug } = params;
  if (slug === "null") return notFound();
  // const response = await fetchData({ api: `products/${slug}` });
  // const product = response?.data || {};

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

  const tabItems = [
    { id: 1, title: "প্রডাক্টের বিবরণ", path: `/products/${slug}` },
    {
      id: 2,
      title: "স্পেসিফিকেশন",
      path: `/products/${slug}/specifications`,
    },
    {
      id: 3,
      title: "রেটিং ও রিভিউ",
      path: `/products/${slug}/reviews/${product?.id}`,
    },
    {
      id: 4,
      title: "প্রশ্ন ও উত্তর",
      path: `/products/${slug}/qna/${product?.id}`,
    },
  ];
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
                হোম
              </Link>
              <Link
                href={`/products`}
                className="text-base text-slate-600 hover:text-primary"
              >
                প্রডাক্টস
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
        <ProductDetails
          product={product}
          settings={settings}
          tabItems={tabItems}
        >
          {children}
        </ProductDetails>
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
}
