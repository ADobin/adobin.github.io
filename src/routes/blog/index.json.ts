import type { RequestHandler } from '@sveltejs/kit';
import { blogIndex } from './_posts';

export const get: RequestHandler = async () => {
	return {
		body: {
			posts: await blogIndex
		}
	};
};
