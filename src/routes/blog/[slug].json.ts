import type { RequestHandler } from '@sveltejs/kit';
import { blogPosts } from './_posts';

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
}

export function assertMetadata(metadata: any): asserts metadata is BlogPost['metadata'] {
	if (
		typeof metadata === 'object' &&
		typeof metadata.title === 'string' &&
		typeof metadata.date === 'string' &&
		typeof metadata.draft === 'boolean' &&
		typeof metadata.description === 'string' &&
		Array.isArray(metadata.tags)
	) {
		return;
	}

	throw new Error('Blog post metadata is invalid');
}

export const get: RequestHandler = async ({ params }) => {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = params;
	const posts = await blogPosts;

	if (posts.has(slug)) {
		return {
			body: {
				// Bug with how the type is returned from the map causing TypeScript
				// to throw errors about the format of body.
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				post: posts.get(slug) as any
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
