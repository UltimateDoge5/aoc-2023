const input = await Deno.readTextFile("input.txt");

function part1() {
	const lines = input.split("\n");
	const instructions = lines[0].split("");

	let steps = 0;
	let current = "AAA";

	while (current !== "ZZZ") {
		const lineIndex = lines.findIndex((line) => line.includes(current + " ="));
		const direction = instructions[steps % (instructions.length - 1)];

		// Get the next routes from current line
		const [_, leftRoute, rigthRoute] = lines[lineIndex].match(/([A-Z]{3})/g) as [string, string, string];
		if (!leftRoute || !rigthRoute) {
			throw new Error("No routes found");
		}

		if (direction !== "L" && direction !== "R") throw new Error("No direction found");
		const next = direction === "L" ? leftRoute : rigthRoute;

		steps += 1;
		current = next;
	}

	return steps;
}

console.log(part1());
