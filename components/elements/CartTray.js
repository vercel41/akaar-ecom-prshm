"use client";

import { useDispatch, useSelector } from "react-redux";

// ** Import Icons
// import Image from "next/image";
import { TbCurrencyTaka } from "react-icons/tb";
import { toggleCart } from "@/store/features/cartSlice";
import { getMultipliedColumnTotal } from "@/utils/getTotal";
// import cartImage from "@/public/assets/images/cart.gif";
// import dynamic from "next/dynamic";
import { BsCart3 } from "react-icons/bs";
// const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), {
//   ssr: false,
// });

const CartTray = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleCart = () => {
    dispatch(toggleCart());
  };

  return (
    <>
      <div
        className="cart fixed top-1/2 right-0 cursor-pointer z-40 text-white"
        onClick={handleCart}
      >
        <div className="icon bg-white border border-r-0 border-primary rounded-ss-lg px-1 text-center">
          <BsCart3 size={36} className="text-primary m-2" />
        </div>
        <div className="rounded-es-lg text-center bg-primary pt-2">
          <p className="text-xs text-white">{cart?.length} Items</p>
          <div className="text-xs font-semibold text-white flex items-center justify-center">
            <TbCurrencyTaka size={16} className="mb-1" />
            {/* <AnimatedNumbers
              animateToNumber={getMultipliedColumnTotal(
                cart,
                "quantity",
                "new_price"
              )}
              includeComma
              // fontStyle={{ fontSize: 32 }}
              locale="en-US"
              configs={(number, index) => {
                return { mass: 1, tension: 230 * (index + 1), friction: 140 };
              }}
              // configs={[
              //   { mass: 1, tension: 220, friction: 100 },
              //   { mass: 1, tension: 180, friction: 130 },
              //   { mass: 1, tension: 280, friction: 90 },
              //   { mass: 1, tension: 180, friction: 135 },
              //   { mass: 1, tension: 260, friction: 100 },
              //   { mass: 1, tension: 210, friction: 180 },
              // ]}
            ></AnimatedNumbers> */}
            {getMultipliedColumnTotal(cart, "quantity", "new_price")}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartTray;
