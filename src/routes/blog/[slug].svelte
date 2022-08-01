<script type="ts">
	import type { BlogPost } from '$lib/types';
	import { metadata } from '$lib/metadata';
	import 'highlight.js/styles/default.css';
	export let post: BlogPost;

	metadata.set({
		title: post.metadata.title,
		description: post.metadata.description
	});
</script>

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

	.content :global(ul) {
		line-height: 1.5;
	}

	.content :global(li) {
		margin: 0 0 0.5em 0;
	}

	.content :global(.rehype-code-title::before) {
		content: '📁 ';
	}

	.content :global(.rehype-code-title) {
		padding: 0.5em 1em 0.5em 1em;
		margin-bottom: 0.1em;
		background: #f3f3f3;
		color: #444;
		font-weight: bold;
	}

	:global(.content .rehype-code-title + pre) {
		padding-top: 0.1em;
		margin-top: 0px;
	}
</style>
