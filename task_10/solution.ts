const input = await Deno.readTextFile("input.txt");
const grid = input.split("\n").map((line) => line.trim().split(""));

type Pipe = "L" | "J" | "7" | "F" | "|" | "-";

const directions: Record<Pipe, [[number, number], [number, number]]> = {
	"|": [
		[1, 0],
		[-1, 0]
	],
	"-": [
		[0, 1],
		[0, -1]
	],
	L: [
		[-1, 0],
		[0, 1]
	],
	J: [
		[-1, 0],
		[0, -1]
	],
	"7": [
		[1, 0],
		[0, -1]
	],
	F: [
		[1, 0],
		[0, 1]
	]
};

function part1() {
	const sPos: number[] = [];
	for (let i = 0; i < grid.length; i++) {
		const row = grid[i];
		for (let j = 0; j < row.length; j++) {
			const cell = row[j];
			if (cell === "S") {
				sPos.push(i, j);
				break;
			}
		}
	}

	const connectionsToS: { x: number; y: number }[] = [];

	// Go around S
	for (let i = -1; i <= 1; i++) {
		for (let j = -1; j <= 1; j++) {
			if (i === 0 && j === 0) continue;
			const cell = grid[sPos[0] + i][sPos[1] + j] as Pipe;
			if (Object.keys(directions).includes(cell)) {
				// Check if we can go to S from here
				const [dir1, dir2] = directions[cell];
				const [x1, y1] = [sPos[0] + i + dir1[0], sPos[1] + j + dir1[1]];
				const [x2, y2] = [sPos[0] + i + dir2[0], sPos[1] + j + dir2[1]];

				if (grid[x1][y1] === "S" || grid[x2][y2] === "S") connectionsToS.push({ x: sPos[0] + i, y: sPos[1] + j });
			}
		}
	}

	const [start, end] = connectionsToS;
	const visited = new Set<string>();
	visited.add(`${sPos[0]},${sPos[1]}`);

	let currentNode = start;
	// Traverse the loop until we reach the end coords
	while (currentNode.x !== end.x || currentNode.y !== end.y) {
		visited.add(`${currentNode.x},${currentNode.y}`);
		const { x, y } = currentNode;
		const cell = grid[x][y] as Pipe;

		// Check if we've been to any of the possible directions
		const [dir1, dir2] = directions[cell];
		const [x1, y1] = [x + dir1[0], y + dir1[1]];
		const [x2, y2] = [x + dir2[0], y + dir2[1]];

		if (!visited.has(`${x1},${y1}`)) {
			currentNode = { x: x1, y: y1 };
		} else if (!visited.has(`${x2},${y2}`)) {
			currentNode = { x: x2, y: y2 };
		} else {
			throw new Error("No possible directions");
		}
	}

	visited.add(`${currentNode.x},${currentNode.y}`);

	// Since its a loop, furthest point is the middle
	return visited.size / 2;
}

// Check for the directions we can go
console.log(part1());
