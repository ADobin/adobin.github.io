// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells SvelteKit not to do that.
import { readdir } from 'fs/promises';
import { process } from '$lib/markdown';
import type { BlogPost } from './[slug].json';
import dayjs from 'dayjs';
import { variables } from '$lib/variables';
const blogPosts = loadPosts();
const blogIndex = processBlogIndex();

async function loadPosts() {
	const postMap = new Map<string, BlogPost>();
	await Promise.all(
		(
			await readdir('src/posts')
		)
			.filter((fileName) => /.+\.md$/.test(fileName))
			.map(async (fileName) => {
				const post = await process(`src/posts/${fileName}`);
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
		.filter((post) => variables.dev || !post.metadata.draft);
}
export { blogPosts, blogIndex };
