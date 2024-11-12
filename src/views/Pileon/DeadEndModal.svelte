<script lang="ts">
  import IconButton from "../../components/Menu/IconButton.svelte";
  import MinimizeableModal from "../../components/MinimizeableModal.svelte";
  import { isDeadEnd, type Piles } from "../../utils/pileon";
  import { cardsToPrettyString } from "../../utils/text";

  interface IProps {
    piles: Piles;
    shuffle: (e: CustomEvent | KeyboardEvent | MouseEvent) => void;
    undo: (e: CustomEvent | KeyboardEvent | MouseEvent) => void;
  }

  let { piles, shuffle, undo }: IProps = $props();

  const [deadEnd, loopCards] = $derived(isDeadEnd(piles));
  const loopCardsStr = $derived(cardsToPrettyString(loopCards));
</script>

{#if deadEnd}
  <MinimizeableModal title="Dead end">
    {#if deadEnd === "dead-end"}
      <p>No more possible moves. Undo the last move or start a new game.</p>
    {/if}
    {#if deadEnd === "infinite-loop"}
      <p>
        {loopCardsStr} can be moved back and forth between two piles. There are no
        other possible moves. Undo the last move or start a new game.
      </p>
    {/if}
    <div class="actions">
      <IconButton icon="Shuffle" label="Shuffle" onClick={shuffle} />
      <IconButton icon="Undo" label="Undo" onClick={undo} />
    </div>
  </MinimizeableModal>
{/if}

<style lang="sass">
  .actions
    text-align: center
</style>
