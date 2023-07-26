<script lang="ts">
  // @ts-ignore
  const tag = import.meta.env.VITE_TAG ?? "";
  // @ts-ignore
  const commit = (import.meta.env.VITE_COMMIT ?? "").slice(0, 8);
</script>

<footer>
  <a href="https://github.com/kangasta/pakka.git" target="_blank">
    kangasta / pakka
  </a>
  {#if commit || tag}
    <span>at {tag} {commit}</span>
  {/if}
</footer>

<style>
  footer {
    font-size: 1rem;
    padding: 2rem 0 1rem 0;
    text-align: center;
  }
</style>
