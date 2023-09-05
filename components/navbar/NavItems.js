import Link from "next/link";
import Image from "next/image";
import { fetchData } from "@/utils/fetchData";
import MegaMenu from "./MegaMenu";

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
    <div className="header-left flex items-center gap-4">
      <Link href="/" className="logo">
        <Image
          src={settings?.logo}
          alt={settings?.name}
          width={200}
          height={48}
        />
      </Link>
      <MegaMenu categories={categories} settings={settings} />
    </div>
  );
};

export default NavItems;
