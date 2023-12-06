<script lang="ts">
  import Footer from "./components/Footer.svelte";
  import Menu from "./components/Menu/Menu.svelte";
  import { actions, settings } from "./stores";
  import Deck from "./views/Deck.svelte";
  import Pileon from "./views/Pileon";

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
    if (e.key === "F1" && $actions.help !== undefined) {
      $actions.help(e);
    }
  };
</script>

<Menu />
<svelte:component this={View} />
<svelte:body on:keydown={onKeyDown} />
<Footer />
