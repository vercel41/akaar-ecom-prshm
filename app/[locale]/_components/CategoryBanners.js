import Image from "next/image";
import Link from "next/link";
import { fetchData } from "@/lib/fetch-data";
import noImage from "@/public/assets/images/no-image.png";

// ** Import Iocns
const CategoryBanners = async ({ settings }) => {
	const [transRes] = await Promise.allSettled([
		fetchData({ api: "translations" }),
	]);
	const translations =
		transRes.status === "fulfilled" ? transRes.value?.data || {} : {};
	const { data: cBanners = [] } = await fetchData({ api: "banners" });
	if (!cBanners?.length) return null;
	// console.log(settings);
	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 2xl:gap-8">
				{cBanners.map((banner) => (
					<div key={banner.id}>
						<Link href={banner.url || "#"} className="banner-img">
							<Image
								src={banner.image || noImage}
								alt="Banner"
								width={400}
								height={500}
								className="w-full h-[500px] lg:h-[600px] 2xl:h-[700px] object-cover object-top rounded hover:-translate-y-2 transition-transform duration-300 ease-in-out"
							/>
						</Link>
						<div className="content w-full text-center p-5">
							<h1 className="mb-4 text-sm font-thin font-serif">
								{banner.title}
							</h1>
							<Link
								href={banner.url || "#"}
								className="border rounded px-2 pb-1 font-semibold font-title"
								style={{
									borderColor: settings?.colors?.primary,
									color: settings?.colors?.primary,
								}}
							>
								{translations["shop-now"] || "Shop Now"}
							</Link>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default CategoryBanners;
