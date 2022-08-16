import { loadPosts, processBlogIndex } from '$lib/posts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		posts: (await processBlogIndex(await loadPosts())).map((post) => post.metadata)
	};
};
