const getCharacterWidth = (character, fontFamily) => {
	const context = document.createElement("canvas").getContext("2d");
	if (!context) throw new Error("Browser failed to create a 2D rendering");

	context.font = `16px ${fontFamily}`;
	/* Getting avg of 2 character width, to include font-family built in spacing */
	const metrics = context.measureText(character + character);

	return metrics.width / 2;
};

const generateCharacterWidthMapping = (fontFamily) => {
	const fontWidthMapping = {};
	/*
    The first 32 characters in the ASCII-table are unprintable control codes and are not used in web typography.
    ASCII characters from 32 to 127 are printable characters. We will generate width mapping for only these characters.
  */
	for (let i = 32; i < 128; i++) {
		const character = String.fromCharCode(i);
		fontWidthMapping[character] = getCharacterWidth(character, fontFamily);
	}

	return fontWidthMapping;
};

const generateFontWidthMapping = () => {
	const fontFamilies = new Set();

	for (const element of document.querySelectorAll("*")) {
		// biome-ignore lint/complexity/noForEach: <single and simple iteration>
		window
			.getComputedStyle(element)
			.getPropertyValue("font-family")
			.split(", ")
			.forEach((fontFamily) => fontFamilies.add(fontFamily));
	}

	const fontsMap = {};

	for (const fontFamily of fontFamilies) {
		// if (fontFamily[0] === '"' || fontFamily[0] === "'") fontFamily = fontFamily.slice(1, -1);
		fontsMap[fontFamily] = generateCharacterWidthMapping(fontFamily);
	}

	return fontsMap;
};

generateFontWidthMapping();
