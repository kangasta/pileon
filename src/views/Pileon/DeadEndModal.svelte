<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import { isDeadEnd, type Piles } from "../../utils/pileon";
  import Modal from "../../components/Modal.svelte";
  import IconButton from "../../components/Menu/IconButton.svelte";

  export let piles: Piles;

  let show = true;
  $: deadEnd = isDeadEnd(piles);
  $: piles, (show = true);

  const dispatch = createEventDispatcher();
</script>

{#if deadEnd && show}
  <Modal
    title="Dead end"
    on:close={() => {
      show = false;
    }}
  >
    {#if deadEnd === "dead-end"}
      <p>No more possible moves. Undo the last move or start a new game.</p>
    {/if}
    {#if deadEnd === "infinite-loop"}
      <p>
        One card can be moved back and forth between two piles. There are no
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
  </Modal>
{/if}

<style lang="sass">
  .actions
    text-align: center
</style>
