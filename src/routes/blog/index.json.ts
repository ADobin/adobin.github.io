import type { RequestHandler } from '@sveltejs/kit';
import posts from './_posts';

const contents = posts.map((post) => {
	return {
		title: post.title,
		slug: post.slug
	};
});

export const get: RequestHandler = async () => {
	return {
		body: {
			posts: contents
		}
	};
};
