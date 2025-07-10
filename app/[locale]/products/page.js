import Link from "next/link";
import ProductsWithFilter from "@/components/products/ProductsWithFilter";
import { fetchData } from "@/lib/fetch-data";

const page = async ({ params, searchParams }) => {
  const [settingsRes] = await Promise.allSettled([
    fetchData({ api: `info/basic` }),
  ]);

  const settings =
    settingsRes.status === "fulfilled" ? settingsRes.value?.data || {} : {};

  return (
    <>
      {settings?.all_product_banner ? (
        <div
          className="hidden  text-white lg:block bg-no-repeat bg-center bg-cover w-full h-[240px] py-20"
          style={{
            backgroundImage: `url(${settings?.all_product_banner})`,
          }}
        >
          <div className="container flex flex-col justify-center items-center gap-2">
            <h2 className="text-xl md:text-2xl text-center uppercase">
              {searchParams?.is_discounted ? "Discounted " : ""}Products
            </h2>
            <div className="">
              <div className="w-fit mx-auto">
                <div>
                  <Link href={`/`} className="text-sm text-white ">
                    Home
                  </Link>
                  <span className="mx-2">|</span>
                  <Link href={`/products`} className="text-sm text-white">
                    {searchParams?.is_discounted ? "Discounted " : "All "}
                    Products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="md:py-12 py-8 border-y border-gray-300">
          <div className="container flex flex-col justify-center items-center gap-2">
            <h2 className="text-xl md:text-2xl text-center uppercase">
              {searchParams?.is_discounted ? "Discounted " : ""}Products
            </h2>

            <div className="text-sm">
              <div className="w-fit mx-auto">
                <div>
                  <Link
                    href={`/`}
                    className="text-sm text-slate-600 hover:text-secondary"
                  >
                    Home
                  </Link>
                  <span className="mx-2">|</span>
                  <Link
                    href={`/products`}
                    className="text-sm text-slate-600 hover:text-secondary"
                  >
                    {searchParams?.is_discounted ? "Discounted " : "All "}
                    Products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <div className="breadcrumb breadcrumb-2 py-4 md:py-5">
        <div className="container">
          <div>
            <Link
              href={`/`}
              className="text-base text-slate-600 hover:text-secondary"
            >
              Home
            </Link>
            <Link
              href={`/products`}
              className="text-base text-slate-600 hover:text-secondary"
            >
              All Products
            </Link>
          </div>
        </div>
      </div> */}

      <ProductsWithFilter customSearchParams={searchParams} />
    </>
  );
};

export default page;
