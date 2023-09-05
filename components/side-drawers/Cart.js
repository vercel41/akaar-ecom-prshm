"use client";
import DrawerRight from "@/components/elements/DrawerRight";
import { toggleCart } from "@/store/features/cartSlice";
import Link from "next/link";
import React from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import CartCard from "../CartCard";
import { FiPlus } from "react-icons/fi";
import { getMultipliedColumnTotal } from "@/utils/getTotal";

const Cart = () => {
  const { isCartOpen, cart } = useSelector((state) => state.cart);
  const { settings } = useSelector((state) => state.common);
  // console.log(settings);
  const dispatch = useDispatch();
  const closeCart = () => {
    dispatch(toggleCart());
  };

  return (
    <DrawerRight
      title={`কার্ট লিষ্ট (${cart.length} টি প্রডাক্ট)`}
      show={isCartOpen}
      setShow={closeCart}
    >
      {settings?.free_delivery_charges_limit ? (
        <div
          style={{
            background: "linear-gradient(90deg, #EF4444 -2.83%, #F99104 100%)",
          }}
          className="p-4 text-white"
        >
          {settings?.free_delivery_charges_limit} টাকার উপের অর্ডার করেল
          ডেলিভারি চার্জ ফ্রী! সারাদেশে ক্যাশ অন ডেলিভারি।
        </div>
      ) : null}
      <div className="p-8 flex flex-col h-[77%]">
        <div className="overflow-y-auto">
          {cart.map((item) => (
            <CartCard key={item.id} item={item} />
          ))}

          <div className="my-8 text-center">
            <Link
              href="/products"
              onClick={closeCart}
              className="text-secondary-700 font-bold"
            >
              <span className="inline-flex items-center">
                <FiPlus size={24} className="mr-2" />
                আরো শপিং করুন
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="fixed left-0 bottom-0 w-full p-4 bg-slate-50 border-t border-slate-200 flex gap-12 justify-between items-center">
        <div className="text-center">
          <p className="">সর্বমোট:</p>
          <h3 className="text-slate-900 font-bold">
            {`৳ ${getMultipliedColumnTotal(cart, "quantity", "new_price")}`}
          </h3>
        </div>
        <Link
          href={"/checkout"}
          onClick={closeCart}
          className="bg-primary py-3 px-6 w-[276px] text-white rounded-lg text-center active:scale-95"
        >
          <span className="mr-2">এখনই কিনুন</span>
          <HiArrowLongRight size={20} />
        </Link>
      </div>
    </DrawerRight>
  );
};

export default Cart;
