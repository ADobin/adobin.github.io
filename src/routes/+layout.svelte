<script lang="ts">
	import Nav from '../components/Nav.svelte';
	import { invalidateAll } from '$app/navigation';

	if (import.meta.hot) {
		import.meta.hot.on('content-update', () => {
			invalidateAll();
		});
	}
</script>

<Nav />

<main>
	<slot />
</main>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
