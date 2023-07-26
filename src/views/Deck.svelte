<script lang="ts">
  import Deck from "../components/Deck.svelte";
  import { Deck as DeckUtils, Card } from "two-to-seven-triple-draw";
  import { createCardAppearance, defaultAppearanceFn } from "../utils/card";

  createCardAppearance(defaultAppearanceFn);

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
  <Deck {onClick} topCard={card} {numCards} />
</main>

<style lang="sass">
  main
    flex: 1
    display: flex
    align-items: center
    justify-content: center
</style>
