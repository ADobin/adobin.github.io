<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const resp = await fetch(`blog.json`);

		if (!resp.ok) {
			const message = await resp.json();
			return {
				error: new Error(message)
			};
		}

		const posts = (await resp.json()).posts;
		return {
			props: {
				posts
			}
		};
	};
</script>

<script lang="ts">
	type Post = {
		slug: string;
		title: string;
	};
	export let posts: Post[];
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<h1>Recent posts</h1>

<ul>
	{#each posts as post}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li><a rel="prefetch" href="/blog/{post.slug}">{post.title}</a></li>
	{/each}
</ul>

<style></style>
