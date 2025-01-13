import React, { Suspense } from "react";
import { fetchData } from "@/lib/fetch-data";
import { Link } from "@/navigation";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Loading from "./loading";

// Lazy load components
const Intro = React.lazy(() => import("./_components/intro"));
const FlashSale = React.lazy(() => import("./_components/FlashSale"));
const VideoBanner = React.lazy(() => import("./_components/VideoBanner"));
const CategoryBanners = React.lazy(() =>
  import("./_components/CategoryBanners")
);
const HomeCategoryProducts = React.lazy(() =>
  import("./_components/home-page-category/HomeCategoryProducts")
);
const Featured = React.lazy(() => import("./_components/Featured"));
const Popup = React.lazy(() => import("./_components/Popup"));
const NewArrival = React.lazy(() => import("./_components/NewArrival"));
const ImageDescriptionSection = React.lazy(() =>
  import("./_components/ReviewSection")
);
const GetDirectionSection = React.lazy(() =>
  import("./_components/GetDirectionSection")
);
const GallerySection = React.lazy(() =>
  import("./_components/GallerySection")
);

export default async function Home() {
  const [settingsRes, transRes, featured_products] = await Promise.allSettled([
    fetchData({ api: `info/basic` }),
    fetchData({ api: "translations" }),
    fetchData({ api: "featured-categories" }),
  ]);

  const settings =
    settingsRes.status === "fulfilled" ? settingsRes.value?.data || {} : {};
  const translations =
    transRes.status === "fulfilled" ? transRes.value?.data || {} : {};
  const featuredProducts =
    featured_products.status === "fulfilled"
      ? featured_products.value?.data || []
      : [];

  const newArrivalProductData = await fetchData({
    api: "product-latest?per_page=5",
  });
  const newArrivalProducts = newArrivalProductData?.data || [];

  return (
    <>
      <Suspense fallback={<div><Loading /></div>}>
        {settings?.slider_section && (
          <section className="banner md:mt-[-180px]">
            <Intro settings={settings} />
          </section>
        )}

        <section className="flash-sale">
          <div className="container-fluid">
            <FlashSale />
          </div>
        </section>

        {settings?.featured_products_section && (
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

              <div>
                <Featured />
              </div>
            </div>
          </section>
        )}

        {settings?.video_section && (
          <section className="video-banner mt-24">
            <VideoBanner settings={settings} />
          </section>
        )}

        <section className="home-category-products md:mt-20 mt-10">
          <HomeCategoryProducts />
        </section>

        {settings?.shop_section && (
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
                  <span>
                    <MdKeyboardDoubleArrowRight
                      size={22}
                      className="group-hover:translate-x-3 transition-transform duration-500"
                    />
                  </span>
                </Link>
              </div>

              <div>
                <NewArrival products={newArrivalProducts} />
              </div>

              {featuredProducts.length > 0 && (
                <div className="text-center py-14 border-t border-gray-200 mt-20">
                  <ImageDescriptionSection featuredProducts={featuredProducts} />
                </div>
              )}
            </div>
          </section>
        )}

        <GetDirectionSection />
        <GallerySection />
        <Popup popup={settings?.popup} />
      </Suspense>
    </>
  );
}
