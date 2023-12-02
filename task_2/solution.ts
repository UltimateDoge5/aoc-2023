const input = await Deno.readTextFile("./input.txt");
const possibleIds = [];

for (const line of input.split("\n")) {
	const [id, sets] = line.split(":");
	const parsedId = parseInt(new RegExp(/\d+/).exec(id)![0]);

	let valid = true;
	for (const set of sets.split(";")) {
		const cubes = set.trim().split(",");

		for (const cube of cubes) {
			const [amount, color] = cube.trim().split(" ");

			if (color === "red" && parseInt(amount) > 12) {
				valid = false;
				break;
			} else if (color == "green" && parseInt(amount) > 13) {
				valid = false;
				break;
			} else if (color === "blue" && parseInt(amount) > 14) {
				valid = false;
				break;
			}
		}

		if (!valid) break;
	}

	if (valid) possibleIds.push(parsedId);
}

console.log(
	"Sum: ",
	possibleIds.reduce((a, b) => a + b, 0)
);

possibleIds.length = 0;
let powerSum = 0;

for (const line of input.split("\n")) {
	const [_, sets] = line.split(":");

	const minCubes = {
		red: 0,
		green: 0,
		blue: 0
	};

	for (const set of sets.split(";")) {
		const cubes = set.trim().split(",");

		for (const cube of cubes) {
			const [amount, color] = cube.trim().split(" ") as [string, "red" | "green" | "blue"];

			if (parseInt(amount) > minCubes[color]) {
				minCubes[color] = parseInt(amount);
			}
		}
	}

	powerSum += minCubes.red * minCubes.green * minCubes.blue;
}

console.log("Power sum: ", powerSum);
