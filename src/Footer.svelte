<script lang="ts">
	const getFromEnv = (key: string): string => {
		try {
			// @ts-ignore
			const { env } = process ?? {};
			const value = env[key] ?? "";
			return String(value);
		} catch (_) {
			return "";
		}
	};

	const tag = getFromEnv('TAG');
	const commit = getFromEnv('COMMIT').slice(0, 8);
</script>

<footer>
	<a href="https://github.com/kangasta/pakka.git" target="_blank">
		Source code
	</a>
	{#if commit || tag}
		<span>Version: {tag} {commit}</span>
	{/if}
</footer>

<style>
	a,
	span {
		margin-right: 0.5rem;
	}

	footer {
		font-size: 1rem;
		padding: 2rem 0 1rem 0;
		text-align: center;
	}
</style>
