const input = await Deno.readTextFile("input.txt");
const lines = input.split("\n");

function part1() {
	let sum = 0;

	//For every line
	for (const line of lines) {
		const numbers = line.match(/-\d+|\d+/g)!.map(Number);
		const cycles = [[...numbers]];

		let i = 0;
		while (!cycles.at(-1)!.every((n) => n === 0)) {
			const cycle = [];
			for (let j = 1; j < cycles[i].length; j++) {
				cycle.push(cycles[i][j] - cycles[i][j - 1]);
			}
			cycles.push(cycle);
			i++;
		}

		// Go in reverse and fill the missing element
		for (let i = cycles.length - 1; i >= 0; i--) {
			// r is the sum of the last element of the previous cycle and the last element of the current cycle
			const lastCycleElement = cycles[i + 1]?.at(-1) ?? 0;
			const r = lastCycleElement + cycles[i].at(-1)!;
			cycles[i].push(r);
		}

		sum += cycles[0].at(-1)!;
	}

	return sum;
}

// I just realized that I could use the part 1 code and just reverse the input... but the code is already written so I'll just leave it here
function part2() {
	let sum = 0;

	//For every line
	for (const line of lines) {
		const numbers = line.match(/-\d+|\d+/g)!.map(Number);
		const cycles = [[...numbers]];

		let i = 0;
		while (!cycles.at(-1)!.every((n) => n === 0)) {
			const cycle = [];
			for (let j = 1; j < cycles[i].length; j++) {
				cycle.push(cycles[i][j] - cycles[i][j - 1]);
			}
			cycles.push(cycle);
			i++;
		}

		// Go in reverse and fill the missing element
		for (let i = cycles.length - 1; i >= 0; i--) {
			const lastCycleElement = cycles[i + 1]?.[0] ?? 0;
			const r = cycles[i].at(0)! - lastCycleElement;
			cycles[i].unshift(r);
		}

		sum += cycles[0][0];
	}

	return sum;
}

console.log("Part one is:", part1());
console.log("Part two is:", part2());
