import Link from "next/link";
import { fetchData } from "@/lib/fetch-data";
import ProductsWithFilter from "@/components/products/ProductsWithFilter";

const page = async ({ params, searchParams }) => {
  const { category_slug } = params;
  const [categoryResponse] = await Promise.allSettled([
    fetchData({ api: `category/${category_slug}` }),
  ]);

  const category =
    categoryResponse.status === "fulfilled"
      ? categoryResponse.value?.data || {}
      : {};
  // const popularCategories =
  //   dataResponse.status === "fulfilled" ? dataResponse.value?.data || [] : [];

  //forming search params
  const customSearchParams = {
    category_id: category?.id,
    ...searchParams,
  };
  return (
    <>
      <div className="">
        {category.image ? (
          <div
            style={{ backgroundImage: `url(${category.image})` }}
            className="hidden lg:block bg-no-repeat bg-center bg-cover w-full h-[240px] breadcrumb py-20"
          >
            <div className="container text-white flex flex-col justify-center items-center gap-2">
              <h2 className="text-xl md:text-2xl text-center uppercase">
                {category.category_name}
              </h2>
              <div className="breadcrumb breadcr">
                <div className="w-fit mx-auto">
                  <div>
                    <Link href={`/`} className="text-base ">
                      Home
                    </Link>
                    <Link href={`/categories`} className="text-base ">
                      All Categories
                    </Link>
                    <Link
                      href={`/categories/${category.slug}`}
                      className={`text-base `}
                    >
                      {category.category_name}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container flex flex-col justify-center items-center gap-2">
            <h2 className="text-xl md:text-2xl text-center uppercase">
              {category.category_name}
            </h2>
            <div className="breadcrumb breadcrumb-2">
              <div className="w-fit mx-auto">
                <div>
                  <Link
                    href={`/`}
                    className="text-base text-slate-600 hover:text-secondary"
                  >
                    Home
                  </Link>
                  <Link
                    href={`/categories`}
                    className="text-base text-slate-600 hover:text-secondary"
                  >
                    All Categories
                  </Link>
                  <Link
                    href={`/categories/${category.slug}`}
                    className={`text-base text-slate-900 hover:text-secondary`}
                  >
                    {category.category_name}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <ProductsWithFilter
        customSearchParams={customSearchParams}
        category={category}
      />
    </>
  );
};

export default page;
