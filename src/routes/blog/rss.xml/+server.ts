import { create } from 'xmlbuilder2';
import { loadPosts, processBlogIndex } from '$lib/posts';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const rss = create({
		rss: {
			'@version': '2.0',
			channel: {
				title: "Alex Dobin's blog",
				link: 'https://alexdobin.com/blog',
				description: "Alex Dobin's tech and homelab blog"
			}
		}
	});

	const blogPosts = await processBlogIndex(await loadPosts());

	blogPosts.forEach((post) => {
		const item = rss.first().ele('item');
		item.ele('title').txt(post.metadata.title);
		item.ele('link').txt(`https://alexdobin.com/blog/${post.metadata.slug}`);
		item.ele('pubDate').txt(post.metadata.date);
		item.ele('description').txt(post.metadata.description);
	});

	return new Response(rss.toString().trim(), {
		headers: {
			'Content-Type': 'text/xml'
		},
		status: 200
	});
};
