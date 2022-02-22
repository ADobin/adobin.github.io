import type { RequestHandler } from '@sveltejs/kit';
import { loadPosts, processBlogIndex } from './_posts';

export const get: RequestHandler = async () => {
	return {
		body: {
			// Bug with how the type is returned from the map causing TypeScript
			// to throw errors about the format of body.
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			posts: (await processBlogIndex(await loadPosts())) as any
		}
	};
};
