import { error } from '@sveltejs/kit';
import { loadPost } from '$lib/posts';
import type { PageServerLoad } from './$types';

export const csr = false;

export const load: PageServerLoad = async ({ params }) => {
	// the `slug` parameter is available because
	// this file is called [slug].ts
	const { slug } = params;
	try {
		const post = await loadPost(slug);

		return {
			post
		};
	} catch (err) {
		throw error(404, 'Post not found');
	}
};
