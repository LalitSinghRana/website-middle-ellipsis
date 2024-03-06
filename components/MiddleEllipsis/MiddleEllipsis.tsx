import React, { useEffect, useRef, useContext } from "react";
import { ContainerContext } from "./MultipleMiddleEllipsis";
import { observeResize } from "./helper";

export const MiddleEllipsis = ({
	children = "",
	middleEllipsis = "...",
	...rest
}) => {
	const containerElement = useContext(ContainerContext);
	const nodeRef = useRef(null);

	useEffect(() => {
		if (!nodeRef.current) return;
		const element = nodeRef.current;

		const cleanup = observeResize({
			element,
			text: children,
			middleEllipsis,
			containerElement,
		});

		return cleanup;
	}, [children, middleEllipsis, containerElement]);

	return (
		<span ref={nodeRef} {...rest}>
			{"\u00A0"}
		</span>
	);
};
