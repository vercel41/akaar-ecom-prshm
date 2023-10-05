import Link from "next/link";
import Image from "next/image";
import { fetchData } from "@/utils/fetchData";
import ProductsWithFilter from "@/components/products/ProductsWithFilter";

// ** Imoprt icons
// import noImage from "@/public/assets/images/no-image.png";

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

  // console.log(category);

  return (
    <>
      <div className="breadcrumb breadcrumb-2 py-5">
        <div className="container">
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
              Categories
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

      <ProductsWithFilter
        customSearchParams={customSearchParams}
        category={category}
      />
    </>
  );
};

export default page;
