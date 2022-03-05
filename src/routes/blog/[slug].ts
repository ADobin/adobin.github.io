import { loadPost } from './_posts';

export interface BlogPost {
	metadata: {
		title: string;
		date: string;
		draft: boolean;
		description: string;
		tags: string[];
	};
	html: string;
	fileName: string;
	slug: string;
}

/** @type {import('./[slug]').RequestHandler} */
export async function get({ params }) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
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
