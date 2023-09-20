"use client";
import useSelectURLQuery from "@/hooks/useSelectURLQuery";

const SizeFilter = ({ sizes, selectedSizes }) => {
  const { handleSelectChange } = useSelectURLQuery();

  const handleChange = (e) => {
    if (e.target.checked) {
      handleSelectChange("sizes", [...selectedSizes, e.target.value].join(","));
    } else {
      handleSelectChange(
        "sizes",
        selectedSizes.filter((size) => size !== `${e.target.value}`).join(",")
      );
    }
  };

  return (
    <>
      <div id="size-filter">
        <h6 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-3">
          By Sizes
        </h6>
        <div className="size-filter">
          {/* bg-blue-500 */}
          {sizes?.map((size, i) => (
            <div className="input-grp mt-3" key={i}>
              <label
                className="flex items-center gap-2 text-base text-slate-700 cursor-pointer"
                htmlFor={`size-${i}`}
              >
                <input
                  type="checkbox"
                  id={`size-${i}`}
                  checked={selectedSizes.includes(`${size.name}`)}
                  value={size.name}
                  onChange={handleChange}
                />
                <span className="pt-1 capitalize">{size.name}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SizeFilter;
