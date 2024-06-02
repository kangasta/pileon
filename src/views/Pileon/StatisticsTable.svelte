<script lang="ts">
  import {
    countElapsed,
    countEvents,
    prettyElapsed,
    type IEvent,
  } from "../../utils/statistics";

  export let events: IEvent[];

  $: count = countEvents(events);
  $: [_, elapsed] = countElapsed(events);
</script>

<p>Here are statistics about the completed game:</p>
<table>
  <tr>
    <th>Time:</th>
    <td>{prettyElapsed(elapsed)}</td>
  </tr>
  <tr>
    <th>Moves:</th>
    <td>{count.move ?? 0}</td>
  </tr>
  <tr>
    <th>Undos:</th>
    <td>{count.undo ?? 0}</td>
  </tr>
</table>

<style lang="sass">
  th,td
    padding: 0

  th
    padding-right: 1em
    text-align: left
</style>
