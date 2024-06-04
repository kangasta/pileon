<script lang="ts">
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const tag = import.meta.env.VITE_TAG ?? "";
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const commit = (import.meta.env.VITE_COMMIT ?? "").slice(0, 8);
</script>

<footer>
  <a href="https://github.com/kangasta/pileon.git" target="_blank">
    kangasta / pileon
  </a>
  {#if commit || tag}
    <span>at {tag} {commit}</span>
  {/if}
</footer>

<style>
  footer {
    font-size: 1rem;
    padding: 1rem 0 0.5rem;
    text-align: center;
  }
</style>
