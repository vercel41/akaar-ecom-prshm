import useSticky from "@/hooks/useSticky";
import { cn } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

export default function CategoriesMegaMenu({ settings, categories }) {
  const [selectedCategory, setSelectedCategory] = useState({});
  const [isOverflowing, setIsOverflowing] = useState(false);
  const containerRef = useRef(null);
  const megaMenuRef = useRef(null);
  const pathname = usePathname();
  const { sticky } = useSticky(100);

  const isHomePage = pathname === "/"; // Check if the current route is the home page


  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        setIsOverflowing(
          containerRef.current.scrollWidth > containerRef.current.clientWidth
        );
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, [categories]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
        setSelectedCategory({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cn("")} ref={megaMenuRef}>
      <div className="container-fluid">
        <div className="!opacity-10"></div>

        <div className="flex justify-center">
          <div className="flex justify-center">
            <div
              className="w-full flex justify-center items-center gap-5 text-sm font-medium !opacity-90 overflow-hidden line-clamp-1 whitespace-nowrap"
              ref={containerRef}
            >
              {categories?.map((category, mainIndex) => (
                <button
                  key={mainIndex}
                  title={category.category_name}
                  onClick={(e) => {
                    setSelectedCategory(category);
                    category.child_categories?.length > 0
                      ? e.preventDefault()
                      : router.push(`/categories/${category.slug}`);
                  }}
                  className={`uppercase ${
                    category?.child_categories?.length
                      ? "flex items-center gap-1.5"
                      : ""
                  } ${sticky || !isHomePage ? "text-black" : "text-white"}`} // Apply text color based on the route
                  style={{ flexShrink: 0 }}
                >
                  <span
                    className={cn(
                      "text-[.9rem]  relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:opacity-0 hover:after:w-full hover:after:opacity-100 after:transition-all after:duration-500  py-[6px] hover:-translate-y-[3px] transition-all duration-500 block tracking-[.2rem],", sticky ? "after:bg-black" : "after:bg-white"
                    )}
                  >
                    {category.category_name}
                  </span>
                </button>
              ))}
              {isOverflowing && (
                <span className="text-sm font-medium !opacity-90">...</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              {isOverflowing && (
                <>
                  <span className="text-sm font-semibold !opacity-90">...</span>
                  <Link
                    href="/categories"
                    className="text-sm font-semibold !opacity-90"
                  >
                    All Categories
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 absolute  bg-white shadow-[0_0_3px_#3d3d3d] w-[95%] left-[2.5%] transition-all duration-500",
            selectedCategory?.child_categories?.length > 0
              ? "p-4 pt-[50px] min-h-[70vh] h-[570px]"
              : "h-0 min-h-0",
            sticky ? "top-[60px]" : "top-[180px]"
          )}
        >
          {selectedCategory?.child_categories?.map((subCategory, index) => (
            <div
              key={index}
              className="mb-2 flex flex-col justify-center items-center h-fit"
            >
              <div className="w-full text-center mb-2">
                <Link
                  href={`/categories/${subCategory.slug}`}
                  onClick={() => setSelectedCategory({})}
                  className="font-bold uppercase block w-full hover:bg-black hover:text-white transition-all ease-in-out duration-500"
                >
                  {subCategory?.category_name}
                </Link>
              </div>
              {subCategory.child_categories &&
                subCategory.child_categories.length > 0 &&
                subCategory.child_categories.map((childCategory, subIndex) => (
                  <div key={subIndex} className="w-full text-center">
                    <Link
                      href={`/categories/${childCategory.slug}`}
                      onClick={() => setSelectedCategory({})}
                      className="mt-2 font-normal text-xs uppercase hover:bg-black hover:text-white transition-all ease-in-out duration-500 w-full block"
                    >
                      {childCategory?.category_name}
                    </Link>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
