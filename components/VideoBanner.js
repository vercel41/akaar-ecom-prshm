import { fetchData } from "@/utils/fetchData";
import VideoPlayer from "./elements/VideoPlayer";
const VideoBanner = async () => {
  const [settingsRes] = await Promise.allSettled([
    fetchData({ api: `info/basic` }),
  ]);

  const settings =
    settingsRes.status === "fulfilled" ? settingsRes.value?.data || {} : {};

  if (!settings?.review_video_link) return null;

  return (
    <div className="mt-10">
      <VideoPlayer
        url={settings?.review_video_link}
        loop={true}
        muted={true}
        playing={true}
        controls={true}
        className={"h-[300px] md:h-[520px] lg:h-[80vh]"}
      />
    </div>
  );
};

export default VideoBanner;
