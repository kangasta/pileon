<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { Deck as DeckUtils, Card } from "two-to-seven-triple-draw";

  import Deck from "../components/Deck.svelte";
  import { actions } from "../stores";
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

  const shuffle = (e: KeyboardEvent | MouseEvent) => {
    e.stopPropagation();

    source = new DeckUtils();
    card = null;
    numCards = source.cardsRemaining;
  };

  onMount(() => {
    actions.update((prev) => ({ ...prev, shuffle }));
  });

  onDestroy(() => {
    actions.update((prev) => ({
      ...prev,
      shuffle: undefined,
    }));
  });
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
