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
        {category.image == 1 ? (
          <div
            style={{ backgroundImage: `url(${category.image})` }}
            className="hidden lg:block bg-no-repeat bg-center bg-cover w-full h-[240px] py-20 "
          >
            <div className="container text-white flex flex-col justify-center items-center gap-2">
              <h2 className="text-xl md:text-2xl text-center uppercase">
                {category.category_name}
              </h2>
              <div className="text-sm">
                <div className="w-fit mx-auto">
                  <div>
                    <Link href={`/`} className="text-sm ">
                      Home
                    </Link>
                    <span className="mx-2">|</span>
                    <Link href={`/categories`} className="text-sm ">
                      All Categories
                    </Link>
                    <span className="mx-2">|</span>
                    <Link
                      href={`/categories/${category.slug}`}
                      className={`text-sm `}
                    >
                      {category.category_name}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container  flex flex-col justify-center items-center gap-2 py-10">
            <h2 className="text-xl md:text-2xl text-center uppercase">
              {category.category_name}
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
                    href={`/categories`}
                    className="text-sm text-slate-600 hover:text-secondary"
                  >
                    All Categories
                  </Link>
                  <span className="mx-2">|</span>
                  <Link
                    href={`/categories/${category.slug}`}
                    className={`text-sm text-slate-600 hover:text-secondary`}
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
