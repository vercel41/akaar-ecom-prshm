import { fetchData } from "@/utils/fetchData";
import ClientLoader from "./ClientLoader";

const ServerDataProvider = async () => {
  const [settingsRes] = await Promise.allSettled([
    fetchData({ api: `info/basic` }),
  ]);

  const settings =
    settingsRes.status === "fulfilled" ? settingsRes.value?.data || {} : {};

  return (
    <>
      {/* Loading setting for client uses */}
      <ClientLoader settings={settings} />
    </>
  );
};

export default ServerDataProvider;
