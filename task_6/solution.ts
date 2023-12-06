const input = await Deno.readTextFile("./input.txt");

function part1() {
	const numbers = input.match(/\d+/g)?.map(Number) ?? [];
	const winPossibilities = new Array(numbers.length / 2).fill(0);

	for (let i = 0; i < numbers.length / 2; i++) {
		const time = numbers[i];
		const distance = numbers[i + numbers.length / 2];

		winPossibilities[i] = getWins(time, distance);
	}

	return winPossibilities.reduce((a, b) => a * b, 1);
}

function part2() {
	const numbers = input.match(/\d+/g) ?? [];

	const time = parseInt(numbers.slice(0, numbers.length / 2).reduce((a, b) => a + b, ""));
	const distance = parseInt(numbers.slice(numbers.length / 2).reduce((a, b) => a + b, ""));

	return getWins(time, distance);
}

function getWins(time: number, distance: number) {
	let wins = 0;

	for (let j = 1; j < time; j++) {
		const timeLeft = time - j;
		const distanceTraveled = j * timeLeft;

		if (distanceTraveled > distance) {
			wins += 1;
		}
	}

	return wins;
}

console.log("Part 1:", part1());
console.log("Part 2:", part2());
