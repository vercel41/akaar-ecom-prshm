import React from "react";
import Script from "next/script";

const ScriptLoader = ({ scriptBody, scriptId, ...props }) => {
	return scriptBody ? (
		<Script
			id={scriptId || "custom-script"}
			dangerouslySetInnerHTML={{ __html: scriptBody }}
			// strategy="beforeInteractive"
			{...props}
		/>
	) : null;
};

export default ScriptLoader;
