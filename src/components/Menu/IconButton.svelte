<script lang="ts">
  import { randomString } from "../../utils/components";

  import Icon from "./Icon.svelte";
  import type { IIconName } from "./icons";

  export let icon: IIconName;
  export let label: string;
  export let onClick: (e: MouseEvent) => void;

  const labelId = `${randomString()}-label`;
</script>

<!-- The <div> element has a child <button> element that handles keyboard interaction -->
<!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
<div on:click={onClick} class="icon-button clickable">
  <div class="content">
    <button
      aria-labelledby={labelId}
      class="clickable"
      class:open
      on:click={onClick}
    >
      <div class="icon">
        <Icon {icon} />
      </div>
    </button>
    <div class="label" id={labelId}>{label}</div>
  </div>
</div>

<style lang="sass">
  div.icon-button
    display: inline-flex
    flex-direction: column
    justify-content: center
    height: 4.5626rem

    // Disable blue tap-highlight on mobile chrome
    -webkit-tap-highlight-color: transparent

    &:hover .content
      transform: scale(1.1) translateY(-0.15rem)

    &:active .icon
      transform: translateY(0.15rem)

  div.content
    display: inline-flex
    flex-direction: column
    align-items: center
    transition: transform 125ms

  .clickable
    cursor: pointer

  button
    appearance: none
    background: transparent
    border: 0px none
    color: inherit
    padding: 0
    margin: 0.75rem

    &:focus-visible
      outline: 3px solid black
      border-radius: 0.5em

    :global(svg)
      height: 2rem

  div.label
    font-size: 1rem
    font-weight: 600
    margin-top: -0.75rem
</style>
