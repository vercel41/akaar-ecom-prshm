import Image from "next/image";
import Link from "next/link";
import { fetchData } from "@/lib/fetch-data";
import noImage from "@/public/assets/images/no-image.png";

// ** Import Iocns
const FeaturedBanner = async () => {
	const { data: featuredBanner = [] } = await fetchData({ api: "banners" });
	if (!featuredBanner?.length) return null;
	// console.log(featuredBanner);
	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{featuredBanner.map((banner) => (
					<div key={banner.id}>
						<div className="banner-img">
							<Image
								src={banner.image || noImage}
								alt="Banner"
								width={400}
								height={500}
								className="w-full h-[500px] lg:h-[600px] object-cover rounded hover:-translate-y-2 transition-transform duration-300 ease-in-out"
							/>
						</div>
						<div className="content w-full text-center p-5">
							<h1 className="mb-4 text-sm font-thin text-primary font-serif">
								{banner.title}
							</h1>
							<Link
								href={banner.url}
								className="border border-primary hover:border-secondary rounded px-2 pb-1 font-semibold font-title hover:text-secondary"
							>
								Shop Now
							</Link>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default FeaturedBanner;
