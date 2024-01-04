import "rc-slider/assets/index.css";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
// ** int18n
import { useLocale } from "next-intl";
import { notFound } from "next/navigation";

// ** Import Components
import Footer from "@/components/footer/Footer";
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

export const generateMetadata = async () => {
	let settings = {};
	let appName = "E-commerce app";
	let favicon = "/favicon.ico";
	try {
		settings = await fetchData({ api: `info/basic` });
		appName = settings?.data?.name;
		favicon = settings?.data?.favicon;
		// console.log(favicon);
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
		description: {
			default: `Discover Elegance, Shop with Confidence at ${appName}`,
			template: `%s of ${appName}`,
		},
		applicationName: appName,
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
	};
};

export default function RootLayout({ children, params }) {
	const locale = useLocale();
	// Show a 404 error if the user requests an unknown locale
	if (params.locale !== locale) {
		notFound();
	}

	return (
		<html lang={locale}>
			<body>
				<ReduxProvider>
					<Header />
					<main>
						<CheckConnection>{children}</CheckConnection>
					</main>
					<Footer />
					<CartTray />
					<Cart />
					<ProductSelect />
					<PersistUser />
					<GlobalLoader />
					<ServerDataProvider />
				</ReduxProvider>
			</body>
		</html>
	);
}
