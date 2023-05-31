import { useEffect, useRef, useState } from 'react';
import { Form, Outlet, useLoaderData } from 'react-router-dom';
import { getProteins } from 'src/api/uniprot';
import Header from 'src/components/header/Header';
import SearchResults from 'src/components/searchResultsTable/SearchResults';
import usePageTitle from 'src/utils/hooks/usePageTitle';
import { LoaderReturnType } from '../loaders/searchLoader';

export default function SearchPage() {
	const [searchValue, setSearchValue] = useState<string | null>(null);
	const [resultArr, setResultArr] = useState<{ results: Protein[] } | null>(
		null
	);
	const [totalResults, setTotalResults] = useState('0');
	const [link, setLink] = useState<string | undefined>(undefined);
	const [pageCounter, setPageCounter] = useState(1);

	const [displayError, setDisplayError] = useState(false);
	const [statusMessage, setStatusMessage] = useState('');
	const [showFilters, setShowFilters] = useState(false);

	//set page title
	usePageTitle();

	//filter click outside
	const filterPopupRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				filterPopupRef.current &&
				!filterPopupRef.current.contains(event.target as Node) &&
				event.target !== filterPopupRef.current
			) {
				setShowFilters(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	//search with url parameter
	const { q } = useLoaderData() as Awaited<ReturnType<LoaderReturnType>>;
	useEffect(() => {
		if (q && q !== '') {
			setSearchValue(q);
			searchHandler(q);
		}
	}, [q]);
	const searchHandler = async (q: string | null, nextLink?: string) => {
		setDisplayError(false);
		setStatusMessage('loading...');
		const searchString = q ?? '*';
		getProteins(searchString, nextLink)
			.then(({ result, headers }) => {
				if (nextLink) {
					setPageCounter(pageCounter + 1);
				}
				setResultArr(result);
				setTotalResults(
					headers.find(([key]) => key === 'x-total-results')?.[1] || '0'
				);
				setLink(headers.find(([key]) => key === 'link')?.[1].slice(1, -13));
				setStatusMessage('');
			})
			.catch((err) => {
				console.log(err);
				setDisplayError(true);
				setStatusMessage(err.message);
			});
	};
	return (
		<>
			<div className="min-h-[100vh] flex flex-col flex-nowrap">
				<Form
					className="flex items-center gap-4 pt-[78px] py-8 px-[10%]"
					onSubmit={() => searchHandler(searchValue)}
				>
					<input
						className="block flex-auto h-[48px] pl-4 rounded-xl border-2 border-slate-200"
						type="text"
						name="q"
						id="search"
						placeholder="Enter search value"
						onChange={(e) => setSearchValue(e.currentTarget.value)}
						value={searchValue || ''}
					/>
					<button
						type="submit"
						className="basis-1/6 bg-blue-100 rounded-xl  font-semibold"
					>
						Search
					</button>
					<button
						type="button"
						className={`bg-blue-100 aspect-square bg-center bg-no-repeat rounded-xl font-semibold ${
							showFilters ? 'bg-blue-500' : ''
						}`}
						onClick={() => setShowFilters(!showFilters)}
					>
						<svg
							className={` -translate-x-1 ${
								showFilters ? 'brightness-[105] saturate-100 invert-100' : ''
							}`}
							width="22"
							height="18"
							viewBox="0 0 22 18"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M7.2 10.8C8.87744 10.8 10.2869 11.9473 10.6866 13.5H20.7C21.197 13.5 21.6 13.903 21.6 14.4C21.6 14.8419 21.2816 15.2093 20.8618 15.2854L20.7 15.3L10.6861 15.3018C10.2858 16.8536 8.87679 18 7.2 18C5.52321 18 4.11417 16.8536 3.71389 15.3018L0.9 15.3C0.402948 15.3 0 14.897 0 14.4C0 13.9581 0.318384 13.5907 0.738216 13.5146L0.9 13.5H3.71342C4.11307 11.9473 5.52256 10.8 7.2 10.8ZM7.2 12.6C6.2059 12.6 5.4 13.4059 5.4 14.4C5.4 15.3941 6.2059 16.2 7.2 16.2C8.1941 16.2 9 15.3941 9 14.4C9 13.4059 8.1941 12.6 7.2 12.6ZM14.4 0C16.0774 0 17.487 1.14728 17.8866 2.69996L20.7 2.7C21.197 2.7 21.6 3.10295 21.6 3.6C21.6 4.04183 21.2816 4.4093 20.8618 4.48549L20.7 4.5L17.8861 4.50184C17.4859 6.05362 16.0769 7.2 14.4 7.2C12.7232 7.2 11.3142 6.05362 10.9139 4.50184L0.9 4.5C0.402948 4.5 0 4.09705 0 3.6C0 3.15817 0.318384 2.7907 0.738216 2.71451L0.9 2.7L10.9134 2.69996C11.3131 1.14728 12.7226 0 14.4 0ZM14.4 1.8C13.4059 1.8 12.6 2.6059 12.6 3.6C12.6 4.5941 13.4059 5.4 14.4 5.4C15.3941 5.4 16.2 4.5941 16.2 3.6C16.2 2.6059 15.3941 1.8 14.4 1.8Z"
								fill="#3C86F4"
							/>
						</svg>
					</button>
					{showFilters && (
						<div
							className="absolute mx-[10%] right-0 top-40 w-[400px] p-4 border-slate-100 border-2 bg-white rounded-xl text-black text-start"
							ref={filterPopupRef}
						>
							<h3>Filters</h3>
							<div className="my-8 flex flex-col gap-4">
								<label>
									<p className="font-semibold">Gene Name</p>
									<input
										className="w-full h-[48px] p-4 bg-slate-100 rounded-xl"
										type="text"
										name="geneName"
										id="geneName"
										placeholder="Enter Gene Name"
									/>
								</label>
								<label>
									<p className="font-semibold">Organism</p>
									<select
										className="w-full h-[48px] p-4 bg-slate-100 rounded-xl text-slate-400"
										name="organism"
										id="organism"
										defaultValue={'default'}
									>
										<option value="default" disabled>
											Select an option
										</option>
									</select>
								</label>
								<div>
									<p className="font-semibold">Sequence length</p>
									<div className="flex justify-between items-center gap-4">
										<input
											type="number"
											className="w-[40%] h-[48px] p-4 bg-slate-100 rounded-xl"
											name="minLength"
											id="minLength"
											placeholder="From"
										/>{' '}
										<div className="w-10 h-[2px] bg-slate-300 rounded-xl"></div>
										<input
											type="number"
											className="w-[40%] h-[48px] p-4 bg-slate-100 rounded-xl"
											name="maxLength"
											id="maxLength"
											placeholder="To"
										/>
									</div>
								</div>
								<label>
									<p className="font-semibold">Annotation Score</p>
									<select
										className="w-full h-[48px] p-4 bg-slate-100 rounded-xl text-slate-400"
										name="annotationScore"
										id="annotationScore"
										defaultValue={'default'}
									>
										<option value="default" disabled>
											Select an option
										</option>
									</select>
								</label>
								<label>
									<p className="font-semibold">Protein With</p>
									<input
										className="w-full h-[48px] p-4 bg-slate-100 rounded-xl"
										type="text"
										name="roteinWith"
										id="roteinWith"
										placeholder="Select"
									/>
								</label>
							</div>
							<div className="flex justify-between">
								<button
									className="basis-full"
									type="button"
									onClick={() => setShowFilters(false)}
								>
									Cancel
								</button>
								<button className="basis-full" disabled>
									Apply filters
								</button>
							</div>
						</div>
					)}
				</Form>
				{resultArr ? (
					<>
						<SearchResults
							results={resultArr.results}
							q={q as string}
							total={totalResults}
							page={pageCounter}
						/>
						<p className="text-center">
							{pageCounter + ' '}
							<span
								className="cursor-pointer hover:underline text-blue-500"
								onClick={() => {
									searchHandler(searchValue, link);
								}}
							>
								Next page
							</span>
						</p>
					</>
				) : (
					<div className="flex-1 flex items-center justify-center">
						<p className=" text-center text-slate-600">
							No data to display <br />
							Please start Search to display results
						</p>
					</div>
				)}
			</div>
			<Outlet />
			<Header>
				<p className={displayError ? `text-red-600` : ''}>{statusMessage}</p>
			</Header>
		</>
	);
}
