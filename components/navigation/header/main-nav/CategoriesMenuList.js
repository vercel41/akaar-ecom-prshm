import { Link } from "@/navigation";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { LuMinus } from "react-icons/lu";

const CategoriesMenuList = ({ setShow, categories }) => {
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = React.useState(null);

  return (
    <div className={`!h-full relative`}>
      {categories.map((category) => (
        <div
          className={`!w-full sub-menu font-bold sm:font-normal`}
          key={category.id}
        >
          <div className="flex items-center justify-center px-4 !w-full py-2 text-md">
            <Link
              key={category.id}
              onClick={() => setShow(false)}
              href={`categories/${category.slug}`}
              className="hover:transform hover:translate-x-2 transition ease-in-out duration-300"
            >
              {category.category_name}
            </Link>
            {category.child_categories?.length ? (
              <span className="cursor-pointer">
                {category.id === selectedCategory ? (
                  <LuMinus onClick={() => setSelectedCategory(null)} />
                ) : (
                  <FiPlus onClick={() => setSelectedCategory(category?.id)} />
                )}
              </span>
            ) : null}
          </div>
          <div
            className={`bg-white !w-full overflow-hidden transition-all duration-500 ease-in-out ${
              category.id === selectedCategory ? "max-h-[500px]" : "max-h-0"
            }`}
            style={{
              maxHeight: category.id === selectedCategory ? "500px" : "0px",
            }}
          >
            {category.child_categories?.map((subCategory) => (
              <div className="second-sub-menu" key={subCategory.id}>
                <div
                  className={`hover:text-primary py-2 flex items-center justify-between px-12 text-md mb-2 w-full`}
                >
                  <Link
                    onClick={() => setShow(false)}
                    href={`/categories/${subCategory.slug}`}
                  >
                    {subCategory.category_name}
                  </Link>
                  {subCategory?.child_categories?.length ? (
                    <span className="cursor-pointer">
                      {subCategory.id === selectedSubCategory ? (
                        <LuMinus onClick={() => setSelectedSubCategory(null)} />
                      ) : (
                        <FiPlus
                          onClick={() =>
                            setSelectedSubCategory(subCategory?.id)
                          }
                        />
                      )}
                    </span>
                  ) : null}
                </div>
                <div
                  className={`bg-white !w-full overflow-hidden transition-all duration-500 ease-in-out ${
                    subCategory.id === selectedSubCategory
                      ? "max-h-[300px]"
                      : "max-h-0"
                  }`}
                  style={{
                    maxHeight:
                      subCategory.id === selectedSubCategory ? "300px" : "0px",
                  }}
                >
                  {subCategory.child_categories?.map((childCategory) => (
                    <div className="second-sub-menu" key={childCategory.id}>
                      <Link
                        onClick={() => setShow(false)}
                        className="pl-20 hover:text-primary py-2 flex items-center justify-between px-3 text-md"
                        href={`/categories/${childCategory.slug}`}
                      >
                        {childCategory.category_name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesMenuList;
