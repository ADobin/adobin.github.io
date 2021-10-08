import type { RequestHandler } from '@sveltejs/kit';
import posts from './_posts';

const lookup = new Map();
posts.forEach((post) => {
	lookup.set(post.slug, post);
});

export const get: RequestHandler = async ({ params }) => {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = params;

	if (lookup.has(slug)) {
		return {
			body: {
				post: lookup.get(slug)
			}
		};
	} else {
		return {
			status: 404,
			body: {
				message: 'Not found'
			}
		};
	}
};
