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
  <IconButton icon={"Menu"} label={"Menu"} onClick={handleClick("open")} />
  {#if $actions.help !== undefined}
    <IconButton icon="Help" label="Help" onClick={$actions.help} />
  {/if}
  {#if $actions.shuffle !== undefined}
    <IconButton icon="Shuffle" label="Shuffle" onClick={$actions.shuffle} />
  {/if}
  {#if $actions.undo !== undefined}
    <IconButton icon="Undo" label="Undo" onClick={$actions.undo} />
  {/if}
</div>

{#if open}
  <Modal on:close={handleClick("close")} position="left" title="Menu">
    <div class="drawer">
      <ul>
        <li>
          <SettingToggle target="game" value="pileon"
            >Pileon solitaire</SettingToggle
          >
        </li>
        <li>
          <SettingToggle target="game" value="deck">Deck of cards</SettingToggle
          >
        </li>
      </ul>
      <div class="whitespace"></div>
      <h3>Settings</h3>
      <table>
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
    </div>
  </Modal>
{/if}

<style lang="sass">
  .menu
    margin-bottom: 0.25em
    text-align: center

  .drawer
    display: flex
    height: 100%
    flex-direction: column

    ul
      list-style-type: none
      padding: 0

    li
      padding: 1em 0
      border-top: 1px solid currentColor

      &:last-of-type
        border-bottom: 1px solid currentColor

    .whitespace
      flex: 1

    table
      font-size: 1rem
      margin: 0 0 2em
      width: 100%

      th,td
        padding: 0.5em 0

      th
        padding-right: 1em
        text-align: left
</style>
