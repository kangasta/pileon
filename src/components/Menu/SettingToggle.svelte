<script lang="ts">
  import { settings, type ISettings } from "../../stores";

  export let target: keyof ISettings;
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
  <slot>{value}</slot>
</button>

<style lang="sass">
  button
    appearance: none
    background: transparent
    border: none
    color: inherit
    font: inherit
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
