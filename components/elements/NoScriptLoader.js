import React from "react";
import Script from "next/script";

const NoScriptLoader = ({ scriptBody, scriptId, ...props }) => {
	return scriptBody ? (
		<noscript
			id={scriptId || "custom-no-script"}
			dangerouslySetInnerHTML={{ __html: scriptBody }}
			// strategy="beforeInteractive"
			{...props}
		/>
	) : null;
};

export default NoScriptLoader;
