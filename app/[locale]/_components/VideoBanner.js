// "use client";
// import { fetchData } from "@/lib/fetch-data";
// import VideoPlayer from "@/components/elements/VideoPlayer";
// import BackgroundVideo from "./CustomizedVideoPlayer";
// import { useMediaQuery } from "@/hooks/useMediaQuery";
// import BackgroundVideo from "next-video/background-video";
// const backgroundVideo = "/assets/videos/backgroundvidoe.mp4";
const VideoBanner = ({ settings }) => {
  // console.log(settings, "settings");
  // const isMobile = useMediaQuery("(max-width: 768px)");

  // console.log(settings, "settings?.review_video_link");
  if (!settings?.review_video_file) return null;

  return (
    <div className="my-10 w-full ">
      {/* <VideoPlayer
        url={settings?.review_video_link}
        loop={true}
        muted={true}
        playing={true}
        controls={true}
        className={"h-full !w-full object-cover object-center"}
      /> */}
      {/* <BackgroundVideo className={` w-full !object-cover object-center `}  height={`${isMobile ? "26vh" : "115vh"}`} src={settings?.review_video_file} /> */}

      {/* <BackgroundVideo
        videoLink={settings?.review_video_link}
        height={`${isMobile ? "26vh" : "100vh"}`}
        placeholderImage={settings?.home_review_banner
        }
        // style={{ border: "5px solid #ccc" }}
      /> */}
      <video
        src={settings?.review_video_file}
        className="h-[80vh] md:h-[100vh] xl:h-[125vh] 2xl:h-[140vh]   w-full object-cover object-center"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
};

export default VideoBanner;
