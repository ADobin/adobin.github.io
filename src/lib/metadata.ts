import { writable, type get, type Writable } from 'svelte/store';

export const metadata = writable({
	title: '',
	description: ''
});

type metadataType<T> = T extends Writable<infer U> ? U : never;

export function isDefaultMetadata(data: metadataType<typeof metadata>) {
	return data.title === '' && data.description === '';
}
