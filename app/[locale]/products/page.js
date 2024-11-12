import Link from "next/link";
import ProductsWithFilter from "@/components/products/ProductsWithFilter";
// import { fetchData } from "@/utils/fetchData";

const page = ({ params, searchParams }) => {
  // const [settingsRes] = await Promise.allSettled([
  //   fetchData({ api: `info/basic` }),
  // ]);

  // const settings =
  //   settingsRes.status === "fulfilled" ? settingsRes.value?.data || {} : {};

  return (
    <>
      <div className="md:py-12 py-8 border-y border-gray-300">
        <div className="container flex flex-col justify-center items-center gap-2">
          <h2 className="text-xl md:text-2xl text-center uppercase">
            Products
          </h2>
          <div className="breadcrumb breadcrumb-2">
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
          </div>
        </div>
      </div>
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
