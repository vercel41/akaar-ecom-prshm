"use client";
import { Link } from "@/navigation";
import Image from "next/image";
import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { GoMoveToBottom } from "react-icons/go";
import { FiPlus } from "react-icons/fi";
import { LuMinus } from "react-icons/lu";

const CategoriesMenuList = ({ setShow, categoriesList }) => {
	const isMobile = useMediaQuery("(max-width: 768px)");
	const [categoryItems, setCategoryItems] = React.useState(categoriesList);

	function toggleStatusById(id, setArray) {
		setArray((prevItems) =>
			prevItems.map((item) =>
				item.id === id
					? {
							...item,
							status: item.status === "active" ? "inactive" : "active",
					  }
					: item
			)
		);
	}

	const handleClose = (array) => {
		array.length === 0 && setShow(false);
	};

	return (
		<div>
			<div className="category-section flex flex-col h-auto">
				<div
					className={`!h-full relative ${!isMobile ? "shadow pl-3 py-3" : ""}`}
				>
					{categoryItems.length > 8 &&
						setCategoryItems((prevItems) => prevItems.slice(0, 8))}
					{categoryItems.map((item) => (
						<div className={`!w-full sub-menu`} key={item.id}>
							<Link
								onClick={() => handleClose(item.child_categories)}
								className={` hover:text-primary flex items-center justify-between px-3 !w-full py-2 ${
									isMobile && "shadow"
								} text-lg ${item.child_categories.length >= 1 && "sub-menu"}`}
								key={item.id}
								href={
									item.child_categories.length >= 1
										? "/"
										: `categories/${item.slug}`
								}
							>
								{item.category_name}
								{item.child_categories.length >= 1 && (
									<span className="ml-1">
										{!isMobile ? (
											<MdOutlineKeyboardArrowRight size={20} />
										) : (
											<span
												onClick={() =>
													toggleStatusById(item.id, setCategoryItems)
												}
											>
												{item.status === "active" ? <LuMinus /> : <FiPlus />}
											</span>
										)}
									</span>
								)}
							</Link>

							{item.child_categories.length >= 1 && (
								<div
									className={`${
										!isMobile &&
										"absolute p-3 top-0 right-0 translate-x-full sub-item z-40"
									} shadow  bg-white !w-full !h-full overflow-y-auto overflow-x-hidden`}
								>
									{item.child_categories.length >= 1 &&
										item.child_categories.map((subItem) => (
											<div className="second-sub-menu" key={subItem.id}>
												{isMobile ? (
													<>
														{item.status === "active" && (
															<Link
																onClick={() => setShow(false)}
																className={` pl-7 hover:text-primary py-2  flex items-center justify-between px-3  ${
																	isMobile && "shadow"
																} text-lg mb-2 w-full ${
																	subItem.child_categories?.length >= 1 &&
																	"second-sub-menu"
																}`}
																href={`/categories/${subItem.slug}`}
																key={subItem.id}
															>
																{subItem.category_name}
																{subItem?.child_categories?.length >= 1 && (
																	<span
																		// need to fix this
																		// onClick={() =>
																		// 	toggleStatusById(
																		// 		subItem.id,
																		// 		setCategoryChildItems
																		// 	)
																		// }
																		className="ml-1"
																	>
																		{!isMobile ? (
																			<MdOutlineKeyboardArrowRight size={20} />
																		) : null}
																	</span>
																)}
															</Link>
														)}
													</>
												) : (
													<>
														<Link
															className={` pl-3 hover:text-primary py-2 flex flex-col md:flex-row items-center justify-between px-3 ${
																isMobile && "shadow rounded-r-lg"
															} text-lg mb-2 w-full ${
																subItem.child_categories?.length >= 1 &&
																"second-sub-menu"
															}`}
															href={`/categories/${subItem.slug}`}
															key={subItem.id}
														>
															{subItem.category_name}
															{subItem?.child_categories?.length >= 1 && (
																<span className="ml-1 relative">
																	{!isMobile ? (
																		<>
																			<MdOutlineKeyboardArrowRight size={20} />
																			<div className="w-[30px] absolute left-6 top-0 h-[20px] bg-red"></div>
																		</>
																	) : null}
																</span>
															)}
														</Link>
													</>
												)}

												{!isMobile &&
													subItem?.child_categories?.length >= 1 && (
														<div
															className={` ${
																isMobile
																	? "pl-3 hover:text-primary py-2  flex items-center justify-between px-3 shadow text-lg mb-2 w-full"
																	: `absolute ${
																			!subItem?.child_categories?.length >= 1 &&
																			""
																	  } top-0 right-0 translate-x-full bg-white second-sub-item z-40 shadow  bg-blue  md:!w-[400px] lg:!w-[540px] xl:!w-[700px] 2xl:!w-[840px] !h-full`
															}`}
														>
															<div className="grid grid-cols-3 gap-3">
																{subItem?.child_categories?.length >= 1 &&
																	subItem.child_categories.map((subItem2) => (
																		<div key={subItem2.id}>
																			<Link
																				className={` pl-2 md:pl-3 hover:text-primary py-2 flex items-center justify-between  shadow text-lg mb-2  bg-gray-100 w-full ${
																					subItem2.child_categories?.length >=
																						1 && "third-sub-menu"
																				}`}
																				href={`/categories/${subItem2.slug}`}
																				key={subItem2.id}
																			>
																				<div className="p-0 md:p-4 bg-gray-100 w-full flex flex-col justify-center items-center">
																					<span className="hidden md:inline-block mb-3">
																						<Image
																							src={subItem2?.icon}
																							alt={subItem2?.categories_name}
																							width={50}
																							height={50}
																							className=" rounded-full mb-3  object-contain"
																						/>
																					</span>
																					<span>{subItem2.category_name}</span>
																				</div>

																				{subItem2?.child_categories?.length >=
																					1 && (
																					<span className="ml-1">
																						{isMobile ? (
																							<MdOutlineKeyboardArrowRight
																								size={20}
																							/>
																						) : (
																							<GoMoveToBottom />
																						)}
																					</span>
																				)}
																			</Link>
																		</div>
																	))}
															</div>
														</div>
													)}
											</div>
										))}
								</div>
							)}
						</div>
					))}
					{/*           <Link
                className={` hover:text-primary flex items-center justify-between px-3 !w-full py-2 rounded shadow mb-2 text-lg`}
                href={
                  "/all-categories"
                }
              >
               All Categories 
              </Link> */}
				</div>
			</div>
		</div>
	);
};

export default CategoriesMenuList;
