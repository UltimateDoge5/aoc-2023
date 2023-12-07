const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");

const priority = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"].reverse();

//Priority for the second part comparison
const secondPriority = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"].reverse();

const typeToValue: Record<Types, number> = {
	"high card": 1,
	"one pair": 2,
	"two pair": 3,
	"three of a kind": 4,
	"full house": 5,
	"four of a kind": 6,
	"five of a kind": 7
} satisfies Record<Types, number>;

function part1() {
	const hands: [string, string][] = lines.map((line) => line.split(" ") as [string, string]);

	const strength = hands.sort((a, b) => compareHands(a[0], b[0]));
	const prize = strength.map(([_, bid], i) => {
		const bidNum = parseInt(bid);
		return bidNum * (i + 1);
	});

	return prize.reduce((acc, curr) => acc + curr, 0);
}

function part2() {
	const hands: [string, string][] = lines.map((line) => line.split(" ") as [string, string]);

	const strength = hands.sort((a, b) => compareHandsWithJoker(a[0], b[0]));
	const prize = strength.map(([_, bid], i) => {
		const bidNum = parseInt(bid);
		return bidNum * (i + 1);
	});

	return prize.reduce((acc, curr) => acc + curr, 0);
}

function compareHands(hand1: string, hand2: string) {
	const type1 = classifyHand(hand1);
	const type2 = classifyHand(hand2);

	if (typeToValue[type1] > typeToValue[type2]) return 1;
	if (typeToValue[type1] < typeToValue[type2]) return -1;

	const cards1 = hand1.split("");
	const cards2 = hand2.split("");

	let idx = 0;
	let h1Index = priority.findIndex((p) => p === cards1[idx]);
	let h2Index = priority.findIndex((p) => p === cards2[idx]);

	while (h1Index === h2Index) {
		idx += 1;
		h1Index = priority.findIndex((p) => p === cards1[idx]);
		h2Index = priority.findIndex((p) => p === cards2[idx]);
	}

	if (h1Index > h2Index) return 1;
	if (h1Index < h2Index) return -1;

	throw new Error("This should never happen");
}

function compareHandsWithJoker(hand1: string, hand2: string) {
	const type1 = classifyHighestHand(hand1);
	const type2 = classifyHighestHand(hand2);

	if (typeToValue[type1] > typeToValue[type2]) return 1;
	if (typeToValue[type1] < typeToValue[type2]) return -1;

	const cards1 = hand1.split("");
	const cards2 = hand2.split("");

	let idx = 0;
	let h1Index = secondPriority.findIndex((p) => p === cards1[idx]);
	let h2Index = secondPriority.findIndex((p) => p === cards2[idx]);

	// check until we find a difference
	while (h1Index === h2Index) {
		idx += 1;
		h1Index = secondPriority.findIndex((p) => p === cards1[idx]);
		h2Index = secondPriority.findIndex((p) => p === cards2[idx]);
	}

	if (h1Index > h2Index) return 1;
	if (h1Index < h2Index) return -1;

	throw new Error("This should never happen");
}

function classifyHighestHand(hand: string) {
	let highestType: Types = "high card";
	const permutations = generatePermutations(hand);

	for (const permutation of permutations) {
		const type = classifyHand(permutation);
		if (typeToValue[type] > typeToValue[highestType]) {
			highestType = type;
		}
	}
	return highestType;
}

function classifyHand(hand: string): Types {
	const cards = hand.split("");

	if (cards.every((value) => value === cards[0])) return "five of a kind";

	const counts = cards.reduce((acc, curr) => {
		if (acc[curr]) {
			acc[curr] += 1;
		} else {
			acc[curr] = 1;
		}
		return acc;
	}, {} as { [key: string]: number });

	const types = Object.keys(counts);
	const pairs = Object.keys(counts).filter((type) => counts[type] >= 2).length;
	const maxShared = Math.max(...types.map((type) => hand.split("").filter((card) => card === type).length));

	if (pairs == 1 && maxShared == 4) return "four of a kind";
	if (pairs == 1 && maxShared == 3) return "three of a kind";
	if (pairs == 2 && maxShared == 3) return "full house";
	if (pairs == 2 && maxShared == 2) return "two pair";
	if (pairs == 1) return "one pair";

	return "high card";
}

// Generate all permutations for joker cards
function generatePermutations(hand: string): string[] {
	const cards = hand.split("");
	const jokerIdx = cards.findIndex((card) => card === "J");

	const permutations = [];

	for (const card of priority) {
		if (card === "J") continue; // Dont make an infinite loop

		const newHand = [...cards];
		newHand[jokerIdx] = card;
		permutations.push(newHand.join(""));

		// Check if there is another joker
		if (newHand.includes("J")) {
			permutations.push(...generatePermutations(newHand.join("")));
		}
	}

	return permutations;
}

type Types = "high card" | "one pair" | "two pair" | "three of a kind" | "full house" | "four of a kind" | "five of a kind";

console.log("part 1:", part1());
console.log("part 2:", part2());
