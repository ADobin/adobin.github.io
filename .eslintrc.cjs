module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'plugin:prettier/recommended'
	],
	ignorePatterns: ['*.cjs'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2019,
		project: './tsconfig.eslint.json',
		extraFileExtensions: ['.svelte'] // This is a required setting in `@typescript-eslint/parser` v4.24.0.
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: {
					// Specify a parser for each lang.
					ts: '@typescript-eslint/parser',
					js: 'espree',
					typescript: '@typescript-eslint/parser'
				}
			}
		}
	],
	rules: {
		'prettier/prettier': ['error', { endOfLine: 'auto' }]
	},
	// settings: {
	// 	'svelte3/typescript': () => require('typescript')
	// },
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
