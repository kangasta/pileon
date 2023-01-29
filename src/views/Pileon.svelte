<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  import { actions, type ISettings } from "../stores";
  import Stack from "../components/Stack.svelte";
  import { getCardAppearance, setCardAppearance } from "../utils/card";
  import { getStackDataTransfer } from "../utils/stack";
  import {
    deal,
    getDonePiles,
    tableHeightEm,
    tableWidthEm,
    isDraggableFn,
    drop,
    autoMove,
    getEqualValues,
  } from "../utils/pileon";
  import type { Card } from "two-to-seven-triple-draw";

  setCardAppearance((settings: ISettings) => ({
    bridge: settings.size !== "poker",
    fourColor: settings.colors === "four-color",
  }));

  let pilesHistory = [deal()];
  const undo = (e: KeyboardEvent | MouseEvent) => {
    e.stopPropagation();

    if (pilesHistory.length > 1) {
      pilesHistory = pilesHistory.slice(0, pilesHistory.length - 1);
    }
  };

  $: piles = pilesHistory[pilesHistory.length - 1];
  $: donePiles = getDonePiles(piles);

  let selected: [number, Card[]] = [undefined, []];

  const moveCards = (source: number, target: number, cards: Card[]) => {
    try {
      selected = [undefined, []];
      const nextPiles = drop(
        pilesHistory[pilesHistory.length - 1],
        source,
        target,
        cards
      );

      pilesHistory = [...pilesHistory, nextPiles];
    } catch (_) {
      // Ignore error for now. The error message could be displayed to the user as well.
    }
  };

  const onSelect = (e: CustomEvent<{ index: number }>) => {
    const [source, cards] = selected;
    const target = e.detail.index;

    if (donePiles.includes(target)) {
      return;
    } else if (source === undefined || cards.length === 0) {
      // Select all moveable cards from the pile
      selected = [target, getEqualValues(piles[target])];
    } else if (source === target) {
      // Reduce amount of selected cards by one
      selected = [target, cards.slice(1)];
    } else if (source !== target) {
      // Move cards to the target stack
      moveCards(source, target, cards);
      selected = [undefined, []];
    }
  };

  $: selectedPile = selected[0];
  $: selectedCards = selected[1];

  const handleDrop = (index: number) => (e: DragEvent) => {
    e.preventDefault();

    const { sourceStack, cards } = getStackDataTransfer(e);

    if (sourceStack === index) {
      return;
    }

    moveCards(sourceStack, index, cards);
  };

  const handleDoubleClick = (index: number) => (e: MouseEvent) => {
    e.preventDefault();

    try {
      selected = [undefined, []];
      const nextPiles = autoMove(pilesHistory[pilesHistory.length - 1], index);

      pilesHistory = [...pilesHistory, nextPiles];
    } catch (e) {
      // Ignore error for now. The error message could be displayed to the user as well.
    }
  };

  const cardAppearance = getCardAppearance();
  $: bridge = $cardAppearance.bridge;

  let tableWidthPx: number;
  let tableHeightPx: number;
  $: fontSizeW = (tableWidthPx * 0.95) / tableWidthEm(bridge);
  $: fontSizeH = (tableHeightPx * 0.95) / tableHeightEm();
  $: style = `font-size: ${Math.min(fontSizeW, fontSizeH)}px`;

  onMount(() => {
    actions.update((prev) => ({ ...prev, undo }));
  });

  onDestroy(() => {
    actions.update((prev) => ({ ...prev, undo: undefined }));
  });
</script>

<main
  bind:clientWidth={tableWidthPx}
  bind:clientHeight={tableHeightPx}
  class="pileon"
  {style}
>
  {#each piles as pile, index}
    <div class="pile">
      <Stack
        cards={pile}
        closed={donePiles.includes(index)}
        selectedCardsN={selectedPile === index ? selectedCards.length : 0}
        {index}
        {isDraggableFn}
        on:drop={handleDrop(index)}
        on:dblclick={handleDoubleClick(index)}
        on:select={onSelect}
      />
    </div>
  {/each}
</main>

<style lang="sass">
  .pileon
    flex: 1
    flex-wrap: wrap
    font-size: 0.7em
    display: flex
    align-items: center
    justify-content: center
    max-width: 100vw

  .pile
    margin: 0.5em 0.666em
    flex-basis: 16.7% /* Just above 1/6 */
</style>
