<script lang="ts">
  import * as focusTrap from "focus-trap";
  import { createEventDispatcher, onMount } from "svelte";
  import { randomString } from "../utils/components";

  export let title: string;

  const id = `modal-${randomString()}`;

  onMount(() => {
    const trap = focusTrap.createFocusTrap(`#${id}`, {
      clickOutsideDeactivates: true,
      onDeactivate: () => onClose(),
    });
    trap.activate();

    return () => {
      trap.deactivate();
    };
  });

  const dispatch = createEventDispatcher();
  const onClose = () => {
    dispatch("close");
  };
</script>

<div class="backdrop" />
<div class="modal" {id}>
  <h2>{title}</h2>
  <slot />
  <div class="actions">
    <button on:click={onClose} type="button">OK</button>
  </div>
</div>

<style lang="sass">
  .backdrop
    position: fixed
    top: 0
    left: 0

    height: 100vh
    width: 100vw

    background: black
    opacity: 0.5
    z-index: 4

  .modal
    position: fixed
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)

    background: white
    z-index: 4

    font-size: 1rem
    padding: 0.75em

    box-sizing: border-box
    width: 400px
    max-width: 100%

    box-shadow: 0 2.5px 5px rgba(0, 0, 0, 0.333)

    @media (min-width: 400px)
      border-radius: 0.25em

    h2
      margin: 0.75em 0 1.5em
      font-size: 1.5em

    .actions
      margin: 1.5em 0 1em
      text-align: right
</style>
