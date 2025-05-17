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
import FeaturesSection from "./_components/FeaturesSection";

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

  // Prepare visited product data
  const visitedProduct = {
    id: product?.id,
    image: product?.image || product?.main_image || "",
    product_name: product?.product_name || product?.name || "",
    slug: product?.slug || "",
    new_price: product?.new_price,
    old_price: product?.old_price,
  };

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
      <section>
        <div className="container-fluid lg:pt-14 w-[89%] mx-auto">
          <FeaturesSection />
        </div>
      </section>
      <section id="same-category-products">
        <div className="container-fluid lg:pt-14 w-[89%] mx-auto">
          <div className="py-4 text-center flex sm:justify-between justify-center sm:flex-row flex-col">
            <h2 className="sec-title !text-xl">
              {translations["similar-products"] || "Similar Products"}
            </h2>

            <Link
              href={`/products?sort_type=${product.category?.slug}`}
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
          <div className="category-products ">
            <AllProducts customSearchParams={customSearchParams} />
          </div>
        </div>
      </section>

      <LastVisitedProducts visitedProduct={visitedProduct} />
    </>
  );
};

export default ProductView;
