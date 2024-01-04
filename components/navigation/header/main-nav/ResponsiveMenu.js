"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { HiMenuAlt1 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

export default function ResponsiveMenu({ settings, categories }) {
	const [menuOpen, setMenuOpen] = useState(false);
	const [activeCategory, setActiveCategory] = useState(null);
	const { category_slug } = useParams();
	const megaMenuRef = useRef(null);
	const router = useRouter();

	const closeMenu = () => {
		setMenuOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
				closeMenu();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleActiveOrNavigate = (cat) => {
		if (cat.child_categories.length) {
			setActiveCategory((prevActiveCategory) =>
				prevActiveCategory === cat.slug ? null : cat.slug
			);
		} else {
			setActiveCategory(null);
			router.push(`/categories/${cat.slug}`);
			closeMenu();
		}
	};

	return (
		<div className="header-left flex items-center gap-x-2">
			{!menuOpen ? (
				<button
					onClick={() => setMenuOpen(!menuOpen)}
					className="text-white hover:text-primary md:hidden"
				>
					<HiMenuAlt1 size={24} />
				</button>
			) : (
				<span className="text-white hover:text-primary md:hidden">
					<AiOutlineClose size={24} />
				</span>
			)}
			<Link href="/" className="logo">
				<Image
					src={settings?.logo}
					alt={settings?.name}
					width={150}
					height={56}
					className="h-full max-h-[60px] py-2 object-contain lg:w-auto"
				/>
			</Link>
			<ul className="ml-3 nav-menu hidden lg:flex gap-3 items-center justify-start h-[60px] box-border">
				{categories.map((category, index) => (
					<li
						key={category.id}
						className={`h-full inline-flex items-center whitespace-nowrap text-ellipsis  ${
							category.slug == category_slug ||
							(category.child_categories || []).some(
								(c) => c.slug === category_slug
							)
								? //|| (index === 0 && !category_slug)
								  "border-b-2 border-primary"
								: "border-b-2 border-transparent"
						}`}
					>
						<Link
							href={`/categories/${category.slug}`}
							className="inline-block mt-[2px] text-white font-title font-bold hover:text-primary uppercase"
						>
							{category.category_name}
						</Link>
					</li>
				))}
			</ul>
			{menuOpen && (
				<div
					ref={megaMenuRef}
					className="absolute z-30 left-0 top-full bg-[#7573B2]  shadow-lg w-full lg:hidden"
				>
					<div className="">
						<ul className="nav-menu text-center py-2">
							{categories.map((category, index) => (
								<li key={category.id} className="my-2">
									<button
										onClick={() => handleActiveOrNavigate(category)}
										className="inline-block h-full text-white font-title font-bold hover:text-primary uppercase"
									>
										{category.category_name}
										{category.slug === activeCategory ? "-" : "+"}
									</button>
									{category.slug === activeCategory ? (
										<ul className="bg-[#d3d3d3] text-center py-2">
											{category?.child_categories?.map((subCategory, index) => (
												<li key={subCategory.id} className="my-2">
													<Link
														href={`/categories/${subCategory.slug}`}
														onClick={closeMenu}
														className="inline-block h-full text-white font-title font-bold hover:text-primary uppercase"
													>
														{subCategory.category_name}
													</Link>
												</li>
											))}
										</ul>
									) : null}
								</li>
							))}
						</ul>
					</div>
				</div>
			)}
		</div>
	);
}
