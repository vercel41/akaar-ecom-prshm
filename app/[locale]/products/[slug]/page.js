import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchData } from "@/lib/fetch-data";
import { getSlicedText } from "@/utils/format-text";
import AllProducts from "@/components/products/AllProducts";
import ProductDetails from "./_components/ProductDetails";
import LastVisitedProducts from "./_components/LastVisitedProducts";
import ProductMicroData from "@/components/products/ProductMicroData";
import Loading from "../../loading";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const ProductView = async ({ params }) => {
  const { slug } = params;
  if (slug === "null") return notFound();
  const [settingsRes, productRes, transRes] = await Promise.allSettled([
    fetchData({ api: `info/basic` }),
    fetchData({ api: `products/${slug}` }),
    fetchData({ api: "translations" }),
  ]);

  const settings =
    settingsRes.status === "fulfilled" ? settingsRes.value?.data || {} : {};
  const product =
    productRes.status === "fulfilled" ? productRes.value?.data || [] : [];
  const translations =
    transRes.status === "fulfilled" ? transRes.value?.data || {} : {};
  //Category Filter
  const customSearchParams = {
    category_id: product?.category?.id,
  };

  const isLoading = productRes.status !== "fulfilled" ? true : false;

  return (
    <>
      <ProductMicroData product={product} />
      <div className="container">
        <div className="breadcrumb breadcrumb-2 py-5 max-w-6xl mx-auto">
          <div>
            <Link
              href={`/`}
              className="text-base text-slate-600 hover:text-secondary"
            >
              {translations["home"] || "Home"}
            </Link>
            <Link
              href={`/products`}
              className="text-base text-slate-600 hover:text-secondary"
            >
              {translations["products"] || "Products"}
            </Link>
            <Link
              href={`/products/${slug}`}
              className={`text-base text-slate-900 hover:text-secondary`}
            >
              {getSlicedText(slug, 50)}
            </Link>
          </div>
        </div>
      </div>
      <div className="container">
        <ProductDetails
          translations={translations}
          product={product}
          settings={settings}
          isLoading={isLoading}
        ></ProductDetails>
      </div>
      <section id="same-category-products">
        <div className="container-fluid lg:pt-14">
          <div className="py-4 text-center flex sm:justify-between justify-center sm:flex-row flex-col">
            <h2 className="sec-title !text-xl">
              {translations["similar-products"] || "Similar Products"}
            </h2>

            <Link
              href={`/products?sort_type=${product.category.slug}`}
              className="rounded px-2 pb-1 font-noto_serif flex justify-center items-center gap-1 group capitalize text-lg"
            >
              <span className="group-hover:-translate-x-3 transition-transform duration-500">
                {translations["browse-similer products"] ||
                  "Browse similer products"}{" "}
              </span>
              <span>
                <MdKeyboardDoubleArrowRight
                  size={22}
                  className="group-hover:translate-x-3 transition-transform duration-500"
                />
              </span>
            </Link>
          </div>
          <div className="category-products">
            <AllProducts customSearchParams={customSearchParams} />
          </div>
        </div>
      </section>

      {}
      <LastVisitedProducts visitedProductId={product?.id} />
    </>
  );
};

export default ProductView;
