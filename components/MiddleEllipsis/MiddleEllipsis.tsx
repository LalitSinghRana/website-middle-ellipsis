import React, { useEffect, useRef } from "react";
import { observeResize } from "./helper";

export const MiddleEllipsis = ({
	children = "",
	middleEllipsis = "...",
	...rest
}) => {
	const nodeRef = useRef(null);

	useEffect(() => {
		if (!nodeRef.current) return;
		const element = nodeRef.current;

		const cleanup = observeResize({
			element,
			text: children,
			middleEllipsis,
		});

		return cleanup;
	}, [children, middleEllipsis]);

	return (
		<span ref={nodeRef} {...rest}>
			{"\u00A0"}
		</span>
	);
};
