<script lang="ts">
	import type { BlogPost } from '$lib/types';
	import { metadata } from '$lib/metadata';
	export let posts: BlogPost[];

	metadata.set({
		title: 'Blog',
		description: 'A collection of my blog posts.'
	});
</script>

<h1>Recent posts</h1>

<ul>
	<!-- {@debug posts} -->
	{#each posts as post}
		<li
			><a href="blog/{post.slug}">{post.metadata.title}</a><div class="date"
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
