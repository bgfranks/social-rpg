import type { PlayerStats } from './types';

export const playerStats = {
	charisma: 14,
	perception: 12,
	diplomacy: 8,
	intelligence: 10
};

export function rollDice() {
	const rolledNum = Math.floor(Math.random() * 20) + 1;

	return rolledNum;
}

export function determineAttrbModifier(playerStats: PlayerStats) {
	const attribute = playerStats.charisma;
	const modifier = (attribute - 10) / 2;

	console.log(playerStats);

	return modifier;
}
