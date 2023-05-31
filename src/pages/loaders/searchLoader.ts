import { LoaderFunctionArgs } from 'react-router';

export default async function searchLoader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const q = url.searchParams.get('q');
	return { q, url };
}

export type LoaderReturnType = typeof searchLoader;
