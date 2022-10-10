<script lang="ts">
	import Deck from './Deck.svelte';
	import { Deck as DeckUtils, Card} from 'two-to-seven-triple-draw';

	let source = new DeckUtils();
	let numCards = source.cardsRemaining;
	let card: Card = null;

	function onClick() {
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

<style lang="sass">
	main
		position: fixed
		top: 50%
		left: 50%
		transform: translate(-50%, -50%)
</style>
