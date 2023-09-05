"use client";

import { useGetCategoriesQuery } from "@/store/features/api/categoriesAPI";
import { usePathname, useRouter } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";

const CategoryFilterBackup = ({
  setFilters,
  selectedCategory,
  setSelectedCategory,
  mainCategory,
  setMainCategory,
  subCategory,
  setSubCategory,
  childCategory,
  setChildCategory,
}) => {
  const { data: categoriesData } = useGetCategoriesQuery();
  const categories = categoriesData?.data || [];

  const router = useRouter();
  let pathname = usePathname();

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    router.push(pathname + "?category_id=" + category.id);
  };

  const handleMainCategorySelect = (category) => {
    setMainCategory(category);
    setSubCategory({});
    setChildCategory({});
    handleCategoryChange(category);
  };

  const handleSubCategorySelect = (category) => {
    setSubCategory(category);
    setChildCategory({});
    handleCategoryChange(category);
  };
  const handleChildCategorySelect = (category) => {
    setChildCategory(category);
    handleCategoryChange(category);
  };

  const resetCategoriesSelect = () => {
    setMainCategory({});
    setSubCategory({});
    setChildCategory({});
    setSelectedCategory(null);
    router.push(pathname);
  };

  const renderCategories = (categoryList) => {
    if (mainCategory?.id && mainCategory?.child_categories?.length > 0) {
      return (
        <>
          <button
            className={`cursor-pointer hover:font-bold`}
            onClick={() => resetCategoriesSelect()}
          >
            <IoChevronBackOutline />
            All Categories
          </button>
          <ul className="space-y-2">
            <li>
              <button
                className={`cursor-pointer pl-4  ${
                  selectedCategory.id === mainCategory.id ? "font-bold" : ""
                }`}
                onClick={() => handleMainCategorySelect(mainCategory)}
              >
                <IoChevronBackOutline />
                {mainCategory.category_name}
              </button>

              {/* sub categories  */}
              <ul className="pl-8 space-y-2">
                {subCategory?.id &&
                subCategory?.child_categories?.length > 0 ? (
                  <li>
                    <button
                      className={`cursor-pointer  ${
                        selectedCategory.id === subCategory.id
                          ? "font-bold"
                          : ""
                      }`}
                      onClick={() => handleSubCategorySelect(subCategory)}
                    >
                      <IoChevronBackOutline />
                      {subCategory.category_name}
                    </button>
                    {/* child categories  */}
                    <ul className="pl-8 space-y-2">
                      {childCategory?.id ? (
                        <li>
                          <button
                            className={`cursor-pointer  ${
                              selectedCategory.id === childCategory.id
                                ? "font-bold"
                                : ""
                            }`}
                            onClick={() =>
                              handleChildCategorySelect(childCategory)
                            }
                          >
                            {childCategory.category_name}
                          </button>
                        </li>
                      ) : (
                        subCategory.child_categories.map((child) => (
                          <li key={child.id}>
                            <button
                              className={`cursor-pointer  ${
                                selectedCategory.id === child.id
                                  ? "font-bold"
                                  : ""
                              }`}
                              onClick={() => handleChildCategorySelect(child)}
                            >
                              {child.category_name}
                            </button>
                          </li>
                        ))
                      )}
                    </ul>
                  </li>
                ) : (
                  mainCategory.child_categories.map((subCategory) => (
                    <li key={subCategory.id} className="pl-4">
                      <button
                        className={`cursor-pointer  ${
                          selectedCategory.id === subCategory.id
                            ? "font-bold"
                            : ""
                        }`}
                        onClick={() => handleSubCategorySelect(subCategory)}
                      >
                        {subCategory.category_name}
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </li>
          </ul>
        </>
      );
    }
    return (
      <ul className="space-y-2">
        {categoryList.map((category) => (
          <li key={category.id}>
            <button
              className={`cursor-pointer ${
                selectedCategory?.id === category.id ? "font-bold" : ""
              }`}
              onClick={() => handleMainCategorySelect(category)}
            >
              {category.category_name}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <div className="pr-5">
        <h6 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-3">
          ক্যাটাগরি থেকে কেনাকাটা
        </h6>
        <div className="category-filter">{renderCategories(categories)}</div>
      </div>
    </>
  );
};

export default CategoryFilterBackup;
