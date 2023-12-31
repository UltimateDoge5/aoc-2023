const textInput = await Deno.readTextFile("./input.txt");
const input = textInput.split("\n").map((line) => line.split("").filter((char) => char !== "\r"));

function part1() {
	let sum = 0;
	for (let x = 0; x < input.length; x++) {
		let length = 0;
		for (let y = 0; y < input[x].length; y++) {
			if (input[x][y].match(/\d/)) {
				length += 1;
			}

			if (length > 0 && !input[x][y + 1]?.match(/\d/)) {
				if (checkForSymbol(x, y, length)) {
					sum += parseInt(input[x].slice(y - length + 1, y + 1).join(""));
				}
				length = 0;
			}
		}
	}

	return sum;
}

function part2() {
	let ratiosSum = 0;
	const gearPositions: number[][] = [];

	for (let x = 0; x < input.length; x++) {
		for (let y = 0; y < input[x].length; y++) {
			if (input[x][y] === "*") {
				gearPositions.push([x, y]);
			}
		}
	}

	for (const [x, y] of gearPositions) {
		ratiosSum += getGearRatio(x, y);
	}

	return ratiosSum;
}

function getGearRatio(x: number, y: number): number {
	//Search around the gear for a number
	let gearRatio = 1;
	let gears = 0;
	let skipUntilNextNumber = false;

	for (let i = -1; i <= 1; i++) {
		for (let j = -1; j <= 1; j++) {
			if (skipUntilNextNumber && input[x + i][y + j]?.match(/\d/)) {
				continue;
			} else {
				skipUntilNextNumber = false;
			}

			if (input[x + i][y + j]?.match(/\d/)) {
				const number = getWholeNumber(x + i, y + j);
				skipUntilNextNumber = true;
				gearRatio *= parseInt(number);
				gears += 1;
			}
		}
		skipUntilNextNumber = false;
	}

	if (gears !== 2) {
		return 0;
	}

	return gearRatio;
}

// Search for the number in both directions. Returned as string as we need the length
function getWholeNumber(x: number, y: number): string {
	let number = "";
	// Search left
	for (let i = y; i >= 0; i--) {
		if (!input[x][i].match(/\d/)) {
			break;
		}

		number = input[x][i] + number;
	}

	// Search right
	for (let i = y + 1; i < input[x].length; i++) {
		if (!input[x][i].match(/\d/)) {
			break;
		}

		number += input[x][i];
	}

	return number;
}

//Check around the number for a symbol other than a .
export function checkForSymbol(x: number, y: number, length: number): boolean {
	for (let i = -1; i <= 1; i++) {
		for (let j = -length; j <= 1; j++) {
			//Skip if j is within the width of the number, j starts at -width so we need to add 1 to it
			if (i === 0 && j >= -length + 1 && j <= 0) {
				continue;
			}

			if (x + i < 0 || y + j < 0 || x + i >= input.length || y + j >= input[x].length) continue;

			if (input[x + i] && input[x + i][y + j] && input[x + i][y + j].match(/\d/)) {
				console.error("Found digit", input[x + i][y + j], "at", x + i, y + j);
				throw new Error("Found digit, this should not happen");
			}

			if (input[x + i] && input[x + i][y + j] && input[x + i][y + j] !== ".") {
				return true;
			}
		}
	}

	// console.log("No symbol found for", input[x].slice(y - length + 1, y + 1).join(""));
	return false;
}

console.log("Part 1: ", part1());
console.log("Part 2: ", part2());
