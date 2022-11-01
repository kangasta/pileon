<script lang="ts">
  import Deck from "./Deck.svelte";
  import Footer from "./Footer.svelte";
  import Menu from "./Menu.svelte";
  import { Deck as DeckUtils, Card } from "two-to-seven-triple-draw";

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

<Menu />
<main>
  <Deck {onClick} topCard={card} {numCards} />
</main>
<Footer />

<style lang="sass">
  main
    flex: 1
    display: flex
    align-items: center
    justify-content: center
</style>
