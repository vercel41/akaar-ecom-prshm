"use client";
import { twMerge } from "tailwind-merge";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const VideoPlayer = ({ url, className, ...props }) => {
	return (
		<div className={twMerge("video-player", className)}>
			<ReactPlayer
				url={url}
				className="rounded-xl overflow-hidden"
				{...props}
				width="100%"
				height="100%"
			/>
		</div>
	);
};

export default VideoPlayer;
