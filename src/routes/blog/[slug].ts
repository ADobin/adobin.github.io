import { loadPost } from './_posts';
import type { BlogPost } from '$lib/types';
import type { RequestHandler } from './__types/[slug]';

export const GET: RequestHandler<{ post?: BlogPost }> = async ({ params }) => {
	// the `slug` parameter is available because
	// this file is called [slug].ts
	const { slug } = params;
	try {
		const post = await loadPost(slug);

		return {
			body: {
				post
			}
		};
	} catch (err) {
		return {
			status: 404,
			body: {
				message: 'Not found'
			}
		};
	}
};
