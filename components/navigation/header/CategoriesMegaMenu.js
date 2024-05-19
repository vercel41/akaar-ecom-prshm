"use client";
import Link from "next/link";
import React from "react";

export default function CategoriesMegaMenu({ settings, categories }) {
	const [subCategories, setSubCategories] = React.useState([]);
	return (
		<div
			className="hidden lg:block"
			style={{
				backgroundColor: settings?.colors?.primary,
				color: settings?.colors?.primary_text,
			}}
			onMouseLeave={() => setSubCategories([])}
		>
			<div className="container">
				<div className="border-t border-white"></div>
				<div className="py-1.5">
					<div className="flex items-center gap-4 text-sm font-bold">
						{categories?.slice(0, 10)?.map((category, mainIndex) => (
							<Link
								href={`/categories/${category.slug}`}
								key={mainIndex}
								onMouseEnter={() => setSubCategories(category.child_categories)}
								className="capitalize"
							>
								{category.category_name}
							</Link>
						))}
					</div>
					{subCategories.length > 0 && (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-4">
							{subCategories.map((subCategory, index) => (
								<div key={index} className="mb-2">
									<Link
										href={`/categories/${subCategory.slug}`}
										className="font-medium text-xs capitalize"
									>
										{subCategory?.category_name}
									</Link>
									{subCategory.child_categories &&
										subCategory.child_categories.length > 0 &&
										subCategory.child_categories.map(
											(childCategory, subIndex) => (
												<div key={subIndex} className="">
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
