<script lang="ts">
  import type { ISettings } from "../stores";
  import Stack from "../components/Stack.svelte";
  import { getCardAppearance, setCardAppearance } from "../utils/card";
  import { getStackDataTransfer } from "../utils/stack";
  import {
    canDropFn,
    deal,
    getDonePiles,
    tableHeightEm,
    tableWidthEm,
    isDraggableFn,
  } from "../utils/pileon";

  setCardAppearance((settings: ISettings) => ({
    bridge: settings.size !== "poker",
    fourColor: settings.colors === "four-color",
  }));

  let piles = deal();
  let donePiles: number[] = [];

  const handleDrop = (index: number) => (e: DragEvent) => {
    e.preventDefault();

    const { sourceStack, cards } = getStackDataTransfer(e);

    if (sourceStack === index) {
      return;
    }

    if (!canDropFn(cards, piles[index])) {
      return;
    }

    piles[sourceStack] = piles[sourceStack].slice(
      0,
      piles[sourceStack].length - cards.length
    );
    piles[index] = [...piles[index], ...cards];

    donePiles = getDonePiles(piles);
  };

  const cardAppearance = getCardAppearance();
  $: bridge = $cardAppearance.bridge;

  let tableWidthPx: number;
  let tableHeightPx: number;
  $: fontSizeW = (tableWidthPx - 100) / tableWidthEm(bridge);
  $: fontSizeH = (tableHeightPx - 50) / tableHeightEm();
  $: style = `font-size: ${Math.min(fontSizeW, fontSizeH)}px`;
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
        {index}
        {isDraggableFn}
        on:drop={handleDrop(index)}
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
    flex-basis: 17.5%
</style>
