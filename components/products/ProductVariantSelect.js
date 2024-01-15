"use client";
import React, { useEffect, useState } from "react";
import SizeChartModal from "../modals/SizeChartModal";
import { MdArrowForwardIos } from "react-icons/md";

export default function ProductVariantSelect({
	productVariants,
	selectedVariant,
	setSelectedVariant,
	sizeChart,
}) {
	const [colors, setColors] = useState([]);
	const [selectedColor, setSelectedColor] = useState(null);
	const [showSizeChart, setShowSizeChart] = useState(false);
	// const [selectedVariant, setSelectedVariant] = useState(null);
	console.log(sizeChart);

	//updated color select
	const handleColorChange = (colorProp) => {
		setSelectedColor(colorProp);
		setSelectedVariant(colors[colorProp][0]);
	};

	useEffect(() => {
		const variants = productVariants || [];
		if (variants.length) {
			// Group the data based on color
			const colorVariantsGroup = variants.reduce((result, variant) => {
				const { color } = variant;
				if (!result[color]) {
					result[color] = [];
				}
				result[color].push(variant);
				return result;
			}, {});
			const firstColor = Object.keys(colorVariantsGroup)[0];
			setColors(colorVariantsGroup);
			setSelectedColor(firstColor);
			setSelectedVariant(colorVariantsGroup[firstColor][0]);
		}
	}, [productVariants, setSelectedVariant]);

	return (
		<>
			<div className="product-color mt-4">
				{selectedColor ? (
					<div className="flex gap-2 flex-wrap items-center">
						<h4 className="text-slate-900 py-3 font-normal">Colors:</h4>
						{Object.keys(colors).map((key) => (
							<span
								key={key}
								className={`border-2 ${
									key === selectedColor ? "border-primary" : "border-slate-300"
								} cursor-pointer inline-block px-2`}
								onClick={() => handleColorChange(key)}
							>
								{key}
							</span>
						))}
					</div>
				) : null}
			</div>
			<div className="product-size mt-4">
				{colors[selectedColor]?.length ? (
					<div className="flex gap-2 flex-wrap items-center">
						<h4 className="text-slate-900">Size:</h4>
						{colors[selectedColor]?.map((variant) => (
							<div
								key={variant.id}
								className={`px-2 uppercase text-slate-700 border-b-2 ${
									variant?.id === selectedVariant?.id
										? "border-primary"
										: "border-slate-300"
								} cursor-pointer`}
								onClick={() => setSelectedVariant(variant)}
							>
								{variant.size}
							</div>
						))}
					</div>
				) : null}
				{sizeChart && (
					<div className="mt-4 lg:mt-7">
						<button
							className="inline-flex gap-2 items-center"
							onClick={() => setShowSizeChart((show) => !show)}
						>
							<span>See size chart</span>
							<MdArrowForwardIos />
						</button>
					</div>
				)}
			</div>
			{/* <div className="product-size mt-8">
				<h4 className="text-slate-900">
					In-Stock: {selectedVariant?.stock_quantity || 0}
				</h4>
			</div> */}
			{sizeChart && showSizeChart && (
				<SizeChartModal
					showModal={showSizeChart}
					setShowModal={setShowSizeChart}
					sizeChart={sizeChart}
				/>
			)}
		</>
	);
}
