import React from "react";
import { HiCheck } from "react-icons/hi2";
import { getBdFormattedDateTime } from "@/utils/formatDate";

export default function OrderStep({ date, title, message, isComplete }) {
  return isComplete ? (
    <li className="pb-3 pl-6 border-l border-slate-300">
      <span className="absolute flex items-center justify-center w-4 h-4 bg-primary rounded-full -left-2">
        <HiCheck className="text-white" />
      </span>
      <h3 className="text-primary">{getBdFormattedDateTime(date)}</h3>
      <div className="bg-white border border-slate-200 p-4 rounded-xl mt-4">
        <h3 className="font-title font-bold mb-2">{title}</h3>
        <p>{message}</p>
      </div>
    </li>
  ) : (
    <li className="relative pb-3 pl-6 border-l border-dashed border-slate-300">
      <div className="absolute flex items-center justify-center w-4 h-4 bg-slate-400 rounded-full -left-2 top-5"></div>
      <div className="bg-white p-4 border border-slate-100 rounded-xl">
        <h3 className="font-title font-bold mb-2">{title}</h3>
        <p>{message}</p>
      </div>
    </li>
  );
}
