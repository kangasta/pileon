<script lang="ts">
  const getFromEnv = (key: string): string => {
    try {
      return import.meta.env[key] ?? "";
    } catch (_) {
      return "";
    }
  };

  const tag = getFromEnv("VITE_TAG");
  const commit = getFromEnv("VITE_COMMIT").slice(0, 8);
</script>

<footer>
  <a
    href="https://github.com/kangasta/pakka.git"
    target="_blank"
    rel="noreferrer"
  >
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
