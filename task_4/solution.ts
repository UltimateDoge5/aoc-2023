const input = await Deno.readTextFile("./input.txt");

function part1() {
	let pointsSum = 0;
	for (const line of input.split("\n")) {
		const [_, cards] = line.split(":");
		let points = 0;

		const [winningNumbers, numbers] = cards
			.trim()
			.split("|")
			.map((x) =>
				x
					.trim()
					.split(" ")
					.map((x) => parseInt(x))
					.filter((x) => !isNaN(x))
			);

		for (const number of numbers) {
			if (winningNumbers.includes(number)) {
				if (points === 0) {
					points = 1;
					continue;
				}

				points *= 2;
			}
		}

		pointsSum += points;
	}
	return pointsSum;
}

function part2() {
	const lines = input.split("\n");
	const copies = new Array(lines.length).fill(1);

	return lines
		.map((line, cardIdx) => {
			const [winingNums, nums] = line
				.split(":")[1]
				.split("|")
				.map((num) =>
					num
						.trim()
						.split(/\s+/)
						.map((x) => parseInt(x))
				);

			const wins = nums.filter((n) => winingNums.includes(n)).length;

			for (let i = 1; i <= wins; i++) {
				copies[cardIdx + i] += copies[cardIdx];
			}

			return copies[cardIdx];
		})
		.reduce((a, b) => a + b);
}

console.log("Part 1: ", part1());
console.log("Part 2: ", part2());
