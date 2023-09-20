import Slider from "rc-slider";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const PriceRangeSlider = ({ min_price, max_price }) => {
  const [priceRange, setPriceRange] = useState({
    min: min_price,
    max: max_price,
  });

  const router = useRouter();
  let pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createPriceQueryString = useCallback(
    (name1, value1, name2, value2) => {
      const params = new URLSearchParams(searchParams);
      params.set(name1, value1);
      params.set(name2, value2);
      return params.toString();
    },
    [searchParams]
  );

  // Reset the price state and slider default value when min_price or max_price change
  useEffect(() => {
    setPriceRange({
      min: min_price,
      max: max_price,
    });
  }, [min_price, max_price]);

  const handlePriceRangeChange = (value) => {
    setPriceRange({ min: value[0], max: value[1] });
    router.push(
      pathname +
        "?" +
        createPriceQueryString("min_price", value[0], "max_price", value[1])
    );
  };

  return (
    <div className="price-range">
      <h6 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-3 mb-3">
        By Price
      </h6>
      <div className="flex justify-between my-2">
        <span className="text-sm font-medium border border-secondary rounded px-1">
          ৳{priceRange.min}
        </span>
        <span className="text-sm font-medium border border-secondary rounded px-1">
          ৳{priceRange.max}
        </span>
      </div>
      <Slider
        range
        allowCross={false}
        value={[priceRange.min, priceRange.max]} // Use default values based on min_price and max_price
        defaultValue={[min_price, max_price]} // Use default values based on min_price and max_price
        min={min_price}
        max={max_price}
        // dotStyle={"text-red-500"}
        onChange={(value) => handlePriceRangeChange(value)}
      />
    </div>
  );
};

export default PriceRangeSlider;
