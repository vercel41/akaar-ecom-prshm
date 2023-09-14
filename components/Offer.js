import React from "react";
import OfferSlider from "./elements/sliders/OfferSlider";
const offers = [
  {
    title: "15% Discount On Winter Clear Out",
    text: "* Only Selected Products",
  },
  {
    title: "Boshonto Items Are Comming Soon",
    text: "Get Ready",
  },
  {
    title: "10% Extra Discout For Teens",
    text: "* For First Order",
  },
];
export default function Offer() {
  return (
    <div class="offer bg-[#f5e7cc] py-3">
      <div class="container">
        {/* <div class="grid grid-cols-3 justify-between">
          <div class="item">
            <h5 className="text-slate-700 font-bold">
              15% Discount On Winter Clear Out
            </h5>
            <p className="text-slate-600 text-sm">* Only Selected Products</p>
          </div>
          <div class="item">
            <h5 className="text-slate-700 font-bold">
              Boshonto Items Are Comming Soon
            </h5>
            <p className="text-slate-600 text-sm">Get Ready</p>
          </div>
          <div class="item">
            <h5 className="text-slate-700 font-bold">
              10% Extra Discout For Teens
            </h5>
            <p className="text-slate-600 text-sm">* For First Order</p>
          </div>
        </div> */}
        <OfferSlider sliders={offers} />
      </div>
    </div>
  );
}
