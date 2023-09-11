"use client";
import Link from "next/link";
import { useGetPopularCategoriesQuery } from "@/store/features/api/categoriesAPI";
import Image from "next/image";
import noImage from "@/public/assets/images/no-image.png";

const PopularCategory = () => {
    const { data: popularCategoriesData } = useGetPopularCategoriesQuery();
    const popularCategories = popularCategoriesData?.data || [];

    console.log('popularCategories====', popularCategories);
    return (
        <>
            <div className="features grid grid-cols-3 gap-6">
                {popularCategories?.map((category, i) => (
                    <div key={i} class="single-cat mb-4 mb-sm-0" style={{ backgroundColor: "yellow" }}>
                        <div class="cat-image">
                            <Link href="#">
                                <Image
                                    src={category?.image || noImage}
                                    alt={category.category_name}
                                    width={116}
                                    height={625}
                                    className="w-[100%] h-[652px] object-contain hover:scale-110"
                                />
                            </Link>
                            <div class="cat-content">
                                <div class="cat-heading mb-3 text-6xl font-sans text-white italic ">
                                    <h1>{category.category_name}</h1>
                                </div>
                                <Link href="#">Shop Now</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default PopularCategory;
