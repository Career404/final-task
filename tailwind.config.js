/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.tsx'],
	theme: {
		extend: {
			colors: {
				'--black': '#2b2b2b',
				'--blue': '#175bc0',
				'--gray': '#f5f5f5',
			},
		},
	},
	plugins: [],
};
