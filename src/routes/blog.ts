import type { BlogPost } from '$lib/types';
import { loadPosts, processBlogIndex } from './blog/_posts';
import type { RequestHandler } from './__types/blog';

export const GET: RequestHandler<{ posts: BlogPost[] }> = async () => {
	return {
		status: 200,
		body: {
			posts: await processBlogIndex(await loadPosts())
		}
	};
};
