"use client";
import Link from "next/link";
import React from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

export default function CategoriesMegaMenu({ settings, categories }) {
	const [selectedCategory, setSelectedCategory] = React.useState({});
	return (
		<div
			className="hidden lg:block"
			style={{
				backgroundColor: settings?.colors?.primary,
				color: settings?.colors?.primary_text,
			}}
			onMouseLeave={() => setSelectedCategory({})}
		>
			<div className="container">
				<div
					className="border-t border-white !opacity-30"
					style={{ borderColor: settings?.colors?.primary_text }}
				></div>
				<div className="py-2">
					<div className="flex items-center gap-4 text-sm font-normal">
						{categories?.slice(0, 9)?.map((category, mainIndex) => (
							<Link
								href={`/categories/${category.slug}`}
								key={mainIndex}
								onMouseEnter={() => setSelectedCategory(category)}
								className={`capitalize ${
									category?.child_categories?.length
										? "flex items-center gap-1.5"
										: ""
								}`}
							>
								{category.category_name}

								{category?.child_categories?.length ? (
									selectedCategory?.slug === category.slug ? (
										<BsChevronUp />
									) : (
										<BsChevronDown />
									)
								) : null}
							</Link>
						))}
						{categories?.length > 9 && (
							<Link
								href="/categories"
								className="text-sm font-normal opacity-80"
							>
								All Categories
							</Link>
						)}
					</div>
					{selectedCategory?.child_categories?.length > 0 && (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-4">
							{selectedCategory?.child_categories?.map((subCategory, index) => (
								<div key={index} className="mb-2">
									<div className="transform hover:translate-x-1 transition-transform ease-in-out duration-300">
										<Link
											href={`/categories/${subCategory.slug}`}
											className="font-medium text-xs capitalize"
										>
											{subCategory?.category_name}
										</Link>
									</div>
									{subCategory.child_categories &&
										subCategory.child_categories.length > 0 &&
										subCategory.child_categories.map(
											(childCategory, subIndex) => (
												<div
													key={subIndex}
													className="transform hover:translate-x-1 transition-transform ease-in-out duration-300"
												>
													<Link
														href={`/categories/${childCategory.slug}`}
														className="mt-2 font-light text-xs opacity-80 capitalize"
													>
														{childCategory?.category_name}
													</Link>
												</div>
											)
										)}
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
