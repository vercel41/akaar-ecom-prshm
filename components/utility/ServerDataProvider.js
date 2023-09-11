import { fetchData } from "@/utils/fetchData";
import ClientLoader from "./ClientLoader";

const ServerDataProvider = async () => {
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
      <ClientLoader settings={settings} translations={translations} />
    </>
  );
};

export default ServerDataProvider;
