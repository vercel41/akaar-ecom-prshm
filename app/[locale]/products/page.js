import Link from "next/link";
import ProductsWithFilter from "@/components/products/ProductsWithFilter";
import { fetchData } from "@/utils/fetchData";

const page = async ({ params, searchParams }) => {
  const [settingsRes] = await Promise.allSettled([
    fetchData({ api: `info/basic` }),
  ]);

  const settings =
    settingsRes.status === "fulfilled" ? settingsRes.value?.data || {} : {};

  return (
    <>
      <div
        // className="breadcrumb bg-[url('/assets/images/banner/pdctpage-banner.png')] bg-no-repeat bg-cover py-20"
        className="bg-no-repeat bg-cover w-full h-[240px] breadcrumb py-20"
        style={{
          backgroundImage: `url(${settings?.all_product_banner})`,
        }}
      >
        <div className="container">
          <div className="text-center">
            <h3 className="text-2xl font-bold font-title text-white mb-4">
              সকল প্রডাক্ট
            </h3>
            <div>
              <Link
                href={`/`}
                className="text-base text-white hover:text-primary"
              >
                হোম
              </Link>
              <Link
                href={`/products`}
                className="text-base text-white hover:text-primary"
              >
                সকল প্রডাক্ট
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ProductsWithFilter customSearchParams={searchParams} />
    </>
  );
};

export default page;
