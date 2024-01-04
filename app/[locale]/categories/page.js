import Link from "next/link";
import Image from "next/image";
import { fetchData } from "@/lib/fetch-data";
import noImage from "@/public/assets/images/no-image.png";

const page = async () => {
	const data = await fetchData({ api: "categories?no_child=1" });
	const categories = data?.data || [];

	return (
		<>
			<div className="breadcrumb breadcrumb-2 pt-5">
				<div className="container border-b border-slate-200 pb-5">
					<div>
						<Link
							href={`/`}
							className="text-base text-slate-600 hover:text-secondary"
						>
							Home
						</Link>
						<Link
							href={`/categories`}
							className="text-base text-slate-900 hover:text-secondary"
						>
							All Categories
						</Link>
					</div>
				</div>
			</div>

			<div className="container mt-12 lg:mt-8 mb-24">
				<div className="flex items-center justify-center lg:justify-start flex-wrap gap-10">
					{categories?.map((category, i) => (
						<div className="category" key={i}>
							<Link
								href={`/categories/${category.slug}`}
								className="category-img flex justify-center items-center w-[180px] h-[200px]"
							>
								<Image
									src={category?.icon || noImage}
									alt={category.category_name}
									width={180}
									height={200}
									// style={{ width: "auto", height: "auto" }}
									className="h-full w-full object-contain"
								/>
							</Link>
							<Link
								href={`/categories/${category.slug}`}
								className="block text-lg text-slate-700 text-center"
							>
								{category.category_name}
							</Link>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default page;
