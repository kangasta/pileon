<script lang="ts">
  import { onMount } from "svelte";
  import { pwaInfo } from "virtual:pwa-info";

  import Footer from "$lib/components/Footer.svelte";
  import Menu from "$lib/components/Menu/Menu.svelte";

  onMount(async () => {
    if (pwaInfo) {
      const { registerSW } = await import("virtual:pwa-register");
      registerSW({
        immediate: true,
      });
    }
  });
</script>

<div class="layout">
  <Menu />
  <slot />
  <Footer />
</div>

<style lang="sass">
  .layout
    display: flex
    min-height: 100vh
    flex-direction: column
</style>
