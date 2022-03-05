<script lang="ts">
	import type { BlogPost } from './blog/[slug]';
	export let posts: BlogPost[];
</script>

<svelte:head>
	<title>Blog - Alex Dobin</title>
</svelte:head>

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
