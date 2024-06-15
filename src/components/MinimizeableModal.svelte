<script lang="ts">
  import Icon from "./Menu/Icon.svelte";
  import Modal from "./Modal.svelte";

  export let title: string;
  export let position: "left" | "center" = "center";

  let open = true;

  const onClose = () => {
    open = false;
  };

  const onOpen = () => {
    open = true;
  };
</script>

{#if open}
  <Modal {title} {position} closeIcon="Minimize" on:close={onClose}>
    <slot />
  </Modal>
{/if}
<button class="minimized-modal {open ? '' : 'open'}" on:click={onOpen}>
  <Icon icon="OpenModal" />
  <span class="title">{title}</span>
</button>

<style lang="sass">
  .minimized-modal
    position: fixed
    bottom: -4rem
    right: 1.5rem
    z-index: 2

    appearance: none
    background: white
    border: 0px none
    border-radius: 0.25em
    cursor: pointer
    padding: 0.33em 0.66em 1.33rem 0.5em

    display: flex
    align-items: center
    gap: 0.25em
    font-size: 1rem

    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.75)

    transition: bottom 125ms, box-shadow 125ms, transform 125ms

    &.open
      bottom: -1rem

    &:hover
      transform: translateY(-0.15rem)

    &:active
      box-shadow: 0 -0.25rem 1rem rgba(0, 0, 0, 0.75)
      transform: translateY(0.1rem)

    &:focus-visible
      outline: 4px solid black
      outline-offset: 4px

    :global(svg)
      height: 1.5em
      vertical-align: top
      margin-right: 0.25em
</style>
