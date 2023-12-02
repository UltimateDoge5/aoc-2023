const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const digitsAsText = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const combinedDigits = digits.concat(digitsAsText);

function part1(input: string) {
	let sum = 0;
	for (let line of input.split("\n")) {
		let calValue = "";
		line = line
			.split("")
			.filter((char) => !isNaN(parseInt(char)))
			.join("");

		calValue += line[0];
		calValue += line[line.length - 1];

		sum += parseInt(calValue);
	}

	return sum;
}

function part2(input: string) {
	let sum = 0;

	for (const line of input.split("\n")) {
		let value = "";
		let buffer = "";
		for (let i = 0; i < line.length; i++) {
			buffer += line[i];

			const match = combinedDigits.findIndex((digit) => buffer.includes(digit));
			if (match !== -1) {
				value += (match % 9) + 1;
				break;
			}
		}

		buffer = "";
		const combinedDigitsReverse = combinedDigits.map((digit) => digit.split("").reverse().join(""));

		for (let i = line.length - 1; i >= 0; i--) {
			buffer += line[i];

			// Need to check in reverse
			const digit = combinedDigitsReverse.findIndex((digit) => buffer.includes(digit));
			if (digit !== -1) {
				value += (digit % 9) + 1;
				break;
			}
		}

		sum += parseInt(value);
	}

	return sum;
}

const input = Deno.readTextFileSync("input.txt");

console.log("Part one:", part1(input));
console.log("Part two:", part2(input));
