<script lang="ts">
	import { metadata } from '$lib/metadata';
	import { MetaTags } from 'svelte-meta-tags';
	import type { OpenGraph } from 'svelte-meta-tags';
	export let title: string;
	export let description: string;
	export let openGraph: OpenGraph | undefined = undefined;

	metadata.set({
		title: title,
		description: description
	});
</script>

<MetaTags
	title={$metadata.title}
	titleTemplate="%s | Alex Dobin"
	description={$metadata.description}
	{openGraph}
/>
