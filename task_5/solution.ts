const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");
// const mapNames = lines.map((line) => new RegExp(/(.+?(?=-to))-to-(.+?(?= map))/gm).exec(line)?.slice(1, 3)).filter(Boolean);

function part1() {
	performance.mark("start");
	const seeds = lines[0].split(":")[1].trim().split(" ").map(Number);
	const isMapped = new Array(seeds.length).fill(false);

	const mapIndexes = lines.map((s, i) => (s.includes("map") ? i : undefined)).filter(Boolean);

	mapIndexes.forEach((mapIdx) => {
		if (!mapIdx) return;

		isMapped.fill(false);
		let i = 1;
		while (lines[mapIdx + i]?.trim()) {
			const [destStart, sourceStart, range] = lines[mapIdx + i].split(" ").map(Number);

			seeds.forEach((seed, j) => {
				if (seed >= sourceStart && seed <= sourceStart + range - 1 && !isMapped[j]) {
					seeds[j] = destStart + seed - sourceStart;
					isMapped[j] = true;
				}
			});

			i++;
		}
	});

	performance.mark("end");
	console.log(performance.measure("measure", "start", "end").duration);
	return Math.min(...seeds);
}

function part2() {
	const seeds = lines[0].split(":")[1].trim().split(" ").map(Number);
	let seedPairs: [number, number][] = [];

	const mapIndexes = lines.map((s, i) => (s.includes("map") ? i : undefined)).filter(Boolean);

	for (let i = 0; i < seeds.length; i += 2) {
		seedPairs.push([seeds[i], seeds[i] + seeds[i + 1]]);
	}

	//Go over each map
	mapIndexes.forEach((mapIdx) => {
		if (!mapIdx) return;

		const newSeeds: [number, number][] = [];

		//Go over each seed pair
		while (seedPairs.length > 0) {
			const [seed, seedEnd] = seedPairs.pop()!;
			let i = 1;

			//Go over each map line
			while (lines[mapIdx + i]?.trim()) {
				const [destStart, sourceStart, range] = lines[mapIdx + i].split(" ").map(Number);

				// Seed needs to overlap with the seed range and the map range
				const overlapMin = Math.max(seed, sourceStart);
				const overlapMax = Math.min(seedEnd, sourceStart + range);

				if (overlapMin < overlapMax) {
					newSeeds.push([destStart + overlapMin - sourceStart, destStart + overlapMax - sourceStart]);

					if (seed < overlapMin) {
						seedPairs.push([seed, overlapMin]);
					}
					if (seedEnd > overlapMax) {
						seedPairs.push([overlapMax, seedEnd]);
					}
					break;
				}

				i++;
			}

			// If the seed pair is not mapped, pass it to the next map
			if (!lines[mapIdx + i]?.trim()) {
				newSeeds.push([seed, seedEnd]);
			}
		}

		seedPairs = newSeeds;
	});

	return Math.min(...seedPairs.map((s) => s[0]));
}

console.log("Part one:", part1());
console.log("Part two:", part2());
