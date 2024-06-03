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

<p>
  Here are statistics about the completed game. <i>Significant moves</i> is the
  number of moves done excluding undo moves and undone moves. <i>Total moves</i>
  includes also undo moves and undone moves.
</p>
<table>
  <tr>
    <th>Elapsed time:</th>
    <td>{prettyElapsed(elapsed)}</td>
  </tr>
  <tr>
    <th>Significant moves:</th>
    <td>{(count.move ?? 0) - (count.undo ?? 0)} </td>
  </tr>
  <tr>
    <th>Total moves:</th>
    <td>{(count.move ?? 0) + (count.undo ?? 0)} </td>
  </tr>
  <tr>
    <th>Undone moves:</th>
    <td>{count.undo ?? 0}</td>
  </tr>
</table>

<style lang="sass">
  table
    margin: 1em 0

  th,td
    padding: 0

  th
    padding-right: 1em
    text-align: left
</style>
