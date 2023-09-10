"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import useSelectURLQuery from "@/hooks/useSelectURLQuery";

const BrandFilter = ({ filteredBrands, selectedBrandIds }) => {
  const [showAll, setShowAll] = useState(false);
  const { handleSelectChange } = useSelectURLQuery();
  let brands = filteredBrands || [];

  if (!showAll && brands?.length > 6) {
    brands = brands?.slice(0, 6);
  }

  //Handling Brand select
  const handleChange = (e) => {
    if (e.target.checked) {
      const ids = [...selectedBrandIds, e.target.value];
      handleSelectChange("brand_ids", ids.join(","));
    } else {
      handleSelectChange(
        "brand_ids",
        selectedBrandIds.filter((id) => id !== `${e.target.value}`).join(",")
      );
    }
  };

  return (
    <>
      <div className="pr-5">
        <h6 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-3">
          ব্র্যান্ড সমূহ
        </h6>
        <div className="category-filter">
          {brands?.map((brand) => (
            <div className="input-grp mt-3" key={brand.id}>
              <label
                className="flex items-center gap-2 text-base text-slate-700 cursor-pointer"
                htmlFor={`brd-${brand.id}`}
              >
                <input
                  type="checkbox"
                  id={`brd-${brand.id}`}
                  checked={selectedBrandIds.includes(`${brand.id}`)}
                  name={brand.brand_name}
                  value={brand.id}
                  onChange={handleChange}
                />
                {brand.brand_name}
              </label>
            </div>
          ))}
          {!showAll && filteredBrands?.length > 6 ? (
            <div className="text-center mt-3">
              <span
                onClick={() => setShowAll(true)}
                className="inline-flex items-center text-primary cursor-pointer"
              >
                <FiPlus size={24} className="mr-2" />
                আরও {filteredBrands?.length - 6}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default BrandFilter;
