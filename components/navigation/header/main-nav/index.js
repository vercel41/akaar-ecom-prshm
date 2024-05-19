"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "@/store/slices/cartSlice";
import { setLoginModalOpen } from "@/store/slices/authSlice";
import ResponsiveSearch from "./ResponsiveSearch";
import { useParams, useRouter } from "next/navigation";
import useWishList from "@/hooks/useWishList";
import LanguageSelector from "./LanguageSelector";
const LoginModal = dynamic(() => import("../../../modals/login/LoginModal"), {
	ssr: false,
});

// ** Import Icons
import {
	HiOutlineHeart,
	HiOutlineShoppingCart,
	HiOutlineUser,
} from "react-icons/hi2";
import { cn } from "@/utils";
import { HiMenuAlt1 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import Search from "@/components/elements/Search";
import { IoCall } from "react-icons/io5";

export default function MainNav({ settings, categories }) {
	const { locale } = useParams();
	const { cart } = useSelector((state) => state.cart);
	const { user, isLoginModalOpen } = useSelector((state) => state.auth);
	const { getWishlistCount } = useWishList();
	const router = useRouter();
	const dispatch = useDispatch();
	const [menuOpen, setMenuOpen] = useState(false);

	const handleModalOpen = () => {
		if (user) {
			router.push("/dashboard");
		} else {
			dispatch(setLoginModalOpen(true));
		}
	};
	const wishlistCount = getWishlistCount();

	return (
		<div
			className={cn(`relative py-1.5`)}
			style={{
				backgroundColor: settings?.colors?.primary,
				color: settings?.colors?.primary_text,
			}}
		>
			<div className="main-nav container">
				<div className="header-left flex items-center justify-between gap-x-2">
					{!menuOpen ? (
						<button
							onClick={() => setMenuOpen(!menuOpen)}
							className=" md:hidden"
						>
							<HiMenuAlt1 size={24} />
						</button>
					) : (
						<span className=" md:hidden">
							<AiOutlineClose size={24} />
						</span>
					)}
					<Link
						href="/"
						className="logo h-[45px] lg:h-[68px] max-w-[250px] -mr-10 sm:-mr-12 md:mr-0"
					>
						<Image
							src={settings?.logo}
							alt={settings?.name}
							width={200}
							height={68}
							className="h-full w-auto object-contain"
						/>
					</Link>
					<div className="hidden lg:flex items-center gap-10">
						<Search />
						{settings?.phone[0] && (
							<div className="flex items-center gap-2">
								<IoCall size={24} />
								<div className="text-xs">
									<p>Call us now</p>
									<p>{settings?.phone[0] || ""}</p>
								</div>
							</div>
						)}
					</div>
					<div className="header-actions items-center flex gap-3">
						<ResponsiveSearch settings={settings} />
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
						<span className="hidden md:block">
							<LanguageSelector locale={locale} />
						</span>
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
