import React from "react";
import Image from "next/image";
import loading from "@/public/assets/images/loading.gif";

export default function Loading() {
	return (
		<div className="flex h-screen w-screen justify-center items-center -mt-16">
			<Image
				className={`h-[200px] w-[200px]`}
				src={"https://akaarserver.xyz/loading.gif" || loading}
				alt={"loader"}
				width={200}
				height={200}
			/>
		</div>
	);
}
