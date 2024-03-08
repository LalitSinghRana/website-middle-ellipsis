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

const getStringWidth = (text: string, fontSize: number, fontFamily: string) => {
	let width = 0;

	for (const c of text) {
		width += getCharacterWidth(c, fontSize, fontFamily);
	}

	return width;
};

const getElementProperties = (element: Element) => {
	const style = window.getComputedStyle(element);

	const fontSize = parseFloat(style.fontSize);
	const fontFamily = style.fontFamily.split(",")[0];

	const marginXWidth =
		parseFloat(style.marginLeft) + parseFloat(style.marginRight);
	const borderXWidth =
		parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
	const paddingXWidth =
		parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);

	const width = parseFloat(style.width);
	const totalWidth = width + marginXWidth;
	const innerWidth = width - paddingXWidth - borderXWidth;

	return {
		fontSize,
		fontFamily,
		totalWidth,
		borderXWidth,
		paddingXWidth,
		marginXWidth,
		innerWidth,
	};
};

const getSiblingWidth = (element: Element): number => {
	let width = 0;
	if (!element.parentNode) return width;

	const children = Array.from(element.parentNode.children) as Element[];

	for (const child of children) {
		if (child === element) {
			const { paddingXWidth, borderXWidth } = getElementProperties(element);
			width += paddingXWidth + borderXWidth;
		} else {
			width += getElementProperties(child).totalWidth;
		}
	}

	return width;
};

const getAvailableWidth = (element: HTMLElement) => {
	const offsetParentElement = element.offsetParent;
	if (!offsetParentElement) return 0;

	let takenWidth = 0;
	let tempElement = element;

	while (tempElement !== offsetParentElement) {
		takenWidth += getSiblingWidth(tempElement);

		if (!tempElement.parentElement) break;
		tempElement = tempElement.parentElement;
	}

	return getElementProperties(offsetParentElement).innerWidth - takenWidth;
};

const getAvailableWidthWhenSharing = (
	element: HTMLElement,
	containerElement: HTMLElement,
) => {
	const containerAvailableWidth = getAvailableWidth(containerElement);

	let takenWidth = 0;
	let tempElement = element;

	while (tempElement !== containerElement) {
		const { paddingXWidth, borderXWidth, marginXWidth } =
			getElementProperties(tempElement);
		const w = paddingXWidth + borderXWidth + marginXWidth;

		takenWidth += w;

		if (!tempElement.parentElement) break;
		tempElement = tempElement.parentElement;
	}

	const availableWidth =
		containerAvailableWidth / containerElement.childElementCount - takenWidth;

	return availableWidth;
};

export const truncateText = ({
	containerElement,
	element,
	text,
	separator,
	multiLines,
}: {
	containerElement?: HTMLElement;
	element: HTMLElement;
	text: string;
	separator: string;
	multiLines: number;
}) => {
	const { fontSize, fontFamily } = getElementProperties(element);
	let availableWidth = containerElement
		? getAvailableWidthWhenSharing(element, containerElement)
		: getAvailableWidth(element);

	if (multiLines > 1) availableWidth *= multiLines - 0.3;

	const maxTextWidth = getStringWidth(text, fontSize, fontFamily);

	/*
		If maximum possible text width is less than or equal to available width, 
		then there is no need to truncate text.
		Return original text.
	*/
	if (maxTextWidth <= availableWidth) return text;

	const middleEllipsisWidth = getStringWidth(
		separator,
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

	return firstHalf + separator + secondHalf;
};

export const observeResize = ({
	containerElement,
	element,
	text,
	separator = "...",
	multiLines = 1,
}: {
	containerElement?: HTMLElement;
	element: HTMLElement;
	text: string;
	separator?: string;
	multiLines?: number;
}) => {
	if (!element.offsetParent || !text) return () => {};

	const observer = new ResizeObserver(() => {
		const truncatedText = truncateText({
			containerElement,
			element,
			text,
			separator,
			multiLines,
		});

		// Directly update the text in the DOM
		element.textContent = truncatedText;
	});

	observer.observe(element.offsetParent);

	return () => observer.disconnect();
};
