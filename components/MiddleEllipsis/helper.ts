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

const getElementFontProperties = (element: Element) => {
	const elementStyleObj = window.getComputedStyle(element);

	const fontSize = parseFloat(elementStyleObj.fontSize);
	const fontFamily = elementStyleObj.fontFamily.split(",")[0];

	return {
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

const getElementTotalWidth = (element: HTMLElement) => {
	const style = window.getComputedStyle(element);
	const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);

	return element.offsetWidth + margin;
};

const getPaddingAndBorderWidth = (element: HTMLElement) => {
	const style = window.getComputedStyle(element);
	const borderXWidth =
		parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
	const paddingXWidth =
		parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);

	return paddingXWidth + borderXWidth;
};

const getSiblingWidth = (element: HTMLElement): number => {
	let width = 0;
	if (!element.parentNode) return width;

	const children = Array.from(element.parentNode.children) as HTMLElement[];

	for (const child of children) {
		if (child === element) {
			width += getPaddingAndBorderWidth(element);
		} else {
			width += getElementTotalWidth(child);
		}
	}

	return width;
};

const getAvailableWidth = (element: HTMLElement) => {
	const offsetParentElement = element.offsetParent as HTMLElement;
	if (!offsetParentElement) return 0;

	let takenWidth = 0;
	let tempElement = element;

	while (tempElement !== offsetParentElement) {
		takenWidth += getSiblingWidth(tempElement);
		tempElement = tempElement.parentElement as HTMLElement;
	}

	return (
		offsetParentElement.offsetWidth -
		getPaddingAndBorderWidth(offsetParentElement) -
		takenWidth
	);
};

export const truncateText = ({
	text,
	element,
	middleEllipsis,
}: {
	text: string;
	element: HTMLElement;
	middleEllipsis: string;
}) => {
	const { fontSize, fontFamily } = getElementFontProperties(element);
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
}: {
	text: string;
	element: HTMLElement;
	middleEllipsis: string;
}) => {
	if (!element.offsetParent) return () => {};

	const observer = new ResizeObserver(() => {
		const truncatedText = truncateText({
			element,
			text,
			middleEllipsis,
		});

		// Directly update the text in the DOM
		element.textContent = truncatedText;
	});

	observer.observe(element.offsetParent);

	return () => observer.disconnect();
};
