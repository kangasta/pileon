<script lang="ts">
	import { Card } from 'two-to-seven-triple-draw';

	export let bridge: boolean = false;
	export let fourColor: boolean = false
	export let card: Card = null;
	export let shadow: boolean = false;

	const labels = ['top', 'bottom',];

	$: empty = (card === undefined);
	$: hidden = (card === null && !shadow);
	$: visible = !(empty || hidden || shadow);

	$: rank = visible && card.toString(Card.StringType.ShortValue).replace('T', '10');
	$: suit = visible && card.toString(Card.StringType.EmojiSuit);
	$: suitClass = visible && card.toString(Card.StringType.LongSuit);
	$: face = visible && (card.num % 13) > 9;
</script>

<div
	class='card {suitClass}'
	class:bridge
	class:fourColor
	class:empty
	class:hidden
	class:shadow
	class:visible
>
	{#each labels as label}
		<div aria-hidden="true" class='{label} label'>
			<div class='rank'>{rank}</div>
			<div class='suit'>{suit}&#xFE0E;</div>
		</div>
		<div class='center' class:face/>
	{/each}

</div>

<style lang='sass'>
	$borderWidth: 0.2em

	.card
		border-radius: 0.25em
		box-sizing: border-box
		display: inline-block
		font-family: sans-serif
		position: relative
		user-select: none

		width: 5em
		height: 7em

		&.bridge
			width: 4.5em

		&.visible
			border-width: 0
			background-color: var(--background-card)

		&.hidden:not(.visible)
			border: $borderWidth white solid
			background: repeating-linear-gradient(60deg, transparent, transparent 0.35em, white 0.05em, white 0.4em), repeating-linear-gradient(-60deg, orangered, orangered 0.35em, white 0.05em, white 0.4em)

		&.empty:not(.visible)
			border: var(--text-primary) $borderWidth solid
			background: transparent

		&.shadow:not(.visible)
			background: var(--text-primary)

		&.spades
			color: var(--text-black)

		&.clubs
			color: var(--text-black)

			&.fourColor
				color: var(--text-green)

		&.hearts
			color: var(--text-red)
		
		&.diamonds
			color: var(--text-red)

			&.fourColor
				color: var(--text-blue)

	.label
		visibility: hidden

	.visible .label
		visibility: visible
		letter-spacing: -0.15em
		padding: 0.1em
		position: absolute
		text-align: center
		width: 1em

		&.bottom
			bottom: 0
			right: 0
			transform: rotate(180deg)

		&.top
			left: 0
			top: 0

		.suit
			font-size: 1.13em

	.center.face
		background: var(--background-highlight)
		border-radius: 0.25em
		position: absolute
		padding: 0.1em
		height: 5.5em
		left: 50%
		top: 50%
		transform: translate(-50%,-50%)
		width: 2em

		.card.bridge &
			width: 1.7em
</style>
