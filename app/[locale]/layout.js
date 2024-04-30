import "rc-slider/assets/index.css";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { notFound } from "next/navigation";

// ** Import Components
import Footer from "@/components/footer";
import CheckConnection from "@/components/CheckConnection";
import Header from "@/components/navigation/header";
import CartTray from "@/components/elements/CartTray";
import ReduxProvider from "@/store/ReduxProvider";

//** Swiper Slider
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

import Cart from "@/components/side-drawers/Cart";
import ProductSelect from "@/components/side-drawers/ProductSelect";
import PersistUser from "@/components/utility/PersistUser";
import GlobalLoader from "@/components/utility/GlobalLoader";
import ServerDataProvider from "@/components/utility/ServerDataProvider";
import { fetchData } from "@/lib/fetch-data";
import VideoPlayerModal from "@/components/modals/VideoPlayerModal";
import SizeChangeModal from "@/components/modals/SizeChangeModal";
// import FacebookPixel from "@/components/utility/FacebookPixel";

export const generateMetadata = async ({ params }) => {
	let settings = {};
	let appName = "E-commerce app";
	let favicon = "/favicon.ico";
	try {
		const settingsRes = await fetchData({
			api: `info/basic`,
			locale: params?.locale,
		});
		settings = settingsRes?.data || {};
		appName = settings?.name;
		favicon = settings?.favicon;
		// console.log(settings);
	} catch (error) {
		console.log(error);
		return {
			title: appName,
			applicationName: appName,
		};
	}

	return {
		title: {
			default: `${appName}`,
			template: `%s || ${appName}`,
		},
		description:
			settings?.seo?.meta_description ||
			`Discover Elegance, Shop with Confidence at ${appName}`,
		applicationName: appName,
		openGraph: {
			title: `${appName}`,
			description:
				settings?.seo?.meta_description ||
				`Discover Elegance, Shop with Confidence at ${appName}`,
			url: `/`,
			siteName: appName,
			// images: [product?.data?.image],
			type: "website",
		},
		icons: {
			icon: [
				{
					type: "image/x-icon",
					sizes: "64x73",
					url: favicon || `/favicon.ico`,
				},
			],
			// apple: [],
		},
		metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
		alternates: {
			canonical: `/`,
		},
		verification: {
			// google: "google",
			other: {
				// me: ["my-email", "my-link"],
				"facebook-domain-verification": settings.fb_domain_verification,
			},
		},
		// other: {
		// 	"custom_meta_name": "meta_content",
		// },
	};
};

const locales = ["en", "bn"];
// export function generateStaticParams() {
// 	return locales.map((locale) => ({ locale }));
// }

export default function RootLayout({ children, params }) {
	// const locale = useLocale();
	// // Show a 404 error if the user requests an unknown locale
	// if (params.locale !== locale) {
	// 	notFound();
	// }

	const isValidLocale = locales.some((cur) => cur === params.locale);
	if (!isValidLocale) notFound();

	// unstable_setRequestLocale(params.locale);

	return (
		<html lang={params.locale}>
			<body>
				<ReduxProvider>
					<Header />
					<main className="pt-[60px]">
						<CheckConnection>{children}</CheckConnection>
					</main>
					<Footer />
					<CartTray />
					<Cart />
					<ProductSelect />
					<SizeChangeModal />
					<VideoPlayerModal />
					<PersistUser />
					<GlobalLoader />
					<ServerDataProvider />
				</ReduxProvider>
				{/* <FacebookPixel /> */}
			</body>
		</html>
	);
}
