import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function usePageTitle() {
	const location = useLocation();
	let title = location.pathname.slice(1);
	title = title.charAt(0).toUpperCase() + title.slice(1);
	let searchString = location.search.slice(3).replaceAll('+', ' ');
	useEffect(() => {
		document.title = title + ' ' + searchString;
	}, [location]);

	return [title, searchString];
}
