import vfile from 'to-vfile';
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
	try {
		const file = await parser.process(await vfile.read(fileName));
		assertMetadata(file.data);
		// Format the date
		file.data.date = dayjs(file.data.date).format('MMM D, YYYY');
		return { metadata: file.data, html: String(file.contents), fileName: file.basename };
	} catch (exception) {
		console.error(`Invalid blog post: ${fileName}`);
		console.error(exception);
		return;
	}
}
