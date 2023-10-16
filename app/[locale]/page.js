import Intro from "@/components/Intro";
import FlashSale from "@/components/FlashSale";
import NewArrival from "@/components/NewArrival";
import VideoBanner from "@/components/VideoBanner";
import FeaturedBanner from "@/components/FeaturedBanner";
import HomeCategoryProducts from "@/components/HomeCategoryProducts";

export default function Home() {
	return (
		<>
			<section className="banner">
				<Intro />
			</section>

			<section className="banners pt-14">
				<div className="container">
					<FeaturedBanner />
				</div>
			</section>

			<section className="flash-sale mt-10">
				<div className="container">
					<FlashSale />
				</div>
			</section>

			<section className="video-banner">
				<VideoBanner />
			</section>

			<section className="new-products">
				<div className="container">
					<div className="py-10 text-center">
						<h2 className="sec-title pb-3">New Arrival</h2>
						<p className="underline">Browse Our New Collections</p>
					</div>

					<div className="">
						<NewArrival />
					</div>
				</div>
			</section>

			{/* <section className="all-category mt-28">
        <div
          className="container py-6"
          style={{
            backgroundImage: "linear-gradient(to right, #2980B9, #6DD5FA)",
          }}
        >
          <div className="sec-heading w-full flex justify-between items-center mb-3">
            <h2 className="sec-title !text-white">Category</h2>
            <Link href="/categories" className="all-btn !text-white">
              View All <HiArrowLongRight size={24} />{" "}
            </Link>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            <PopularCategories />
          </div>
        </div>
      </section> */}

			{/* <section className="best-sell bg-slate-50 py-14">
        <div className="container">
          <div className="sec-heading w-full flex justify-between items-center border-b border-slate-200 pb-3">
            <h2 className="sec-title">
              <Image
                src={`/assets/images/icons/fire-1.png`}
                alt="Fire"
                width={32}
                height={32}
                className="inline-block mr-1"
              />
              বেস্ট সেলিং প্রডাক্ট
            </h2>
            <Link href="/products" className="all-btn">
              সবগুলো দেখুন <HiArrowLongRight size={24} />{" "}
            </Link>
          </div>

          <div className="bestSell-slider mt-6 relative">
            <BestSell />
          </div>
        </div>
      </section> */}

			{/* <section className="all-products py-14">
        <div className="container">
          <div className="sec-heading w-full flex justify-between items-center border-b border-slate-200 pb-3">
            <h2 className="sec-title">সকল প্রডাক্ট</h2>
            <Link href="/products" className="all-btn">
              সবগুলো দেখুন <HiArrowLongRight size={24} />{" "}
            </Link>
          </div>

          <div className="bestSell-slider mt-6">
            <AllProducts customSearchParams={searchParams} pagination={true} />
          </div>
        </div>
      </section> */}

			<section className="home-category-products mb-10">
				<HomeCategoryProducts />
			</section>
		</>
	);
}
