<script>
	import Deck from './Deck.svelte';
	import draw from 'two-to-seven-triple-draw';

	const DeckUtils = draw.Deck;

	let source = new DeckUtils();
	let numCards = source.cardsRemaining;
	let card = null;

	function onClick() {
		console.log('asd')
		if (card !== undefined) {
			// updateCard
			card = source.pop();
		} else {
			// resetDeck
			source = new DeckUtils();
			card = null;
		}
		numCards = source.cardsRemaining;
	}
</script>

<main>
	<Deck onClick={onClick} topCard={card} numCards={numCards} fourColor={false}/>
</main>

<style>
	main {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
