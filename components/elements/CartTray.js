"use client";

import { useDispatch, useSelector } from "react-redux";
import { siteConfig } from "@/config/site";
import { getCartTotal } from "@/lib/checkout";

// import { TbCurrencyTaka } from "react-icons/tb";
import { BsCart3 } from "react-icons/bs";
import { toggleCart } from "@/store/slices/cartSlice";

const CartTray = () => {
	const { cart } = useSelector((state) => state.cart);
	const { settings, translations } = useSelector((state) => state.common);
	const dispatch = useDispatch();

	const handleCart = () => {
		dispatch(toggleCart());
	};

	return (
		<>
			<div
				style={{
					color: settings?.colors?.primary_text,
					border: `1px solid ${settings?.colors?.primary}`,
				}}
				className="cart fixed top-1/2 mt-16 md:mt-0 right-0 cursor-pointer z-20 rounded-s-md overflow-hidden"
				onClick={handleCart}
			>
				<div
					className="icon bg-white border border-r-0 px-1 text-center "
					style={{
						color: settings?.colors?.primary,
					}}
				>
					<BsCart3 size={28} className="m-1" />
				</div>
				<div
					className="text-center pt-0.5"
					style={{ backgroundColor: settings?.colors?.primary }}
				>
					<p className="text-xs">
						{cart?.length} {translations["item"] || "item"}
					</p>
					<div className="text-xs font-semibold flex flex-col items-center justify-center">
						<p>{siteConfig.currency.shortForm}</p>
						{getCartTotal(cart) || "0.00"}
					</div>
				</div>
			</div>
		</>
	);
};

export default CartTray;
