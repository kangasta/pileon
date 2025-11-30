<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import type { Card } from "two-to-seven-triple-draw";

  import Stack from "../../components/Stack.svelte";
  import { actions, type IActions, type ISettings } from "../../stores";
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
    calculateTableEmSize,
    isCompleted,
  } from "../../utils/pileon";
  import { getStackDataTransfer, stackWidthEm } from "../../utils/stack";
  import { newEvent } from "../../utils/statistics";

  import CompletedModal from "./CompletedModal.svelte";
  import DeadEndModal from "./DeadEndModal.svelte";
  import PileonHelp from "./PileonHelp.svelte";

  let mainWidth: number;
  let mainHeight: number;

  let appearance = createCardAppearance((settings: ISettings) => ({
    size: settings.size === "default" ? "bridge" : settings.size,
    fourColor: settings.colors === "four-color",
  }));

  $: {
    const defaultSize: ICardSize =
      mainWidth < 800 || mainHeight < 400 ? "small" : "bridge";

    setCardAppearance((settings: ISettings) => ({
      size: settings.size === "default" ? defaultSize : settings.size,
      fourColor: settings.colors === "four-color",
    }));
  }

  let pilesHistory = [deal()];
  let events = [newEvent("start")];

  let helpOpen = false;
  const help = (e: KeyboardEvent | MouseEvent) => {
    e.stopPropagation();

    helpOpen = true;
  };

  const shuffle = (e: CustomEvent | KeyboardEvent | MouseEvent) => {
    e.stopPropagation();

    selected = [undefined, []];
    pilesHistory = [deal()];
    events = [newEvent("start")];
  };

  const undo = (e: CustomEvent | KeyboardEvent | MouseEvent) => {
    e.stopPropagation();

    if (pilesHistory.length > 1) {
      selected = [undefined, []];
      pilesHistory = pilesHistory.slice(0, pilesHistory.length - 1);
      events = [...events, newEvent("undo")];
    }
  };

  $: piles = pilesHistory[pilesHistory.length - 1];
  $: donePiles = getDonePiles(piles);
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  $: isCompleted(piles) && events.push(newEvent("stop"));

  let selected: [number | undefined, Card[]] = [undefined, []];

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
      events = [...events, newEvent("move")];
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
      events = [...events, newEvent("move")];
    } catch (_) {
      // Ignore error for now. The error message could be displayed to the user as well.
    }
  };

  $: size = $appearance.size;
  $: d = calculateDimensions(size, mainWidth, mainHeight);

  onMount(() => {
    actions.update((prev: IActions) => ({ ...prev, help, shuffle, undo }));
  });

  onDestroy(() => {
    actions.update((prev: IActions) => ({
      ...prev,
      help: undefined,
      shuffle: undefined,
      undo: undefined,
    }));
  });
  $: [tableWidth5x3, _] = calculateTableEmSize(size, 5, 3);
</script>

<main
  bind:clientHeight={mainHeight}
  bind:clientWidth={mainWidth}
  class="pileon deal-{d.columns}x{d.rows}"
  style:font-size="{d.fontSize}px"
  style:max-width="{tableWidth5x3 * 1.25}em"
>
  {#each piles as pile, index (index)}
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
  {#each fillerStacks(d.columns, d.rows) as _, i (i)}
    <div class="pile" style={`min-width: ${stackWidthEm(4, size)}em`}></div>
  {/each}
</main>
{#if helpOpen}
  <PileonHelp
    on:close={() => {
      helpOpen = false;
    }}
  />
{/if}
<CompletedModal {events} {piles} on:shuffle={shuffle} />
<DeadEndModal {piles} {shuffle} {undo} />

<style lang="sass">
  .pileon
    flex: 1
    flex-wrap: wrap
    font-size: 10px
    display: flex
    align-content: center
    align-items: center
    justify-content: center
    width: 100vw
    column-gap: 1em
    row-gap: 1em
    margin: auto

    @media (max-aspect-ratio: 9/17)
      row-gap: 1em

  .pile
    flex-basis: 16.7% /* Just above 1/6 */

    &.deal-4x4
      flex-basis: 20.1% /* Just above 1/5 */

    &.deal-3x5
      flex-basis: 25.1% /* Just above 1/4 */
</style>
