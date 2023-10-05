"use client";
import { twMerge } from "tailwind-merge";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const VideoPlayer = ({ url, className, ...props }) => {
  return (
    <div className={twMerge("video-player", className)}>
      <ReactPlayer url={url} width={"100%"} height="100%" {...props} />;
    </div>
  );
};

export default VideoPlayer;
