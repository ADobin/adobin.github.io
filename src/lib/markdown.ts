import extract from 'remark-extract-frontmatter';
import { unified } from 'unified';
import parse from 'remark-parse';
import gfm from 'remark-gfm';
import remark2rehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import frontmatter from 'remark-frontmatter';
import highlight from 'rehype-highlight';
import yaml from 'js-yaml';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import codeTitle from 'rehype-code-titles';
import { readFile } from 'fs/promises';
import { basename } from 'path';
import type { BlogPost } from '$lib/types';

function assertMetadata(metadata: unknown): asserts metadata is BlogPost['metadata'] {
	if (
		typeof metadata === 'object' &&
		typeof metadata['title'] === 'string' &&
		typeof metadata['date'] === 'string' &&
		typeof metadata['draft'] === 'boolean' &&
		typeof metadata['description'] === 'string' &&
		Array.isArray(metadata['tags'])
	) {
		return;
	}

	throw new Error('Blog post metadata is invalid');
}

const parser = unified()
	.use(parse)
	.use(frontmatter, ['yaml'])
	.use(extract, { yaml: yaml.load })
	.use(gfm)
	.use(remark2rehype)
	.use(codeTitle)
	.use(highlight)
	.use(rehypeStringify);

export async function process(fileName: string): Promise<BlogPost> {
	try {
		dayjs.extend(utc);
		const file = await parser.process(await readFile(fileName, 'utf-8'));
		assertMetadata(file.data);
		// Format the date
		file.data.dateDisplay = dayjs(file.data.date).format('MMM D, YYYY');
		file.data.utcDateString = dayjs(file.data.date).utc().toDate().toUTCString();
		// Add the slug information into the metadata
		file.data.slug = basename(fileName).slice(0, -3);
		return {
			metadata: file.data,
			html: String(file),
			fileName: fileName,
			slug: file.data.slug.slice(0, -3)
		};
	} catch (exception) {
		console.error(`Invalid blog post: ${fileName}`);
		console.error(exception);
		throw exception;
	}
}
