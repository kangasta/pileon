<script lang="ts">
  import * as focusTrap from "focus-trap";
  import { createEventDispatcher, onMount } from "svelte";

  import { randomString } from "../utils/components";

  import IconButton from "./Menu/IconButton.svelte";
  import type { IIconName } from "./Menu/icons";

  export let title: string;
  export let position: "left" | "center" = "center";
  export let closeIcon: IIconName = "Close";

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

  let windowControlsOnLeft =
    (navigator as any).windowControlsOverlay?.visible &&
    (navigator as any).windowControlsOverlay?.getTitlebarAreaRect().left > 0;
</script>

<div class="backdrop" class:open />
<div
  class="modal {position} {windowControlsOnLeft
    ? 'window-controls-on-left'
    : ''}"
  class:open
  role="dialog"
  aria-labelledby={titleId}
  {id}
>
  <div class="header">
    <h2 id={titleId}>{title}</h2>
    <IconButton icon={closeIcon} label="Close" onClick={onClose} />
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

      max-height: 90%
      width: 500px
      max-width: 100%

      padding: 0 1em 2em

      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.75)

      opacity: 0
      transform: translate(-50%, -25%) scale(0.25)
      transition: opacity 125ms, transform 125ms

      &.open
        opacity: 1
        transform: translate(-50%, -50%) scale(1)

      @media (min-width: 501px)
        border-radius: 0.25em

    &.left
      top: -2vh
      left: 0

      height: 104vh
      max-width: 95%

      .content
        flex: 1

      padding: 2vh 1em

      box-shadow: 0.5rem 0 1rem rgba(0, 0, 0, 0.75)

      opacity: 0
      transform: translateX(-50%)
      transition: opacity 125ms, transform 125ms

      &.open
        opacity: 1
        transform: translateX(0)

      &.window-controls-on-left
        @media (display-mode: window-controls-overlay)
          border-radius: 0 0.25em 0 0
          height: calc(102vh - env(titlebar-area-height) - 1rem)
          padding: 0 1em 2vh
          top: calc(env(titlebar-area-height) + 1rem)

    background: white
    z-index: 6

    font-size: 1rem
    overflow: hidden

    box-sizing: border-box

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
