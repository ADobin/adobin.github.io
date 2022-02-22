<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { BlogPost } from './[slug].json';

	export const load: Load = async ({ params, fetch }) => {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await fetch(`${params.slug}.json`);
		const data: { post: BlogPost; message?: string } = await res.json();

		if (res.status === 200) {
			return { props: { post: data.post } };
		} else {
			return { error: new Error(data.message), status: 404 };
		}
	};
</script>

<script type="ts">
	export let post: BlogPost;
</script>

<svelte:head>
	<title>{post.metadata.title}</title>
</svelte:head>

<div class="content">
	{@html post.html}
</div>

<style>
	/*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
	.content :global(h2) {
		font-size: 1.4em;
		font-weight: 500;
	}

	.content :global(pre) {
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
	}

	.content :global(pre) :global(code) {
		background-color: transparent;
		padding: 0;
	}

	.content :global(ul) {
		line-height: 1.5;
	}

	.content :global(li) {
		margin: 0 0 0.5em 0;
	}
</style>
