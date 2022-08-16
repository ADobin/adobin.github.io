<script lang="ts">
	import type { PageData } from './$types';
	import dayjs from 'dayjs';
	import Title from '../../components/Title.svelte';
	export let data: PageData;
</script>

<Title title="Blog" description="A collection of my blog posts" />

<h1>Recent posts</h1>

<ul>
	{#each data.posts as post}
		<li
			><a href="blog/{post.slug}">{post.title}</a><br />
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
</style>
