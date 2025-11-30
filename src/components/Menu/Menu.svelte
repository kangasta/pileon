<script lang="ts">
  import { onMount } from "svelte";

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

  let menuEl: Element;
  let belowTitlebar = "";
  const handleResize = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(navigator as any).windowControlsOverlay?.visible) {
      return;
    }

    const menuRect = menuEl.getBoundingClientRect();
    const titlebarRect =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (navigator as any).windowControlsOverlay?.getTitlebarAreaRect();

    if (
      titlebarRect.left > menuRect.left ||
      titlebarRect.right < menuRect.right
    ) {
      belowTitlebar = "below-titlebar";
    } else {
      belowTitlebar = "";
    }
  };
  onMount(handleResize);
</script>

<svelte:window on:resize={handleResize} />
<div class="titlebar">
  <div class="window-controls"></div>
  <div bind:this={menuEl} class="menu {belowTitlebar}">
    <IconButton icon="Menu" label="Menu" onClick={handleClick("open")} />
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
  <div class="window-controls"></div>
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
        <tbody>
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
        </tbody>
      </table>
    </div>
  </Modal>
{/if}

<style lang="sass">
  .titlebar
    app-region: drag
    display: flex
    margin-bottom: 0.25em

  .window-controls
    flex: 1
    height: env(titlebar-area-height, auto)

  .menu
    app-region: no-drag
    transition: margin-top 125ms

    &.below-titlebar
      margin-top: env(titlebar-area-height)

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
