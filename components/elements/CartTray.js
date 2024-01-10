"use client";

import { useDispatch, useSelector } from "react-redux";

// ** Import Icons
// import Image from "next/image";
import { TbCurrencyTaka } from "react-icons/tb";
import { toggleCart } from "@/store/features/cartSlice";
// import cartImage from "@/public/assets/images/cart.gif";
// import dynamic from "next/dynamic";
import { BsCart3 } from "react-icons/bs";
import { getCartTotal } from "@/lib/checkout";
// const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), {
//   ssr: false,
// });

const CartTray = () => {
	const { cart } = useSelector((state) => state.cart);
	const { settings } = useSelector((state) => state.common);
	const dispatch = useDispatch();

	const handleCart = () => {
		dispatch(toggleCart());
	};

	return (
		<>
			<div
				className="cart fixed top-1/2 right-0 cursor-pointer z-40"
				onClick={handleCart}
				style={{ color: settings?.colors?.primary_text }}
			>
				<div
					className="icon bg-white border border-r-0  px-1 text-center"
					style={{
						border: `1px solid ${settings?.colors?.primary}`,
					}}
				>
					<BsCart3 size={36} className=" m-2" />
				</div>
				<div
					className="text-center pt-2"
					style={{ backgroundColor: settings?.colors?.primary }}
				>
					<p className="text-xs">{cart?.length} Items</p>
					<div className="text-xs font-semibold flex items-center justify-center">
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
						{/* {getMultipliedColumnTotal(cart, "quantity", "new_price")} */}
						{getCartTotal(cart)}
					</div>
				</div>
			</div>
		</>
	);
};

export default CartTray;
