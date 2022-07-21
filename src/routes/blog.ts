import { loadPosts, processBlogIndex } from './blog/_posts';

/** @type {import('./blog').RequestHandler} */
export async function GET() {
	return {
		status: 200,
		body: {
			posts: await processBlogIndex(await loadPosts())
		}
	};
}
