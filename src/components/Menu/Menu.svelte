<script lang="ts">
  import { actions } from "../../stores";
  import IconButton from "./IconButton.svelte";
  import SettingToggle from "./SettingToggle.svelte";

  let open = false;
  const labelId = "menu-toggle-label";

  const onClick = (e: MouseEvent) => {
    open = !open;
    e.stopPropagation();
  };

  $: label = open ? "Close menu" : "Open menu";
</script>

<div class="menu">
  <div class="content" class:open>
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
  </div>
  <IconButton icon={open ? "ChevronUp" : "ChevronDown"} {label} {onClick} />
  {#if $actions.undo !== undefined}
    <IconButton icon="Undo" label="Undo" onClick={$actions.undo} />
  {/if}
</div>

<style lang="sass">
  .menu
    text-align: center

  .content
    font-size: 1rem
    margin: 0 auto
    max-height: 0
    max-width: 90%
    transform: scaleY(0)
    width: 480px
    transition: all 0.4s ease-in-out, transform 0.2s ease-in-out

    &.open
      margin-top: 1.5rem
      max-height: 100vh
      transform: scale(1)

    table
      width: 100%

      th,td
        padding: 0.5em 0

      th
        text-align: left
</style>
