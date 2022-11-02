<script lang="ts">
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
          /> / <SettingToggle target="size" value="poker" /></td
        >
      </tr>
    </table>
  </div>
  <div on:click={onClick}>
    <button aria-labelledby={labelId} class:open on:click={onClick}>
      <svg viewBox="0 0 16 16 ">
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
          d="M 4 6 l 4 4 l 4 -4"
        />
      </svg>
    </button>
    <div class="label" id={labelId}>{label}</div>
  </div>
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

  button
    appearance: none
    background: transparent
    border: 0px none
    color: inherit
    padding: 0
    margin: 1rem 1rem 0rem 1rem

    &:focus-visible
      outline: 3px solid black
      border-radius: 0.5em

    &.open svg
      transform: scaleY(-1)

    svg
      height: 2rem
      transition: transform 250ms

  div.label
    font-size: 1rem
    font-weight: 600
    margin-top: -0.75rem
</style>
