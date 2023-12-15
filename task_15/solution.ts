const input = await Deno.readTextFile("./input.txt");
const seqesnces = input.split(",");

function part1() {
	return seqesnces.reduce((acc, seq) => acc + getHash(seq), 0);
}

function getHash(seq: string) {
	let hash = 0;
	seq.split("").forEach((char) => {
		hash += char.charCodeAt(0);
		hash *= 17;
		hash %= 256;
	});
	return hash;
}

function part2() {
	const boxes = new Array<Map<string, number>>(256);
	for (let i = 0; i < 256; i++) {
		boxes[i] = new Map();
	}

	for (const seq of seqesnces) {
		if (seq.includes("-")) {
			const [lens] = seq.split("-");
			const boxId = getHash(lens);
			boxes[boxId].delete(lens);
		} else {
			const [lens, focalLength] = seq.split("=");
			const boxId = getHash(lens);
			boxes[boxId].set(lens, Number(focalLength));
		}
	}

	let power = 0;
	boxes.forEach((box, i) => {
		let j = 1;
		for (const [_, focalPoint] of box) {
			power += (i + 1) * j * focalPoint;
			j++;
		}
	});

	return power;
}

console.log(part1());
console.log(part2());
