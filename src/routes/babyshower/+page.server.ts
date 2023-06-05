import { redirect } from '@sveltejs/kit';

export function load() {
	throw redirect(
		301,
		'https://mobilizon.alexdobin.com/events/7091304d-56dd-4f8d-9f5f-0c21b8482b6d'
	);
}
