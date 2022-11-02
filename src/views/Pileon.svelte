<script lang="ts">
  import Stack from "../components/Stack/Stack.svelte";
  import { Deck as DeckUtils, Card } from "two-to-seven-triple-draw";

  const deal = (): Card[][] => {
    const source = new DeckUtils();
    const piles: Card[][] = [...Array(13)].map(() => source.popN(4));
    return piles.concat([[], []] as Card[][]);
  };

  let piles = deal();
</script>

<main class="pileon">
  {#each piles as pile}
    <div class="pile">
      <Stack cards={pile} />
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
