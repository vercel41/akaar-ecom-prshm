"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function CategoriesNav({ categories }) {
  const pathname = usePathname();
  const pathArray = pathname.split("/");
  if (pathArray.includes("categories") || pathArray.includes("products"))
    return null;

  return (
    <div class="categories-nav bg-[#D04FC4] hidden lg:block">
      <div class="container">
        <ul class="nav-menu relative flex items-center gap-4 py-2 flex-wrap">
          {categories.map((category) => (
            <li key={category.id} class="nav-item [&>*]:text-xs">
              <Link
                href={`/categories/${category.slug}`}
                className="uppercase font-light"
              >
                {category.category_name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
