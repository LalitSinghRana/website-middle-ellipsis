import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { observeResize } from "./helper";

export const MiddleEllipsis = ({ children = "", middleEllipsis = "..." }) => {
	const nodeRef = useRef(null);
	const [centreEllipsisText, setCentreEllipsisText] = useState("\u00A0");

	useEffect(() => {
		if (!nodeRef.current) return;

		const cleanup = observeResize({
			nodeRef,
			text: children,
			middleEllipsis,
			callback: setCentreEllipsisText,
		});

		return cleanup;
	}, [children, middleEllipsis]);

	return (
		<span ref={nodeRef} style={{ whiteSpace: "nowrap", outline: "1px solid" }}>
			{centreEllipsisText}
		</span>
	);
};
