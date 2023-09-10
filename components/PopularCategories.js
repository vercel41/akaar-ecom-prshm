import { fetchData } from "@/utils/fetchData";
import CategorySlider from "./elements/sliders/CategorySlider";
import Link from "next/link";
import Image from "next/image";
import noImage from "@/public/assets/images/no-image.png";

const PopularCategories = async () => {
  const data = await fetchData({ api: "popular-categories?no_child=1" });
  const popularCategories = data?.data || [];
  return (
    <>
      {popularCategories?.map((category, i) => (
        <>
          {/* <Link
              href={`/categories/${category.slug}`}
              className="category-img flex justify-center items-center w-[164px] h-[164px] bg-white rounded-full"
            >
              <Image
                src={category?.icon || noImage}
                alt={category.category_name}
                width={116}
                height={78}
                //   style={{ width: "auto", height: "auto" }}
                className="w-[116px] h-[78px] object-contain hover:scale-110"
              />
            </Link>
            <Link
              href={`/categories/${category.slug}`}
              className="block text-lg text-white text-center mt-4"
            >
              {category.category_name}
            </Link> */}


          <div href="#" class="bg-white py-6 px-4 flex items-center justify-between gap-4" >
            <Link
              href={`/categories/${category.slug}`}
              className=""
            >
              <Image
                src={category?.icon || noImage}
                alt={category.category_name}
                width={50}
                height={50}
                className="w-[50px] h-[auto] object-contain hover:scale-110"
              />
            </Link>
            <Link
              href={`/categories/${category.slug}`}
              className=""
            >
             <h5>{category.category_name}</h5>
            </Link>
          </div>
        </>
      ))}
    </>
  );
};

export default PopularCategories;
