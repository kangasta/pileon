<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import IconButton from "../../components/Menu/IconButton.svelte";
  import MinimizeableModal from "../../components/MinimizeableModal.svelte";
  import { isCompleted, type Piles } from "../../utils/pileon";
  import { type IEvent } from "../../utils/statistics";

  import StatisticsTable from "./StatisticsTable.svelte";

  export let events: IEvent[];
  export let piles: Piles;

  $: completed = isCompleted(piles);

  const dispatch = createEventDispatcher();
</script>

{#if completed}
  <MinimizeableModal title="Completed">
    <StatisticsTable {events} />
    <div class="actions">
      <IconButton
        icon="Shuffle"
        label="Shuffle"
        onClick={() => dispatch("shuffle")}
      />
    </div>
  </MinimizeableModal>
{/if}

<style lang="sass">
    .actions
      text-align: center
</style>
