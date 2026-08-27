# alexdobin.com - personal blog

Welcome to my personal blog! I'm Alex Dobin, a software engineer and homelab enthusiast. I write about my experiences with technology, homelabbing, and other things that interest me. I hope you find something useful here!

## Tech stack
- [Eleventy](https://www.11ty.dev/)
- [GitHub pages](https://pages.github.com/)
- [GitHub Actions](https://docs.github.com/actions)

## Development
To run the site locally, you will need to have Node.js installed. You can then run the following commands to get started:

```bash
npm run serve
```

Posts live in `src/posts/` as Markdown files. Setting `draft: true` in a post's front matter keeps it visible locally with `npm run serve` but excludes it entirely (page and feed) from production builds.
