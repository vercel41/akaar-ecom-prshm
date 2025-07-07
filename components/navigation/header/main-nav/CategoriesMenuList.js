import DrawerRight from "@/components/elements/DrawerRight";
import { Link } from "@/navigation";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { LuMinus } from "react-icons/lu";

const CategoriesMenuList = ({ setShow, categories }) => {
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  const [selectedSubCategory, setSelectedSubCategory] = React.useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedCategory(null);
  };

  return (
    <div className={`!h-full relative`}>
      {categories.map((category) => (
        <div
          className={`!w-full sub-menu font-bold sm:font-normal`}
          key={category.id}
        >
          <div className="flex items-center justify-center px-4 !w-full py-2 text-md">
            {category.child_categories?.length ? (
              <button
                onClick={() => {
                  setSelectedCategory(category);
                  setIsDrawerOpen(true);
                }}
                className="hover:transform hover:translate-x-2 transition ease-in-out duration-300"
              >
                {category.category_name}
              </button>
            ) : (
              <Link
                href={`/categories/${category.slug}`}
                onClick={() => setShow(false)}
                className="hover:transform hover:translate-x-2 transition ease-in-out duration-300"
              >
                {category.category_name}
              </Link>
            )}
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

      <DrawerRight
        show={isDrawerOpen}
        setShow={handleCloseDrawer}
        title={selectedCategory?.category_name || "Subcategories"}
      >
        <div className="p-4 max-w-md  mx-auto w-full">
          <div className="space-y-2">
            {selectedCategory?.child_categories?.map((subCategory) => (
              <div key={subCategory.id} className="text-center">
                <div className="py-2 border-b border-gray-100">
                  <Link
                    href={`/categories/${subCategory.slug}`}
                    onClick={(e) => {
                      setShow(false);
                      handleCloseDrawer();
                    }}
                    className="py-2 hover:text-primary font-medium inline-block"
                  >
                    {subCategory.category_name}
                  </Link>
                </div>
                {subCategory.child_categories?.length > 0 && (
                  <div className="mt-1 space-y-1">
                    {subCategory.child_categories.map((childCategory) => (
                      <div key={childCategory.id} className="py-1">
                        <Link
                          href={`/categories/${childCategory.slug}`}
                          onClick={(e) => {
                            setShow(false);
                            handleCloseDrawer();
                          }}
                          className="block py-1.5 text-sm text-gray-700 hover:text-primary transition-colors duration-200"
                        >
                          {childCategory.category_name}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </DrawerRight>
    </div>
  );
};

export default CategoriesMenuList;
