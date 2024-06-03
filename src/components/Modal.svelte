<script lang="ts">
  import * as focusTrap from "focus-trap";
  import { createEventDispatcher, onMount } from "svelte";

  import { randomString } from "../utils/components";

  import IconButton from "./Menu/IconButton.svelte";

  export let title: string;

  const id = `modal-${randomString()}`;
  const titleId = `${id}-title`;

  let open = false;
  onMount(() => {
    const trap = focusTrap.createFocusTrap(`#${id}`, {
      clickOutsideDeactivates: true,
      onDeactivate: () => onClose(),
    });
    trap.activate();
    const bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      open = true;
    }, 0);

    return () => {
      trap.deactivate();
      document.body.style.overflow = bodyOverflow;
    };
  });

  const dispatch = createEventDispatcher();
  const onClose = () => {
    open = false;
    setTimeout(() => dispatch("close"), 125);
  };
</script>

<div class="backdrop" class:open />
<div
  class="modal {position}"
  class:open
  role="dialog"
  aria-labelledby={titleId}
  {id}
>
  <div class="header">
    <h2 id={titleId}>{title}</h2>
    <IconButton icon="Close" label="Close" onClick={onClose} />
  </div>
  <div class="content">
    <slot />
  </div>
</div>

<style lang="sass">
  .backdrop
    position: fixed
    top: 0
    left: 0

    height: 100vh
    width: 100vw

    z-index: 4

    backdrop-filter: none
    transition: backdrop-filter 125ms

    &.open
      backdrop-filter: blur(4px)

  .modal
    display: flex
    flex-direction: column

    position: fixed

    &.center
      top: 50%
      left: 50%

      opacity: 0
      transform: translate(-50%, -25%) scale(0.25)
      transition: opacity 125ms, transform 125ms

      &.open
        opacity: 1
        transform: translate(-50%, -50%) scale(1)

    background: white
    z-index: 4

    font-size: 1rem
    padding: 0 1em 2em
    overflow: hidden

    box-sizing: border-box
    max-height: 90%
    width: 500px
    max-width: 100%

    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.75)

    @media (min-width: 501px)
      border-radius: 0.25em

    .header
      display: flex
      align-items: center

    .content
      overflow: auto

    h2
      flex: 1
      font-size: 1.5em
      margin: 1em 0
</style>
