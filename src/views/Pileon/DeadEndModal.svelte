<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import IconButton from "../../components/Menu/IconButton.svelte";
  import MinimizeableModal from "../../components/MinimizeableModal.svelte";
  import { isDeadEnd, type Piles } from "../../utils/pileon";
  import { cardsToPrettyString } from "../../utils/text";

  export let piles: Piles;

  $: [deadEnd, loopCards] = isDeadEnd(piles);
  $: loopCardsStr = cardsToPrettyString(loopCards);

  const dispatch = createEventDispatcher();
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
      <IconButton
        icon="Shuffle"
        label="Shuffle"
        onClick={() => dispatch("shuffle")}
      />
      <IconButton icon="Undo" label="Undo" onClick={() => dispatch("undo")} />
    </div>
  </MinimizeableModal>
{/if}

<style lang="sass">
  .actions
    text-align: center
</style>
