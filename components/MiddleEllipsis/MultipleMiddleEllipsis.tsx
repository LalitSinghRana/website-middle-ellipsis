import React, { useState, useEffect, useRef, createContext } from "react";

export const ContainerContext = createContext<HTMLElement | null>(null);

export const MultipleMiddleEllipsis = ({ children, ...rest }) => {
	const nodeRef = useRef(null);
	const [node, setNode] = useState(null);

	// Update node state when nodeRef.current changes
	useEffect(() => setNode(nodeRef.current), []);

	return (
		<ContainerContext.Provider value={node}>
			{/* Feel free to remove the inline style with whatever your project is
			using. Tailwind, scss, etc. */}
			<span ref={nodeRef} style={{ width: "100%" }} {...rest}>
				{children}
			</span>
		</ContainerContext.Provider>
	);
};
