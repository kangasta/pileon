<script lang="ts">
  import { randomString } from "../../utils/components";

  type IIconName = "Undo" | "ChevronDown" | "ChevronUp";
  const icons: { [key in IIconName]: { path: string; class?: string } } = {
    Undo: {
      path: "M 6 2 L 2 6 L 6 10 M 2 6 L 10 6 A 4 4 0 1 1 10 14 L 8 14",
    },
    ChevronDown: {
      path: "M 4 6 L 8 10 L 12 6",
      class: "transition-transform",
    },
    ChevronUp: {
      path: "M 4 6 L 8 10 L 12 6",
      class: "transition-transform mirror-y",
    },
  };

  export let icon: IIconName;
  export let label: string;
  export let onClick: (e: MouseEvent) => void;

  const labelId = `${randomString()}-label`;
</script>

<div on:click={onClick} class="icon-button clickable">
  <button
    aria-labelledby={labelId}
    class="clickable"
    class:open
    on:click={onClick}
  >
    <svg viewBox="0 0 16 16 " class={icons[icon].class}>
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1"
        d={icons[icon].path}
      />
    </svg>
  </button>
  <div class="label" id={labelId}>{label}</div>
</div>

<style lang="sass">
  div.icon-button
    display: inline-flex
    flex-direction: column
    align-items: center

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

    svg
      height: 2rem

      &.transition-transform
        transition: transform 250ms

      &.mirror-y
        transform: scaleY(-1)

  div.label
    font-size: 1rem
    font-weight: 600
    margin-top: -0.75rem
</style>
