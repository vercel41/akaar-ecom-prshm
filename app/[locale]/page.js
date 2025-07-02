// app/page.tsx or wherever the Home page is

import { fetchData } from "@/lib/fetch-data";
import { Link } from "@/navigation";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import ProductList from "@/components/products/ProductList";
import FeaturesSection from "./products/[slug]/_components/FeaturesSection";

// Server-rendered components
import Intro from "./_components/intro";
import FlashSale from "./_components/FlashSale";
import NewArrival from "./_components/NewArrival";
import FeaturedCategories from "./_components/FeaturedCategories";
import Featured from "./_components/Featured";
import GetDirectionSection from "./_components/GetDirectionSection";
import GallerySection from "./_components/GallerySection";
import Popup from "./_components/Popup";
import HomeCategoryProducts from "./_components/home-page-category/HomeCategoryProducts";

// Client-side lazy imports for heavier components
import dynamic from "next/dynamic";

const VideoBanner = dynamic(() => import("./_components/VideoBanner"), {
  ssr: false,
  loading: () => <div>Loading video...</div>,
});

export default async function Home() {
  // Fetch all necessary data in parallel
  const [settingsRes, transRes, featuredRes, newArrivalRes, discountedRes] =
    await Promise.allSettled([
      fetchData({ api: `info/basic` }),
      fetchData({ api: "translations" }),
      fetchData({ api: "featured-categories" }),
      fetchData({ api: "product-latest?per_page=5" }),
      fetchData({ api: "products?per_page=4&is_discounted=1" }),
    ]);

  const settings =
    settingsRes.status === "fulfilled" ? settingsRes.value?.data || {} : {};
  const translations =
    transRes.status === "fulfilled" ? transRes.value?.data || {} : {};
  const featuredCategories =
    featuredRes.status === "fulfilled" ? featuredRes.value?.data || [] : [];
  const newArrivalProducts =
    newArrivalRes.status === "fulfilled" ? newArrivalRes.value?.data || [] : [];
  const discountedProducts =
    discountedRes.status === "fulfilled" ? discountedRes.value?.data || [] : [];

  return (
    <>
      {settings?.slider_section ? (
        <section className="banner md:mt-[-180px]">
          <Intro settings={settings} />
        </section>
      ) : null}

      <section className="flash-sale">
        <div className="container-fluid">
          <FlashSale />
        </div>
      </section>

      {settings?.shop_section ? (
        <section className="new-products md:my-20 my-10">
          <div className="container-fluid">
            <div className="py-4 pb-10 text-center flex justify-center flex-col">
              <h2 className="sec-title !text-xl mx-6">
                {translations["new-arrival"] || "New Collection"}
              </h2>

              <Link
                href="/products?sort_type=new"
                className="rounded px-2 pb-1 font-noto_serif inline-flex justify-center items-center gap-1 group capitalize text-lg"
              >
                <span className="group-hover:-translate-x-3 transition-transform duration-500">
                  {translations["browse-our-new-collections"] ||
                    "Browse our new collections"}{" "}
                </span>
                <MdKeyboardDoubleArrowRight
                  size={22}
                  className="group-hover:translate-x-3 transition-transform duration-500"
                />
              </Link>
            </div>

            <NewArrival products={newArrivalProducts} />
          </div>
        </section>
      ) : null}

      {/* Featured Category Section  */}
      {settings?.featured_category_section && featuredCategories.length > 0 ? (
        <div className="text-center py-7 border-y border-gray-200">
          <FeaturedCategories featuredCategories={featuredCategories} />
        </div>
      ) : null}

      {settings?.featured_products_section ? (
        <section className="new-products">
          <div className="container">
            <div className="py-10 text-center">
              <h2 className="text-2xl pb-3">
                {translations["featured-products"] || "Featured Products"}
              </h2>
              <Link href="/featured-products" className="underline">
                Browse our featured products
              </Link>
            </div>
            <Featured />
          </div>
        </section>
      ) : null}

      {discountedProducts.length > 0 && settings?.discount_product_section ? (
        <section className="discounted-products">
          <div className="container">
            <div className="py-10 text-center">
              <h2 className="text-2xl pb-3">
                {translations["discounted-products"] || "Discounted Products"}
              </h2>
              <Link href="/products?is_discounted=1" className="underline">
                Browse our discounted products
              </Link>
            </div>
            <ProductList products={discountedProducts} fixedItems={true} />
          </div>
        </section>
      ) : null}

      {settings?.video_section ? (
        <section className="video-banner mt-7">
          <VideoBanner settings={settings} />
        </section>
      ) : null}

      <section className="home-category-products">
        <HomeCategoryProducts />
      </section>

      {settings?.outlet_address_section ? (
        <section className="lg:pt-7">
          <GetDirectionSection />
        </section>
      ) : null}

      {settings?.gallery_section ? (
        <section className="lg:pt-7">
          <GallerySection />
        </section>
      ) : null}

      <section>
        <div className="container-fluid lg:pt-14 w-[89%] mx-auto">
          <FeaturesSection />
        </div>
      </section>

      {settings?.popup && <Popup popup={settings?.popup} />}
    </>
  );
}
