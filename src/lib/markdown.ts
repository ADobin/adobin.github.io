import { read } from 'to-vfile';
import { matter } from 'vfile-matter';
import extract from 'remark-extract-frontmatter';
import unified from 'unified';
import parse from 'remark-parse';
import gfm from 'remark-gfm';
import remark2rehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import frontmatter from 'remark-frontmatter';
import highlight from 'rehype-highlight';
import yaml from 'js-yaml';
import dayjs from 'dayjs';
import { assertMetadata, BlogPost } from '../routes/blog/[slug].json';

const parser = unified()
	.use(parse)
	.use(frontmatter, ['yaml'])
	.use(extract, { yaml: yaml.load })
	.use(gfm)
	.use(remark2rehype)
	.use(highlight)
	.use(rehypeStringify);

export async function process(fileName: string): Promise<BlogPost> {
	// const file = parser.parse(await read(filename));
	try {
		const file = await parser.process(await read(fileName));
		console.log(file);
		assertMetadata(file.data);
		// Format the date
		file.data.date = dayjs(file.data.date).format('MMM D, YYYY');
		// let metadata =  null;
		// if (tree.children.length > 0 && tree.children[0].type == 'yaml') {
		// 	metadata = yaml.load(tree.children[0].value);
		// 	tree.children = tree.children.slice(1, tree.children.length);
		// 	metadata.date = dayjs(metadata.date).format('MMM D, YYYY');
		// }
		// let content = runner.stringify(runner.runSync(tree));
		// if (!file.) {
		// 	metadata = {
		// 		title: 'Error!',
		// 		date: '?',
		// 		excerpt: 'Missing Frontmatter! Expected at least a title and a date!'
		// 	};
		// 	content = 'Missing Frontmatter! Expected at least a title and a date!';
		// }
		return { metadata: file.data, html: String(file.contents), fileName: file.basename };
	} catch (exception) {
		console.error(`Invalid blog post: ${fileName}`);
		console.error(exception);
		return;
	}
}
