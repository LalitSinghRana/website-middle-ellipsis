import React from "react";
import { fontFamilyWidthMap } from "./fontFamilyWidthMap";

const getCharacterWidth = (
	character: string,
	fontSize = 16, // TODO: Figure out a way to not have this pass around every instance
	fontFamily: string, // TODO: Figure out a way to not have this pass around every instance
) => {
	const widthMap = fontFamilyWidthMap[fontFamily];
	if (!widthMap) return 0;

	// If character is not present in widthMap, return width of 'W' character (widest character)
	const characterWidth = widthMap[character] || widthMap.W;

	return characterWidth * (fontSize / 16) * 1; // 2px for 'normal' letter spacing
};

const getElementCssProperties = (element: Element) => {
	const elementStyleObj = window.getComputedStyle(element);

	const paddingWidthX =
		parseInt(elementStyleObj.paddingLeft, 10) +
		parseInt(elementStyleObj.paddingRight, 10);
	const paddingWidthY =
		parseInt(elementStyleObj.paddingTop, 10) +
		parseInt(elementStyleObj.paddingBottom, 10);
	const marginWidthX =
		parseInt(elementStyleObj.marginLeft, 10) +
		parseInt(elementStyleObj.marginRight, 10);
	const borderWidthX =
		parseInt(elementStyleObj.borderLeftWidth, 10) +
		parseInt(elementStyleObj.borderRightWidth, 10);

	// `nodeStyleObj.width` return width that includes padding. So we have to subtract padding to get available width.
	const width = parseInt(elementStyleObj.width, 10) - paddingWidthX;
	const height = parseInt(elementStyleObj.height, 10) - paddingWidthY;

	const fontSize = parseInt(elementStyleObj.fontSize, 10);
	const fontFamily = elementStyleObj.fontFamily.split(",")[0];

	return {
		width,
		height,
		paddingWidthX,
		marginWidthX,
		borderWidthX,
		fontSize,
		fontFamily,
	};
};

const getStringWidth = (text: string, fontSize: number, fontFamily: string) => {
	let width = 0;

	for (const c of text) {
		width += getCharacterWidth(c, fontSize, fontFamily);
	}

	return width;
};


const getAvailableWidth = (element: HTMLElement) => {
	const parent = element.parentElement;
	if (!parent) return 0;

	let availableWidth = getElementCssProperties(parent).width;
	// const queue = Array.from(parent.children);
	// let level = 0;

	// while (queue.length > 0) {
	// 	console.log('LALIT ~ getAvailableWidth ~ level:', level++);
	// 	let n = queue.length;
	// 	let targetNodeFound = false;

	// 	while (n--) {
	// 		const curNode = queue.shift();
	// 		targetNodeFound = curNode === element;

	// 		if (curNode instanceof HTMLElement) {
	// 			const curNodeWidth = getElementCssProperties(curNode).width;
	// 			availableWidth -= curNodeWidth;
	// 			console.log('LALIT ~ getAvailableWidth ~ curNodeWidth:', {curNodeWidth, curNode, availableWidth});
	// 			queue.push(...Array.from(curNode.children));
	// 		}
	// 	}

	// 	if (targetNodeFound) break;
	// }

	return availableWidth;
}

export const truncateText = ({
	text,
	element,
	middleEllipsis,
}: {
	text: string;
	element: HTMLElement;
	middleEllipsis: string;
}) => {
	const { fontSize, fontFamily } = getElementCssProperties(element);
	const availableWidth = getAvailableWidth(element);

	const maxTextWidth = getStringWidth(text, fontSize, fontFamily);

	/*
		If maximum possible text width is less than or equal to available width, 
		then there is no need to truncate text.
		Return original text.
	*/
	if (maxTextWidth <= availableWidth) return text;

	const middleEllipsisWidth = getStringWidth(
		middleEllipsis,
		fontSize,
		fontFamily,
	);
	const textCharCount = text.length;

	let remainingWidth = availableWidth - middleEllipsisWidth;
	let firstHalf = "";
	let secondHalf = "";

	for (let i = 0; i < Math.floor(textCharCount / 2); i++) {
		const fhWidth = getCharacterWidth(text[i], fontSize, fontFamily);
		remainingWidth -= fhWidth;

		if (remainingWidth < 0) break;
		firstHalf += text[i];

		const shWidth = getCharacterWidth(
			text[textCharCount - i - 1],
			fontSize,
			fontFamily,
		);
		remainingWidth -= shWidth;

		if (remainingWidth < 0) break;
		secondHalf = text[textCharCount - i - 1] + secondHalf;
	}

	return firstHalf + middleEllipsis + secondHalf;
};

export const observeResize = ({ 
	element, 
	text, 
	middleEllipsis, 
	callback 
} : {
	text: string,
	element: HTMLElement,
	middleEllipsis: string,
	callback: (truncatedText: string) => void,
}) => {
	const observer = new ResizeObserver(() => {
		const truncatedText = truncateText({
			element,
			text,
			middleEllipsis,
		});

		callback(truncatedText);
	});

	observer.observe(element);

	return () => observer.disconnect();
};
