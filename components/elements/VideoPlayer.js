"use client";
import dynamic from "next/dynamic";
import { cn } from "@/utils";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const VideoPlayer = ({ url, className, ...props }) => {
  return (
    <div className={cn("video-player", className)}>
      <ReactPlayer
        url={url}
        className="overflow-hidden"
        // playing={true}
        {...props}
        width="100%"
        height="100%"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default VideoPlayer;
