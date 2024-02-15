"use client";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState, useMemo } from "react";
import * as pixel from "/lib/fpixel";

const FacebookPixel = ({ fbPixelId }) => {
	const [loaded, setLoaded] = useState(false);
	const pathname = usePathname();

	const memoizedPixelId = useMemo(() => fbPixelId, [fbPixelId]);
	// console.log(memoizedPixelId);

	useEffect(() => {
		if (!loaded || !memoizedPixelId) return;
		// console.log("first");
		pixel.pageview();
	}, [pathname, loaded, memoizedPixelId]);

	return (
		<div>
			{memoizedPixelId && (
				<Script
					id="fb-pixel"
					src="/scripts/pixel.js"
					strategy="afterInteractive"
					onLoad={() => setLoaded(true)}
					data-pixel-id={memoizedPixelId}
					// data-pixel-id={pixel.FB_PIXEL_ID}
				/>
			)}
		</div>
	);
};

export default FacebookPixel;
