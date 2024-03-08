import React, { useEffect, useRef, useContext } from "react";
import { ContainerContext } from "./MultipleMiddleEllipsis";
import { observeResize } from "./helper";

export const MiddleEllipsis = ({
	children = "",
	separator,
	multiLines,
	...rest
}: {
	children: string;
	separator?: string;
	multiLines?: number;
}) => {
	const containerElement = useContext(ContainerContext);
	const nodeRef = useRef(null);

	useEffect(() => {
		if (!nodeRef.current) return;
		const element = nodeRef.current;

		const cleanup = observeResize({
			containerElement,
			element,
			text: children,
			separator,
			multiLines,
		});

		return cleanup;
	}, [children, separator, containerElement, multiLines]);

	return (
		<span ref={nodeRef} {...rest}>
			{"\u00A0"}
		</span>
	);
};
