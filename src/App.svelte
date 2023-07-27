<script lang="ts">
  import Deck from "./views/Deck.svelte";
  import Pileon from "./views/Pileon.svelte";
  import Footer from "./components/Footer.svelte";
  import Menu from "./components/Menu/Menu.svelte";
  import { actions, settings } from "./stores";

  $: View = $settings.game === "deck" ? Deck : Pileon;

  // Handle global keyboard shortcuts, e.g. undo with ctrl+z.
  const onKeyDown = (e: KeyboardEvent) => {
    if (
      e.key === "z" &&
      (e.ctrlKey || e.metaKey) &&
      $actions.undo !== undefined
    ) {
      $actions.undo(e);
    }
  };
</script>

<Menu />
<svelte:component this={View} />
<svelte:body on:keydown={onKeyDown} />
<Footer />
