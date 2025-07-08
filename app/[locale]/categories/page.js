import Link from "next/link";
import Image from "next/image";
import { fetchData } from "@/lib/fetch-data";
import noImage from "@/public/assets/images/no-image.png";

const page = async ({ searchParams }) => {
  const { slug } = searchParams;

  const data = await fetchData({ api: "categories?no_child=1" });

  let singleData = null;
  if (slug) {
    singleData = await fetchData({ api: `category/${slug}` });
  }

  const categories = slug
    ? singleData?.data?.child_categories || []
    : data?.data || [];
  const [settingsRes] = await Promise.allSettled([
    fetchData({ api: `info/basic` }),
  ]);

  const settings =
    settingsRes.status === "fulfilled" ? settingsRes.value?.data || {} : {};

  return (
    <>
      {settings?.category_banner_image ? (
        <div
          style={{
            backgroundImage: `url(${settings?.category_banner_image})`,
          }}
          className="hidden  text-white lg:block bg-no-repeat bg-center bg-cover w-full h-[240px] breadcrumb py-20"
        >
          <h2 className="text-xl md:text-2xl text-center uppercase">
            Categories
          </h2>

          <div className="breadcrumb">
            <div className="w-fit mx-auto">
              <div>
                <Link href={`/`} className="text-base ">
                  Home
                </Link>
                <Link href={`/categories`} className="text-base ">
                  All Categories
                </Link>

                {slug && (
                  <Link href={`/categories/${slug}`} className="text-base ">
                    {singleData?.data?.category_name}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="md:py-12 py-8 border-y border-gray-300">
          <div className="container flex flex-col justify-center items-center gap-2">
            <h2 className="text-xl md:text-2xl text-center uppercase">
              Categories
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
                    className="text-base text-slate-900 hover:text-secondary"
                  >
                    All Categories
                  </Link>

                  {slug && (
                    <Link
                      href={`/categories/${slug}`}
                      className="text-base text-slate-900 hover:text-secondary"
                    >
                      {singleData?.data?.category_name}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mt-4 md:mt-8 mb-4 md:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-5 mb-12">
          {categories?.map((category, i) => (
            <div
              className="category flex flex-col justify-center items-center border p-3 lg:p-4"
              key={i}
            >
              <Link
                href={`/categories/${category.slug}`}
                className="category-img w-full md:w-[200px] h-[150px] md:h-[200px] overflow-hidden"
              >
                <Image
                  src={category?.icon || noImage}
                  alt={category.category_name}
                  width={180}
                  height={200}
                  className="h-full w-full object-cover object-top hover:scale-105 ease-in-out duration-300"
                />
              </Link>
              <Link
                href={`/categories/${category.slug}`}
                className="block text-lg text-slate-700 text-center"
              >
                {category.category_name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
