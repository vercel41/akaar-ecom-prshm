"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

export default function CategoriesNav({ categories }) {
  const { locale } = useParams();
  const pathname = usePathname();
  // const pathArray = pathname.split("/");
  // pathArray.includes("categories") ||
  // pathArray.includes("products") ||
  // pathArray.includes("checkout")

  const isHome = pathname === "/" || pathname === `/${locale}`;
  if (!isHome) return null;

  return (
    <div className="categories-nav bg-[#D04FC4] hidden lg:block">
      <div className="container">
        <ul className="nav-menu relative flex items-center gap-4 py-2 flex-wrap">
          {categories.map((category) => (
            <li key={category.id} className="nav-item [&>*]:text-xs">
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
