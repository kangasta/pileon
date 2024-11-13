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
  Here are statistics about the completed game. Undo and undone moves are
  excluded from <i>Significant moves</i> but included in <i>Total moves</i>.
</p>
<table>
  <tbody>
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
  </tbody>
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
