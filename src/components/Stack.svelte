<script lang="ts">
  import type { Card as ICard } from "two-to-seven-triple-draw";
  import Card from "./Card.svelte";
  import { setStackDataTransfer } from "../utils/stack";
  import { getCardAppearance } from "../utils/card";

  const cardAppearance = getCardAppearance();
  $: bridge = $cardAppearance.bridge;

  export let cards: ICard[] = [];
  export let capacity = 4;
  export let closed = false;
  export let index = 0;
  export let isDraggableFn: (cards: ICard[]) => boolean = () => false;

  $: style = `width: ${(bridge ? 4.5 : 5) + capacity * 1.125}em`;
  $: draggable = !closed && isDraggableFn(cards);
  $: hidden = closed && cards.length === 1;

  $: onDragStart = (e: DragEvent) => {
    e.stopPropagation();
    setStackDataTransfer(e, index, cards);
  };

  $: onDragOver = (e: DragEvent) => {
    e.preventDefault();
  };
</script>

<div
  class="stack"
  {style}
  {draggable}
  on:dragstart={onDragStart}
  on:dragover={onDragOver}
  on:drop
>
  {#if cards.length === 0}
    <Card empty />
  {:else}
    <Card card={hidden ? null : cards[0]} stack="left" />
  {/if}
  {#if cards.length > 1}
    <div class="nested">
      <svelte:self
        cards={cards.slice(1)}
        capacity={capacity - 1}
        {closed}
        {index}
        {isDraggableFn}
      />
    </div>
  {/if}
</div>

<style lang="sass">
  .stack
    position: relative

  .nested
    position: absolute
    left: 1.125em
    top: 0
</style>
