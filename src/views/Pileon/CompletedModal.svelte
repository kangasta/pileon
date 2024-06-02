<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import IconButton from "../../components/Menu/IconButton.svelte";
  import Modal from "../../components/Modal.svelte";
  import { type IEvent } from "../../utils/statistics";
  import { isCompleted, type Piles } from "../../utils/pileon";
  import StatisticsTable from "./StatisticsTable.svelte";

  export let events: IEvent[];
  export let piles: Piles;

  let show = true;
  $: completed = isCompleted(piles);
  $: events, (show = true);

  const dispatch = createEventDispatcher();
</script>

{#if completed && show}
  <!-- {#if show} -->
  <Modal
    title="Completed"
    on:close={() => {
      show = false;
    }}
  >
    <StatisticsTable {events} />
    <div class="actions">
      <IconButton
        icon="Shuffle"
        label="Shuffle"
        onClick={() => dispatch("shuffle")}
      />
    </div>
  </Modal>
{/if}

<style lang="sass">
    .actions
      text-align: center
</style>
