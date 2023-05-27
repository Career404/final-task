import Header from 'src/components/header/Header';
import SearchResults from 'src/components/searchResults/SearchResults';

export default function SearchPage() {
	/*
Search Input and Search Button
Filters
Search Results */

	return (
		<>
			<form className="flex items-center gap-4 pt-[78px] py-8 px-[10%]">
				<input
					className="block flex-auto h-[48px] pl-4 rounded-xl border-2 border-slate-200"
					type="text"
					name="search"
					id="search"
					placeholder="Enter search value"
				/>
				<button
					type="submit"
					className="basis-1/6 rounded-xl bg-blue-50  font-semibold"
				>
					Search
				</button>
				<button type="submit" className=" rounded-xl bg-blue-50 font-semibold">
					Sort
				</button>
			</form>
			<SearchResults />
			<Header />
		</>
	);
}
