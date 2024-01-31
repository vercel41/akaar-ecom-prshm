"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "@/store/features/cartSlice";
import { setLoginModalOpen } from "@/store/features/authSlice";
const LoginModal = dynamic(() => import("../../../modals/login/LoginModal"), {
	ssr: false,
});

// ** Import Icons
import {
	HiOutlineHeart,
	HiOutlineShoppingCart,
	HiOutlineUser,
} from "react-icons/hi2";
import ResponsiveSearch from "./ResponsiveSearch";
import ResponsiveMenu from "./ResponsiveMenu";
import { useParams, useRouter } from "next/navigation";
import useWishList from "@/hooks/useWishList";
import { cn } from "@/utils";
import LanguageSelector from "../LanguageSelector";

export default function MainNav({ settings, categories }) {
	const { locale } = useParams();
	const [scroll, setScroll] = useState(0);
	const { cart } = useSelector((state) => state.cart);
	const { user, isLoginModalOpen } = useSelector((state) => state.auth);
	const { getWishlistCount } = useWishList();
	// const { translations } = useSelector((state) => state.common);
	const router = useRouter();
	const dispatch = useDispatch();

	const handleModalOpen = () => {
		if (user) {
			router.push("/dashboard");
		} else {
			dispatch(setLoginModalOpen(true));
		}
	};

	useEffect(() => {
		document.addEventListener("scroll", () => {
			const scrollCheck = window.scrollY >= 100;
			if (scrollCheck !== scroll) {
				setScroll(scrollCheck);
			}
		});
	}, [scroll]);

	const wishlistCount = getWishlistCount();

	return (
		<div
			className={cn(`relative py-2 lg:py-0`)}
			style={{ backgroundColor: settings?.colors?.primary }}
		>
			<div className="main-nav container">
				<div className="header-wrap flex justify-between items-center">
					{/* Nav Items  */}
					<ResponsiveMenu settings={settings} categories={categories} />
					<div className="header-right flex justify-between items-center ml-4 gap-6">
						<ResponsiveSearch settings={settings} />
						<div
							className="header-actions flex gap-3"
							style={{ color: settings?.colors?.primary_text }}
						>
							{!settings?.guest_checkout ? (
								<>
									<button onClick={handleModalOpen} className="single-action">
										{user?.image ? (
											<Image
												src={user.image}
												alt="Profile"
												height={32}
												width={32}
												className="h-full w-full rounded-full"
											/>
										) : (
											<HiOutlineUser size={24} />
										)}
									</button>
									<button
										onClick={() => router.push("/dashboard/my-wishlist")}
										className="inline-block relative"
									>
										<HiOutlineHeart size={24} />
										{wishlistCount ? (
											<span
												className="absolute -right-1.5 -top-1.5 border text-[10px] px-1 text-center rounded-full "
												style={{
													border: `1px solid ${settings?.colors?.primary_text}`,
												}}
											>
												{wishlistCount}
											</span>
										) : null}
									</button>
								</>
							) : null}
							<button
								onClick={() => dispatch(toggleCart())}
								className="group relative single-action"
							>
								<HiOutlineShoppingCart size={24} />
								{cart?.length ? (
									<span
										className="absolute -right-1 -top-1 border text-[10px] px-1 text-center rounded-full"
										style={{
											border: `1px solid ${settings?.colors?.primary_text}`,
										}}
									>
										{cart?.length}
									</span>
								) : null}
							</button>
							<LanguageSelector locale={locale} />
						</div>
					</div>
				</div>
			</div>
			{isLoginModalOpen && (
				<LoginModal
					showModal={isLoginModalOpen}
					setShowModal={(show) => dispatch(setLoginModalOpen(show))}
					title={"welcome"}
				/>
			)}
		</div>
	);
}
