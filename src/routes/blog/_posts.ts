// This file is called `_posts.ts` rather than `posts.ts`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells SvelteKit not to do that.
import { basename } from 'path';
import { process } from '$lib/markdown';
import type { BlogPost } from './[slug].json';
import dayjs from 'dayjs';
import { dev } from '$app/env';

const blogPosts = loadPosts();
const blogIndex = processBlogIndex();

async function loadPosts() {
	const postMap = new Map<string, BlogPost>();
	await Promise.all(
		// Use `import.meta.glob` here to support HMR while writing blog posts
		Object.keys(import.meta.glob('/src/posts/*.md')).map(async (fileName) => {
			const post = await process(`src/posts/${basename(fileName)}`);
			postMap.set(post.fileName.slice(0, -3), post);
		})
	);
	return postMap;
}

async function processBlogIndex() {
	const posts = (await blogPosts).values();
	return Array.from(posts)
		.sort(
			(a, b) =>
				dayjs(a.metadata.date, 'MMM D, YYYY').unix() - dayjs(b.metadata.date, 'MMM D, YYYY').unix()
		)
		.filter((post) => dev || !post.metadata.draft);
}
export { blogPosts, blogIndex };
