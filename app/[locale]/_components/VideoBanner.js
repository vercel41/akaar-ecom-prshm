import { fetchData } from "@/lib/fetch-data";
import VideoPlayer from "@/components/elements/VideoPlayer";
const VideoBanner = async () => {
  const [settingsRes] = await Promise.allSettled([
    fetchData({ api: `info/basic` }),
  ]);

  const settings =
    settingsRes.status === "fulfilled" ? settingsRes.value?.data || {} : {};

  if (!settings?.review_video_link) return null;

  return (
    <div className="mt-10 w-full">
      
      <VideoPlayer
        url={settings?.review_video_link}
        loop={true}
        muted={true}
        playing={true}
        controls={true}
        className={"h-full !w-full object-cover object-center"}
      />
    </div>
  );
};

export default VideoBanner;
