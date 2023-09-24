"use client";
import useSelectURLQuery from "@/hooks/useSelectURLQuery";

const SortSelect = () => {
  const { handleSelectChange } = useSelectURLQuery();
  return (
    <>
      <div className="sort-by-product-wrap flex items-center gap-x-4 gap-y-4">
        <div className="sort-by">
          <span className="">Sort:</span>
        </div>
        <div className="sort-by-dropdown-wrap">
          <select
            className="w-40 md:w-48 text-base text-slate-900 bg-white border border-slate-300 px-3 py-1 focus:outline-0"
            onChange={(e) => handleSelectChange("sort_type", e.target.value)}
          >
            <option value="default">Random</option>
            <option value="new">New</option>
            <option value="low_high">Price (Low to High)</option>
            <option value="high_low">Price (High to Low)</option>
            {/* <option value="rating_low_high">Rating (Low to High)</option>
            <option value="rating_high_low">Rating (High to Low)</option> */}
          </select>
        </div>
      </div>
    </>
  );
};

export default SortSelect;
