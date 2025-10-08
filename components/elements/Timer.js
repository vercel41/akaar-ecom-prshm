"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// ** Import Util Functions
import getCountDownValues from "../../utils/countdown";

const Timer = ({ targetDate }) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  const [days, hours, minutes, seconds] = getCountDownValues(countDown);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return (
    <>
      <div className="sale-counter flex gap-3">
        <div className="single-counter flex flex-col justify-center items-center w-[62px] h-[62px] bg-[#333]">
          <p
            className="count-num text-base font-semibold font-noto_serif text-white"
            suppressHydrationWarning
          >
            {days}
          </p>
          <p className="text-[10px] text-white">Day</p>
        </div>
        <div className="single-counter flex flex-col justify-center items-center w-[62px] h-[62px] bg-[#333]">
          <p
            className="count-num text-base font-semibold font-noto_serif text-white"
            suppressHydrationWarning
          >
            {hours}
          </p>
          <p className="text-[10px] text-white">Hours</p>
        </div>
        <div className="single-counter flex flex-col justify-center items-center w-[62px] h-[62px] bg-[#333]">
          <p
            className="count-num text-base font-semibold font-noto_serif text-white"
            suppressHydrationWarning
          >
            {minutes}
          </p>
          <p className="text-[10px] text-white">Minutes</p>
        </div>
        <div className="single-counter flex flex-col justify-center items-center w-[62px] h-[62px] bg-[#333]">
          <p
            className="count-num text-base font-semibold font-noto_serif text-white"
            suppressHydrationWarning
          >
            {seconds}
          </p>
          <p className="text-[10px] text-white">Seconds</p>
        </div>
      </div>
    </>
  );
};

export default Timer;
