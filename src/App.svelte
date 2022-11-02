<script lang="ts">
  import Deck from "./views/Deck.svelte";
  import Pileon from "./views/Pileon.svelte";
  import Footer from "./components/Footer.svelte";
  import Menu from "./components/Menu/Menu.svelte";
  import { settings } from "./stores";

  $: View = $settings.game === "pileon" ? Pileon : Deck;
</script>

<Menu />
<svelte:component this={View} />
<Footer />
