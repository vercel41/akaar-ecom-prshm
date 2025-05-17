import React from "react";
import { twMerge } from "tailwind-merge";

const HorizontalScrollView = ({ children, className }) => {
  return (
    <div className="custom-horizontal-scroll scrollbar-hide">
      <div
        className={twMerge(
          "flex small-container justify-around gap-3 w-fit p-4 md:px-0",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default HorizontalScrollView;
