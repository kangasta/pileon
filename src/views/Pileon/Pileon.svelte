<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  import { actions, type ISettings } from "../../stores";
  import Stack from "../../components/Stack.svelte";
  import {
    setCardAppearance,
    type ICardSize,
    createCardAppearance,
  } from "../../utils/card";
  import { getStackDataTransfer } from "../../utils/stack";
  import {
    deal,
    getDonePiles,
    isDraggableFn,
    drop,
    autoMove,
    getEqualValues,
    calculateFontSize,
    fillerStacks,
  } from "../../utils/pileon";
  import type { Card } from "two-to-seven-triple-draw";
  import PileonHelp from "./PileonHelp.svelte";

  let mainWidth: number;
  let mainHeight: number;
  let innerHeight: number;

  let appearance = createCardAppearance((settings: ISettings) => ({
    size: settings.size === "default" ? "bridge" : settings.size,
    fourColor: settings.colors === "four-color",
  }));

  $: {
    const defaultSize: ICardSize =
      mainWidth < 800 || innerHeight < 500 ? "small" : "bridge";

    setCardAppearance((settings: ISettings) => ({
      size: settings.size === "default" ? defaultSize : settings.size,
      fourColor: settings.colors === "four-color",
    }));
  }

  let pilesHistory = [deal()];

  let helpOpen = false;
  const help = (e: KeyboardEvent | MouseEvent) => {
    e.stopPropagation();

    helpOpen = true;
  };

  const shuffle = (e: KeyboardEvent | MouseEvent) => {
    e.stopPropagation();

    pilesHistory = [deal()];
  };

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
        cards,
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

  $: size = $appearance.size;
  $: fontSize = calculateFontSize(size, mainWidth, mainHeight, innerHeight);
  $: style = `font-size: ${fontSize}px`;

  onMount(() => {
    actions.update((prev) => ({ ...prev, help, shuffle, undo }));
  });

  onDestroy(() => {
    actions.update((prev) => ({
      ...prev,
      help: undefined,
      shuffle: undefined,
      undo: undefined,
    }));
  });
</script>

<svelte:window bind:innerHeight />

<main
  bind:clientHeight={mainHeight}
  bind:clientWidth={mainWidth}
  class="pileon"
  {style}
>
  {#each piles as pile, index}
    <div class="pile" class:small={size === "small"}>
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
  {#each fillerStacks(mainWidth, innerHeight) as _}
    <div class="pile" />
  {/each}
</main>
{#if helpOpen}
  <PileonHelp
    on:close={() => {
      helpOpen = false;
    }}
  />
{/if}

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

    &.small
      margin: 0.25em 0.333em

    @media (max-aspect-ratio: 4/3)
      flex-basis: 20.1% /* Just above 1/5 */

    @media (max-aspect-ratio: 3/4)
      flex-basis: 25.1% /* Just above 1/4 */
</style>