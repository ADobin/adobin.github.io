import { readdir } from 'fs/promises';
import { extname } from 'path';
import { process } from '$lib/markdown';
import dayjs from 'dayjs';
import { dev } from '$app/environment';
import type { BlogPost } from '$lib/types';

async function loadPosts(): Promise<Map<string, BlogPost>> {
	const postMap = new Map<string, BlogPost>();
	await Promise.all(
		(await readdir('src/posts'))
			.filter((fileName) => /.+\.md$/.test(fileName))
			.map(async (fileName) => {
				const post = await loadPost(fileName);
				postMap.set(post.fileName.slice(0, -3), post);
			})
	);
	return postMap;
}

function loadPost(fileName: string): Promise<BlogPost> {
	if (extname(fileName) !== '.md') {
		fileName += '.md';
	}

	return process(`src/posts/${fileName}`);
}

async function processBlogIndex(posts: Map<string, BlogPost>): Promise<BlogPost[]> {
	const postList = posts.values();
	return Array.from(postList)
		.sort((a, b) => dayjs(b.metadata.date).unix() - dayjs(a.metadata.date).unix())
		.filter((post) => dev || !post.metadata.draft);
}

export { loadPosts, loadPost, processBlogIndex };
