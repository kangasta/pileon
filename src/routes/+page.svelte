<script lang="ts">
  import { onMount } from "svelte";
  import { settings } from "$lib/stores";

  onMount(() => {
    window.location.replace(`/${$settings.game}`);
  });
</script>
