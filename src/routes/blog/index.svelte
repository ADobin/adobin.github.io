<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { BlogPost } from './[slug].json';

	export const load: Load = async ({ fetch }) => {
		const resp = await fetch(`blog.json`);

		if (!resp.ok) {
			const message = await resp.json();
			return {
				error: new Error(message)
			};
		}

		const posts: BlogPost[] = (await resp.json()).posts;
		return {
			props: {
				posts
			}
		};
	};
</script>

<script lang="ts">
	export let posts: BlogPost[];
</script>

<svelte:head>
	<title>Blog - Alex Dobin</title>
</svelte:head>

<h1>Recent posts</h1>

<ul>
	<!-- {@debug posts} -->
	{#each posts as post}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li
			><a rel="prefetch" href="/blog/{post.slug}">{post.metadata.title}</a><div class="date"
				>{post.metadata.date}</div
			><div>{post.metadata.description}</div></li
		>
	{/each}
</ul>

<style>
	.date {
		font-style: italic;
	}

	ul {
		list-style-type: square;
	}
</style>
