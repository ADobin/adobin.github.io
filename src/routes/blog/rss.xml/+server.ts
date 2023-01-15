import { create } from 'xmlbuilder2';
import { loadPosts, processBlogIndex } from '$lib/posts';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const doc = create();
	const rss = doc.ele('rss', {
		version: '2.0',
		'xmlns:atom': 'http://www.w3.org/2005/Atom'
	});
	const channel = rss.ele('channel');
	channel.ele('title').txt("Alex Dobin's blog");
	channel.ele('link').txt('https://alexdobin.com/blog');
	channel.ele('description').txt("Alex Dobin's tech and homelab blog");
	channel.ele('language').txt('en-us');
	channel.ele('atom:link', {
		href: 'https://alexdobin.com/blog/rss.xml',
		rel: 'self',
		type: 'application/rss+xml'
	});
	const blogPosts = await processBlogIndex(await loadPosts());

	blogPosts.forEach((post) => {
		const item = channel.ele('item');
		item.ele('title').txt(post.metadata.title);
		item.ele('link').txt(`https://alexdobin.com/blog/${post.metadata.slug}`);
		item.ele('pubDate').txt(post.metadata.utcDateString);
		item.ele('description').txt(post.metadata.description);
		item.ele('guid').txt(`https://alexdobin.com/blog/${post.metadata.slug}`);
	});

	return new Response(rss.toString().trim(), {
		headers: {
			'Content-Type': 'text/xml'
		},
		status: 200
	});
};
