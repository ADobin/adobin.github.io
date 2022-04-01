import { loadPosts, processBlogIndex } from './blog/_posts';

/** @type {import('./blog').RequestHandler} */
export async function get() {
	return {
		status: 200,
		body: {
			posts: await processBlogIndex(await loadPosts())
		}
	};
}
