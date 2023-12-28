<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import type { Card } from "two-to-seven-triple-draw";

  import Stack from "../../components/Stack.svelte";
  import { actions, type ISettings } from "../../stores";
  import {
    setCardAppearance,
    type ICardSize,
    createCardAppearance,
  } from "../../utils/card";
  import {
    deal,
    getDonePiles,
    isDraggableFn,
    drop,
    autoMove,
    getEqualValues,
    calculateDimensions,
    fillerStacks,
  } from "../../utils/pileon";
  import { getStackDataTransfer, stackWidthEm } from "../../utils/stack";

  import DeadEndModal from "./DeadEndModal.svelte";
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

  const shuffle = (e: CustomEvent | KeyboardEvent | MouseEvent) => {
    e.stopPropagation();

    selected = [undefined, []];
    pilesHistory = [deal()];
  };

  const undo = (e: CustomEvent | KeyboardEvent | MouseEvent) => {
    e.stopPropagation();

    if (pilesHistory.length > 1) {
      selected = [undefined, []];
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
  $: d = calculateDimensions(size, mainWidth, mainHeight, innerHeight);

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
  style:font-size="{d.fontSize}px"
  style:width="{d.tableWidthEm * 1.25}em"
>
  {#each piles as pile, index}
    <div class="pile">
      <Stack
        cards={pile}
        closed={donePiles.includes(index)}
        selectedCardsN={selectedPile === index ? selectedCards.length : 0}
        labelOptions={{ title: `Stack ${index + 1}`, closed: "rank" }}
        {index}
        {isDraggableFn}
        on:drop={handleDrop(index)}
        on:dblclick={handleDoubleClick(index)}
        on:select={onSelect}
      />
    </div>
  {/each}
  {#each fillerStacks(mainWidth, innerHeight) as _}
    <div class="pile" style={`min-width: ${stackWidthEm(4, size)}em`} />
  {/each}
</main>
{#if helpOpen}
  <PileonHelp
    on:close={() => {
      helpOpen = false;
    }}
  />
{/if}
<DeadEndModal {piles} on:shuffle={shuffle} on:undo={undo} />

<style lang="sass">
  .pileon
    flex: 1
    flex-wrap: wrap
    font-size: 0.7em
    display: flex
    align-content: center
    align-items: center
    justify-content: center
    max-width: 100vw
    column-gap: 0.5em
    row-gap: 0.5em
    margin: auto

    @media (max-aspect-ratio: 9/17)
      row-gap: 1em

  .pile
    flex-basis: 16.7% /* Just above 1/6 */

    @media (max-aspect-ratio: 4/3)
      flex-basis: 20.1% /* Just above 1/5 */

    @media (max-aspect-ratio: 3/4)
      flex-basis: 25.1% /* Just above 1/4 */
</style>
