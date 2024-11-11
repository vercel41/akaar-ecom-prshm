import Intro from "./_components/intro";
import FlashSale from "./_components/FlashSale";
import VideoBanner from "./_components/VideoBanner";
import CategoryBanners from "./_components/CategoryBanners";
import HomeCategoryProducts from "./_components/HomeCategoryProducts";
import { fetchData } from "@/lib/fetch-data";
import { Link } from "@/navigation";
import Featured from "./_components/Featured";
import Popup from "./_components/Popup";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import NewArrival from "./_components/NewArrival";
import GetDirectionSection from "./_components/GetDirectionSection";

export default async function Home() {
  const [settingsRes, transRes] = await Promise.allSettled([
    fetchData({ api: `info/basic` }),
    fetchData({ api: "translations" }),
  ]);

  const settings =
    settingsRes.status === "fulfilled" ? settingsRes.value?.data || {} : {};
  const translations =
    transRes.status === "fulfilled" ? transRes.value?.data || {} : {};

  const newArrivalProductData = await fetchData({
    api: "product-latest?per_page=5",
  });
  const newArrivalProducts = newArrivalProductData?.data || [];

  return (
    <>
      {settings?.slider_section ? (
        <section className="banner">
          <Intro settings={settings} />
        </section>
      ) : null}

      {settings?.category_section ? (
        <section className="banners pt-14">
          <div className="container-fluid">
            <CategoryBanners settings={settings} />
          </div>
        </section>
      ) : null}

      <section className="flash-sale">
        <div className="container-fluid">
          <FlashSale />
        </div>
      </section>

      {settings?.featured_products_section ? (
        <section className="new-products ">
          <div className="container">
            <div className="py-10 text-center ">
              <h2 className="sec-title pb-3">
                {translations["featured-products"] || "Featured Products"}
              </h2>
              <Link href="/featured-products" className="underline">
                Browse our featured products
              </Link>
            </div>

            <div className="">
              <Featured />
            </div>
          </div>
        </section>
      ) : null}

      {settings?.video_section ? (
        <section className="video-banner mt-24">
          <VideoBanner />
        </section>
      ) : null}

      <section className="home-category-products md:mt-20 mt-10">
        <HomeCategoryProducts />
      </section>

      {settings?.shop_section ? (
        <section className="new-products md:my-20 my-10">
          <div className="container-fluid">
            <div className="py-4 pb-10 text-center flex  justify-center flex-col">
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

            <div className="">
              <NewArrival products={newArrivalProducts} />
            </div>
          </div>
        </section>
      ) : null}

      <GetDirectionSection />

      <Popup popup={settings?.popup} />
    </>
  );
}
