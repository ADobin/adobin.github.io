<script lang="ts">
	import type { PageData } from './$types';
	import 'highlight.js/styles/default.css';
	import dayjs from 'dayjs';
	import Title from '../../../components/Title.svelte';
	import { JsonLd } from 'svelte-meta-tags';
	import type { Article } from 'schema-dts';

	export let data: PageData;

	const article: Article = {
		'@type': 'Article',
		headline: data.post.metadata.title,
		description: data.post.metadata.description,
		author: {
			'@type': 'Person',
			name: 'Alex Dobin',
			worksFor: 'Microsoft'
		},
		datePublished: dayjs(data.post.metadata.date).toISOString(),
		dateModified: dayjs(data.post.metadata.date).toISOString(),
		publisher: {
			'@type': 'Person',
			name: 'Alex Dobin',
			worksFor: 'Microsoft'
		}
	};
</script>

<Title
	title={data.post.metadata.title}
	description={data.post.metadata.description}
	openGraph={{
		title: data.post.metadata.title,
		description: data.post.metadata.description,
		url: `https://alexdobin.dev/blog/${data.post.metadata.slug}`,
		type: 'article',
		article: {
			publishedTime: dayjs(data.post.metadata.date).toISOString(),
			modifiedTime: dayjs(data.post.metadata.date).toISOString(),
			section: 'Technology',
			tags: data.post.metadata.tags
		}
	}}
/>

<JsonLd schema={article} />

<section class="content">
	<h1>{data.post.metadata.title}</h1>
	<p class="published-date"
		>First published <time datetime={dayjs(data.post.metadata.date).format('YYYY-MM-DD')}
			>{data.post.metadata.dateDisplay}</time
		></p
	>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html data.post.html}
</section>

<style>
	.published-date {
		font-style: italic;
	}
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
