<script lang="ts">
  import * as focusTrap from "focus-trap";
  import { createEventDispatcher, onMount } from "svelte";
  import IconButton from "./Menu/IconButton.svelte";
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
  <div class="header">
    <h2>{title}</h2>
    <IconButton icon="Close" label="Close" onClick={onClose} />
  </div>
  <slot />
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
    padding: 0 0.75em 2em

    box-sizing: border-box
    width: 400px
    max-width: 100%

    box-shadow: 0 2.5px 5px rgba(0, 0, 0, 0.333)

    @media (min-width: 400px)
      border-radius: 0.25em

    .header
      display: flex
      align-items: center

    h2
      flex: 1
      font-size: 1.5em
      margin: 1em 0
</style>
