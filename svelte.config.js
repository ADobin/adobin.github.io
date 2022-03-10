import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readdirSync } from 'fs';

const directoryName = dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		serviceWorker: { register: false },
		prerender: { default: true },

		// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
		vite: () => ({

			plugins: [
				{
					name: 'watch-content',
					configureServer(server) {
						// Directory paths and glob patterns do not seem work here
						// Instead we will read the files from the directory
						// and watch each of them individually
						const posts = readdirSync(join(directoryName, 'src', 'posts'));
						server.watcher.add(posts);
					},
					handleHotUpdate(ctx) {
						const m = /src\/(posts)\/(.*)\.(md)$/.exec(ctx.file);
						if (m) {
							const id = m[2];
							const contentType = 'blog';

							ctx.server.ws.send({
								type: 'custom',
								event: 'content-update',
								data: {
									type: contentType,
									id,
								},
							});

							// Return an empty module list since we
							// handled it manually.
							return [];
						}

						// Not an event we care about, so just do
						// the default behavior.
						return ctx.modules;
					},
				},
			]
		}),
	}
};

export default config;
