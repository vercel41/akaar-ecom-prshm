import Offer from "../Offer";
import CategoriesNav from "./CategoriesNav";
import MainNav from "./MainNav";
import { fetchData } from "@/utils/fetchData";

const Header = async () => {
  const [settingsRes, categoriesRes] = await Promise.allSettled([
    fetchData({ api: `info/basic` }),
    fetchData({ api: "categories?no_child=1" }),
  ]);

  const settings =
    settingsRes.status === "fulfilled" ? settingsRes.value?.data || {} : {};
  const categories =
    categoriesRes.status === "fulfilled" ? categoriesRes.value?.data || [] : [];
  return (
    <>
      <header className="header">
        <MainNav settings={settings} />
        <CategoriesNav categories={categories} />
        <Offer />
      </header>
    </>
  );
};

export default Header;
