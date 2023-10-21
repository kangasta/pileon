<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Card as ICard } from "two-to-seven-triple-draw";

  import { getCardAppearance } from "../utils/card";
  import { onSpecificKey } from "../utils/events";
  import {
    setStackDataTransfer,
    stackLabel,
    stackWidthEm,
  } from "../utils/stack";

  import Card from "./Card.svelte";

  const cardAppearance = getCardAppearance();
  $: size = $cardAppearance.size;

  export let cards: ICard[] = [];
  export let capacity = 4;
  export let closed = false;
  export let index = 0;
  export let isDraggableFn: (cards: ICard[]) => boolean = () => false;
  export let selectedCardsN = 0;
  export let labelOptions: { title: string; closed?: false | "rank" } = {
    title: "Stack",
  };
  /** Internal prop used to detect if component is the top-level component. */
  export let nested = false;

  $: style = `width: ${stackWidthEm(capacity, size)}em`;
  $: draggable = !closed && isDraggableFn(cards);
  $: selected = selectedCardsN > 0 && selectedCardsN === cards.length;
  $: hidden = closed && cards.length === 1;

  $: onDragStart = (e: DragEvent) => {
    e.stopPropagation();
    setStackDataTransfer(e, index, cards);
  };

  $: onDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const dispatch = createEventDispatcher();

  $: onSelect = () => {
    if (!nested) {
      dispatch("select", { index });
    }
  };
  $: label = nested
    ? undefined
    : stackLabel(
        labelOptions.title,
        cards,
        selectedCardsN,
        closed,
        labelOptions.closed,
      );
</script>

<div
  aria-label={label}
  class="stack"
  class:selected
  {style}
  {draggable}
  on:dblclick
  on:dragstart={onDragStart}
  on:dragover={onDragOver}
  on:drop
  on:click={onSelect}
  on:keydown={onSpecificKey(["Enter", "Space"], onSelect, {
    preventDefault: true,
  })}
  role="button"
  tabindex={nested ? undefined : 0}
>
  <div aria-hidden={nested ? undefined : "true"}>
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
          nested={true}
          {closed}
          {index}
          {isDraggableFn}
          {selectedCardsN}
        />
      </div>
    {/if}
  </div>
</div>

<style lang="sass">
  .stack
    position: relative

    &.selected
      bottom: 0.666em

    &:focus-visible
      border-radius: 0.25em
      outline: 4px solid black
      outline-offset: 4px

  .nested
    position: absolute
    left: 1.125em
    top: 0
</style>
