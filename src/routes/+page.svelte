<script lang="ts">
	import type { PlayerStats } from '$lib/types';
	import { playerStats, rollDice, determineAttrbModifier } from '$lib';

	let diceRoll: number;
	let modifier: number;
	let rollWithMod: number;
	let rollToBeat: number;

	const handleOnClick = (playerStats: PlayerStats) => {
		rollToBeat = Math.floor(Math.random() * 20) + 1;

		diceRoll = rollDice();
		modifier = determineAttrbModifier(playerStats);

		if (diceRoll === 1 || diceRoll === 20) {
			rollWithMod = 0;
			return { diceRoll, modifier };
		}
		rollWithMod = diceRoll + modifier;

		return { diceRoll, modifier, rollWithMod };
	};
</script>

<h1>Svelte Social RPG</h1>

<div class="max-w flex flex-col gap-5 px-10 py-5">
	<div class="card">
		<h2 class="header-2">Player Stats</h2>
		<p>Charisma: {playerStats.charisma}</p>
		<p>Perception: {playerStats.perception}</p>
		<p>Diplomacy: {playerStats.diplomacy}</p>
		<p>Intelligence: {playerStats.intelligence}</p>
	</div>
	<div class="card">
		<h2 class="header-2">Roll to beat: {rollToBeat}</h2>
		<p>Your roll: {diceRoll ? diceRoll : 'n/a'}</p>
		<p>your modifier: {modifier}</p>
		<p>Roll plus modifier: {rollWithMod ? rollWithMod : diceRoll}</p>
		<button
			class="mt-5 rounded-full bg-blue-700 px-6 py-0.5 text-xl"
			onclick={() => handleOnClick(playerStats)}>Roll</button
		>
	</div>
	<div>
		{#if diceRoll === 20}
			<div class="pop-up crit-success">
				<p>Critial Success! Your post went through!</p>
			</div>
		{:else if diceRoll === 1}
			<div class="pop-up crit-failure">
				<p>Critical Failure! Your post was deleted!</p>
			</div>
		{:else if rollWithMod > rollToBeat}
			<div class="pop-up success">
				<p>You were able to post successfully!</p>
			</div>
		{:else if rollWithMod < rollToBeat}
			<div class="pop-up failure">
				<p>You rolled too low. unable to post!</p>
			</div>
		{/if}
	</div>
</div>
