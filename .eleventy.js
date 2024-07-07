import pluginWebc from "@11ty/eleventy-plugin-webc";
import { EleventyRenderPlugin, InputPathToUrlTransformPlugin } from "@11ty/eleventy";
import { VentoPlugin } from 'eleventy-plugin-vento';
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight"

export default function (eleventyConfig) {
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

	eleventyConfig.addPassthroughCopy({ static: "/" });
}

export const config = {
	dir: {
		input: "src"
	},
};
