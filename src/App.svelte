<script lang="ts">
  import Deck from "./views/Deck.svelte";
  import Pileon from "./views/Pileon.svelte";
  import Footer from "./components/Footer.svelte";
  import Menu from "./components/Menu/Menu.svelte";

  const View = location.hash.toLowerCase() === "#pileon" ? Pileon : Deck;
</script>

<Menu />
<View />
<Footer />
