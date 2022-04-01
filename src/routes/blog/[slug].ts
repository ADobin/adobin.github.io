import { loadPost } from './_posts';

/** @type {import('./[slug]').RequestHandler} */
export async function get({ params }) {
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
}
