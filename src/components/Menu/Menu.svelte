<script lang="ts">
  import { actions } from "../../stores";
  import Modal from "../Modal.svelte";
  import IconButton from "./IconButton.svelte";
  import SettingToggle from "./SettingToggle.svelte";

  let open = false;

  const handleClick =
    (action: "open" | "close") => (e: MouseEvent | CustomEvent) => {
      open = action === "open";
      e.stopPropagation();
    };
</script>

<div class="menu">
  {#if $actions.help !== undefined}
    <IconButton icon="Help" label="Help" onClick={$actions.help} />
  {/if}
  {#if $actions.shuffle !== undefined}
    <IconButton icon="Shuffle" label="Shuffle" onClick={$actions.shuffle} />
  {/if}
  <IconButton icon={"Menu"} label={"Settings"} onClick={handleClick("open")} />
  {#if $actions.undo !== undefined}
    <IconButton icon="Undo" label="Undo" onClick={$actions.undo} />
  {/if}
</div>

{#if open}
  <Modal on:close={handleClick("close")} title="Settings">
    <table>
      <tr>
        <th>Game:</th>
        <td
          ><SettingToggle target="game" value="deck" /> / <SettingToggle
            target="game"
            value="pileon"
          />
        </td>
      </tr>
      <tr>
        <th>Colors:</th>
        <td
          ><SettingToggle target="colors" value="default" /> / <SettingToggle
            target="colors"
            value="standard"
          /> / <SettingToggle target="colors" value="four-color" /></td
        >
      </tr>
      <tr>
        <th>Size:</th>
        <td
          ><SettingToggle target="size" value="default" /> / <SettingToggle
            target="size"
            value="bridge"
          /> / <SettingToggle target="size" value="poker" /> / <SettingToggle
            target="size"
            value="small"
          /></td
        >
      </tr>
    </table>
  </Modal>
{/if}

<style lang="sass">
  .menu
    text-align: center

  table
    font-size: 1rem
    width: 100%

    th,td
      padding: 0.5em 0

    th
      padding-right: 1em
      text-align: left
</style>
