import pluginWebc from "@11ty/eleventy-plugin-webc";
import { EleventyRenderPlugin, InputPathToUrlTransformPlugin } from "@11ty/eleventy";
import { VentoPlugin } from 'eleventy-plugin-vento';
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";

import site from "./src/_data/site.json" with { type: "json" };

// Front matter dates like `date: 2023-01-08` are parsed as midnight UTC, so they
// must also be formatted in UTC or they render a day early in western time zones.
// See https://www.11ty.dev/docs/dates/#dates-off-by-one-day
const readableDateFormatter = new Intl.DateTimeFormat("en-US", {
	dateStyle: "long",
	timeZone: "UTC",
});

function toDate(value) {
	return value instanceof Date ? value : new Date(value);
}

export default function (eleventyConfig) {
	// Drafts are skipped entirely (no page, no feed entry) in production builds
	// but still render locally with `--serve`/`--watch` for previewing.
	// See https://www.11ty.dev/docs/quicktips/draft-posts/
	eleventyConfig.addPreprocessor("drafts", "*", (data) => {
		if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
			return false;
		}
	});

	eleventyConfig.addFilter("readableDate", (value) => readableDateFormatter.format(toDate(value)));
	eleventyConfig.addFilter("isoDate", (value) => toDate(value).toISOString().slice(0, 10));
	eleventyConfig.addFilter("siteUrl", (path) => new URL(path, site.url).href);

	eleventyConfig.addPlugin(EleventyRenderPlugin);
	eleventyConfig.addPlugin(pluginWebc, {
		// Glob to find no-import global components
		// This path is relative to the project-root!
		components: "src/_components/**/*.webc",
	});
	eleventyConfig.addPlugin(VentoPlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// which file extensions to process
		extensions: "html",

		// Add any other Image utility options here:

		// optional, output image formats
		formats: ["webp", "jpeg"],
		// formats: ["auto"],

		// optional, output image widths
		// widths: ["auto"],

		// optional, attributes assigned on <img> override these values.
		defaultAttributes: {
			loading: "lazy",
			decoding: "async",
		},
	});
	eleventyConfig.addPlugin(syntaxHighlight);
	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom", // or "rss", "json"
		outputPath: "/feed.xml",
		collection: {
			name: "posts", // iterate over `collections.posts`
			limit: 10,     // 0 means no limit
		},
		metadata: {
			language: site.language,
			title: site.feedTitle,
			subtitle: site.description,
			base: site.url,
			author: {
				name: site.author,
				email: "rssfeedback@dobin.dev", // Optional
			}
		}
	});

	eleventyConfig.addPassthroughCopy({ static: "/" });
}

export const config = {
	dir: {
		input: "src"
	},
};
