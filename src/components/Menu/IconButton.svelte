<script lang="ts">
  import { randomString } from "../../utils/components";

  type IIconName = "Close" | "Help" | "Menu" | "Shuffle" | "Undo";
  const icons: { [key in IIconName]: { path: string } } = {
    Close: {
      path: "M 3 3 L 13 13 M 3 13 L 13 3",
    },
    Help: {
      path: "M 8 12 L 8 12 M 8 10 L 8 9 C 8 7 10 8 10 6 A 2 2 0 1 0 6 6 M 8 1.5 A 6.5 6.5 0 0 1 8 14.5 A 6.5 6.5 0 0 1 8 1.5",
    },
    Menu: {
      path: "M 2 4 L 14 4 M 2 8 L 14 8 M 2 12 L 14 12",
    },
    Shuffle: {
      path: "M 5 2 L 2 5 L 5 8 M 2 5 L 12 5 M 11 14 L 14 11 L 11 8 M 14 11 L 4 11",
    },
    Undo: {
      path: "M 5 3 L 2 6 L 5 9 M 2 6 L 10 6 A 3 3 0 1 1 10 13 L 8 13",
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
    <svg viewBox="0 0 16 16">
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

  div.label
    font-size: 1rem
    font-weight: 600
    margin-top: -0.75rem
</style>
