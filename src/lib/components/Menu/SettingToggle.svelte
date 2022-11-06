<script lang="ts">
  import { settings } from "$lib/stores";

  export let target: string;
  export let value: string;

  const { update } = settings;

  const noop = () => undefined;

  $: onClick = pressed
    ? noop
    : () => update((prev) => ({ ...prev, [target]: value }));
  $: pressed = $settings[target] === value;
</script>

<button
  aria-pressed={pressed ? "true" : "false"}
  class:pressed
  disabled={pressed}
  on:click={onClick}
>
  {value}
</button>

<style lang="sass">
  button
    appearance: none
    background: transparent
    border: none
    color: inherit
    padding: 0
    text-decoration: underline
    cursor: pointer

    &.pressed
      cursor: default
      text-decoration: none

    &:focus-visible
      outline: 3px solid black
      outline-offset: 2px
      border-radius: 0.125em
</style>
