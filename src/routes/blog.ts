import { loadPosts, processBlogIndex } from './blog/_posts';

/** @type {import('./blog').RequestHandler} */
export async function get() {
	return {
		status: 200,
		body: {
			// Bug with how the type is returned from the map causing TypeScript
			// to throw errors about the format of body.
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			posts: await processBlogIndex(await loadPosts())
		}
	};
}
