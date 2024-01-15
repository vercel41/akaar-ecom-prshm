import React from "react";
import { twMerge } from "tailwind-merge";

const ViewHTML = ({ htmlText, className, ...props }) => {
	return htmlText ? (
		<div
			className={twMerge("view-html prose max-w-none", className)}
			dangerouslySetInnerHTML={{ __html: htmlText }}
			{...props}
		/>
	) : null;
};

export default ViewHTML;
