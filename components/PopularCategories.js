import { fetchData } from "@/utils/fetchData";
import Link from "next/link";
import Image from "next/image";
import noImage from "@/public/assets/images/no-image.png";

const PopularCategories = async () => {
  const data = await fetchData({ api: "popular-categories?no_child=1" });
  const popularCategories = data?.data || [];
  return (
    <>
      {popularCategories?.map((category) => (
        <div key={category.id} href="#" className="bg-white py-6 px-4">
          <Link
            href={`/categories/${category.slug}`}
            className="flex items-center gap-4"
          >
            <Image
              src={category?.icon || noImage}
              alt={category.category_name}
              width={50}
              height={50}
              className="w-[50px] h-[auto] object-contain hover:scale-110"
            />
            <h5>{category.category_name}</h5>
          </Link>
        </div>
      ))}
    </>
  );
};

export default PopularCategories;
