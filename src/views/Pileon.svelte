<script lang="ts">
  import type { Card as ICard } from "two-to-seven-triple-draw";
  import Stack from "../components/Stack/Stack.svelte";
  import {getStackDataTransfer} from "../utils/stack";
  import {canDropFn, deal, getDonePiles, isDraggableFn} from "../utils/pileon";

  let piles = deal();
  let donePiles: number[] = []

  const handleDrop = (index: number) => (e: DragEvent) => {
    e.preventDefault();

    const {sourceStack, cards} = getStackDataTransfer(e)

    if (sourceStack === index) {
      return
    }

    if (!canDropFn(cards, piles[index])) {
      return
    }

    piles[sourceStack] = piles[sourceStack].slice(0, piles[sourceStack].length - cards.length)
    piles[index] = [...piles[index], ...cards]

    donePiles = getDonePiles(piles)
  }
</script>

<main class="pileon">
  {#each piles as pile, index}
    <div class="pile">
      <Stack cards={pile} closed={donePiles.includes(index)} {index} {isDraggableFn} on:drop={handleDrop(index)}/>
    </div>
  {/each}
</main>

<style lang="sass">
  .pileon
    flex: 1
    flex-wrap: wrap
    font-size: 0.6em
    display: flex
    align-items: center
    justify-content: center
    max-width: 100vw

  .pile
    margin: 1em
</style>
