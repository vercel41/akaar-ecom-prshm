"use client";
import { fetchData } from "@/lib/fetch-data";
import VideoPlayer from "@/components/elements/VideoPlayer";
// import BackgroundVideo from "./CustomizedVideoPlayer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import BackgroundVideo from 'next-video/background-video';
// const backgroundVideo = "/assets/videos/backgroundvidoe.mp4";
const VideoBanner = async ({settings}) => {
console.log(settings, "settings");
  const isMobile = useMediaQuery("(max-width: 768px)");



  if (!settings?.review_video_link) return null;

  return (
    <div className="mt-10 w-full">
      {/* <VideoPlayer
        url={settings?.review_video_link}
        loop={true}
        muted={true}
        playing={true}
        controls={true}
        className={"h-full !w-full object-cover object-center"}
      /> */}
      <BackgroundVideo className={` w-full !object-cover object-center `}  height={`${isMobile ? "26vh" : "115vh"}`} src={settings?.review_video_file} />
      
      {/* <BackgroundVideo
        videoLink={settings?.review_video_link}
        height={`${isMobile ? "26vh" : "100vh"}`}
        placeholderImage={settings?.home_review_banner
        }
        // style={{ border: "5px solid #ccc" }}
      /> */}
    </div>
  );
};

export default VideoBanner;
