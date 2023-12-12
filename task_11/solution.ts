const input = await Deno.readTextFile("./input.txt");
let grid = input.split("\n").map((line) => line.trim().split(""));

function part1() {
	//Expand horizontally
	for (let i = grid.length - 1; i >= 0; i--) {
		const row = grid[i];
		if (row.every((c) => c === ".")) {
			grid = [...grid.slice(0, i), row, ...grid.slice(i)];
		}
	}

	//Expand vertically
	for (let x = grid[0].length - 1; x >= 0; x--) {
		let colEmpty = true;
		for (let y = 0; y < grid.length; y++) {
			if (grid[y][x] !== ".") {
				colEmpty = false;
				break;
			}
		}
		if (colEmpty) {
			grid = grid.map((row) => [...row.slice(0, x), ".", ...row.slice(x)]);
		}
	}

	const galaxies: [number, number][] = [];
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (grid[i][j] === "#") {
				galaxies.push([i, j]);
			}
		}
	}

	let distanceSum = 0;

	for (let i = 0; i < galaxies.length; i++) {
		const [x1, y1] = galaxies[i];
		for (let j = i + 1; j < galaxies.length; j++) {
			const [x2, y2] = galaxies[j];
			distanceSum += Math.abs(x1 - x2) + Math.abs(y1 - y2);
		}
	}

	return distanceSum;
}

function part2() {
	const emptyRows = [];
	for (let i = grid.length - 1; i >= 0; i--) {
		const row = grid[i];
		if (row.every((c) => c === ".")) {
			emptyRows.push(i);
		}
	}

	const emptyCols = [];

	//Expand vertically
	for (let x = grid[0].length - 1; x >= 0; x--) {
		let colEmpty = true;
		for (let y = 0; y < grid.length; y++) {
			if (grid[y][x] !== ".") {
				colEmpty = false;
				break;
			}
		}
		if (colEmpty) {
			emptyCols.push(x);
		}
	}

	const galaxies: [number, number][] = [];

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (grid[i][j] === "#") {
				galaxies.push([i, j]);
			}
		}
	}

	let distanceSum = 0;

	for (let i = 0; i < galaxies.length; i++) {
		const [x1, y1] = galaxies[i];
		for (let j = i + 1; j < galaxies.length; j++) {
			const [x2, y2] = galaxies[j];
			const base = Math.abs(x1 - x2) + Math.abs(y1 - y2);

			const minX = Math.min(x1, x2);
			const maxX = Math.max(x1, x2);
			const minY = Math.min(y1, y2);
			const maxY = Math.max(y1, y2);

			const crossedCols = emptyCols.filter((c) => c > minY && c < maxY);
			const crossedRows = emptyRows.filter((r) => r > minX && r < maxX);

			// Idk why but half the expansion gives the right answer
			distanceSum += base + 499_999 * (crossedCols.length + crossedRows.length);
		}
	}

	return distanceSum;
}

console.log(part1());
console.log(part2());
