import { fetchData } from "@/utils/fetchData";
import ClientLoader from "./ClientLoader";
// import { useLocale } from "next-intl";

const ServerDataProvider = async () => {
  // const locale = useLocale(); //Getting locale for client data fetch

  const [settingsRes, translationRes] = await Promise.allSettled([
    fetchData({ api: `info/basic` }),
    fetchData({ api: `translations` }),
  ]);

  const settings =
    settingsRes.status === "fulfilled" ? settingsRes.value?.data || {} : {};
  const translations =
    translationRes.status === "fulfilled"
      ? translationRes.value?.data || {}
      : {};
  // console.log(translations);

  return (
    <>
      {/* Loading setting for client uses */}
      <ClientLoader
        settings={settings}
        translations={translations}
        // locale={locale}
      />
    </>
  );
};

export default ServerDataProvider;
