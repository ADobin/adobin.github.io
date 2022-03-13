<script lang="ts">
	import Nav from '../components/Nav.svelte';
	import { invalidate } from '$app/navigation';
	import { MetaTags } from 'svelte-meta-tags';
	import { metadata } from '$lib/metadata';

	if (import.meta.hot) {
		import.meta.hot.on('content-update', (data) => {
			invalidate('/blog/blog.json');
			invalidate('/blog');
			invalidate(`/blog/${data.id}.json`);
			invalidate(`/blog/${data.id}`);
		});
	}
</script>

<MetaTags title={`${$metadata.title} | Alex Dobin`} description={$metadata.description} />

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
