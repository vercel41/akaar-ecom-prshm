import React from "react";
import Image from "next/image";

export default function Loading() {
	return (
		<div className="flex h-screen w-screen justify-center items-center">
			<Image
				className={`h-[300px] w-[300px]`}
				src={"/assets/images/loading-snail.gif"}
				alt={"loader"}
				width={226}
				height={226}
			/>
		</div>
	);
}
