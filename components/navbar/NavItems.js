import { fetchData } from "@/utils/fetchData";
import ResponsiveMenu from "./ResponsiveMenu";

const NavItems = async () => {
  // const { data: settings = {} } = await fetchData({ api: "info/basic" });
  // const { data: categories = [] } = await fetchData({ api: "categories" });

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
      <ResponsiveMenu categories={categories} settings={settings} />
    </>
  );
};

export default NavItems;
