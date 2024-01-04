// import Offer from "../Offer";
import Offer from "./offer";
import CategoriesNav from "./CategoriesNav";
import MainNav from "./main-nav";
import { fetchData } from "@/lib/fetch-data";

const Header = async () => {
	const [settingsRes, categoriesRes] = await Promise.allSettled([
		fetchData({ api: `info/basic` }),
		fetchData({ api: "categories" }),
	]);

	const settings =
		settingsRes.status === "fulfilled" ? settingsRes.value?.data || {} : {};
	const categories =
		categoriesRes.status === "fulfilled" ? categoriesRes.value?.data || [] : [];
	return (
		<>
			<header className="header">
				<MainNav settings={settings} categories={categories} />
				<CategoriesNav categories={categories} />
				<Offer />
			</header>
		</>
	);
};

export default Header;
