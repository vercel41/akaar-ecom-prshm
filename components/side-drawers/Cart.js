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
      title={`Cart: (${cart.length} Items)`}
      show={isCartOpen}
      setShow={closeCart}
    >
      {settings?.free_delivery_charges_limit ? (
        <div className="p-4 text-white bg-primary">
          Orders over {settings?.free_delivery_charges_limit} taka free delivery
          charge!
        </div>
      ) : null}
      <div className="p-8 flex flex-col h-[77%]">
        <div className="overflow-y-auto">
          {cart.map((item) => (
            <CartCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="fixed left-0 bottom-0 w-full p-4 bg-slate-50 border-t border-slate-200 flex gap-12 justify-between items-center">
        <div className="text-center">
          <p className="">Total:</p>
          <h3 className="text-slate-900 font-bold">
            {`৳ ${getMultipliedColumnTotal(cart, "quantity", "new_price")}`}
          </h3>
        </div>
        <Link
          href={"/checkout"}
          onClick={closeCart}
          className="bg-primary py-3 px-6 w-[276px] text-white text-center active:scale-95"
        >
          <span className="mr-2">Checkout Now</span>
          <HiArrowLongRight size={20} />
        </Link>
      </div>
    </DrawerRight>
  );
};

export default Cart;
