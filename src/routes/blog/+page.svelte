<script lang="ts">
	import { resolveRoute } from '$app/paths';
	import type { PageData } from './$types';
	import dayjs from 'dayjs';
	import Title from '../../components/Title.svelte';
	export let data: PageData;
</script>

<Title title="Blog" description="A collection of my blog posts" />

<div class="header">
	<h1>Recent posts</h1>
	<a href="blog/rss.xml"><img class="mark" src="rss.png" alt="rss" /></a>
</div>

<ul>
	{#each data.posts as post}
		<li
			><a href={resolveRoute('/blog/[slug]', { slug: post.slug })}>{post.title}</a><br />
			<time datetime={dayjs(post.date).format('YYYY-MM-DD')}>{post.dateDisplay}</time><div
				>{post.description}</div
			></li
		>
	{/each}
</ul>

<style>
	time {
		font-style: italic;
	}

	ul {
		list-style-type: square;
	}

	.header {
		display: flex;
		justify-content: space-between;
	}

	.mark {
		width: 32px;
		height: 32px;
		opacity: 50%;
	}
</style>
