import * as mod from "https://deno.land/std@0.208.0/fmt/colors.ts";
import { checkForSymbol } from "./solution.ts";

const textInput = await Deno.readTextFile("./input.txt");
const input = textInput.split("\n").map((line) => line.split("").filter((char) => char !== "\r"));

// Utility for showing the parsed and colored input in the terminal
for (let x = 0; x < input.length; x++) {
	let width = 0;
	let currentLine = "";
	for (let y = 0; y < input[x].length; y++) {
		if (input[x][y].match(/\d/)) {
			width += 1;
		}

		if (width > 0 && !input[x][y + 1]?.match(/\d/)) {
			if (checkForSymbol(x, y, width)) {
				currentLine += mod.brightGreen(input[x].slice(y - width + 1, y + 1).join(""));
			} else {
				currentLine += mod.brightRed(input[x].slice(y - width + 1, y + 1).join(""));
			}
			width = 0;
		} else if (width == 0 && input[x][y] !== ".") {
			currentLine += mod.brightBlue(input[x][y]);
		} else if (width == 0 && input[x][y] === ".") {
			currentLine += mod.gray(input[x][y]);
		}
	}
	console.log(currentLine);
}
