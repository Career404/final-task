import { useEffect, useRef, useState } from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import { getProteins } from 'src/api/uniprot';
import Header from 'src/components/header/Header';
import SearchResults from 'src/components/searchResultsTable/SearchResults';
import { LoaderReturnType } from '../loaders/searchLoader';
import filterIcon from 'src/assets/options.svg';

export default function SearchPage() {
	const [searchValue, setSearchValue] = useState('');
	const [resultArr, setResultArr] = useState<{ results: Protein[] } | null>(
		null
	);
	const [totalResults, setTotalResults] = useState('0');
	const [link, setLink] = useState<string | undefined>(undefined);
	const [pageCounter, setPageCounter] = useState(0);

	const [displayError, setDisplayError] = useState(false);
	const [statusMessage, setStatusMessage] = useState('');
	const [showFilters, setShowFilters] = useState(false);

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

	const { q } = useLoaderData() as Awaited<ReturnType<LoaderReturnType>>;
	useEffect(() => {
		if (q && q !== '') {
			setSearchValue(q);
			searchHandler();
		}
	}, [q]);
	const searchHandler = async (nextLink?: string) => {
		setDisplayError(false);
		setStatusMessage('loading...');
		const searchString = searchValue === '' ? '*' : searchValue;
		getProteins(searchString, nextLink)
			.then(({ result, headers }) => {
				setPageCounter(pageCounter + 1);
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
				<Header>
					<p className={displayError ? `text-red-600` : ''}>{statusMessage}</p>
				</Header>
				<Form
					className="flex items-center gap-4 pt-[78px] py-8 px-[10%]"
					onSubmit={() => searchHandler()}
				>
					<input
						className="block flex-auto h-[48px] pl-4 rounded-xl border-2 border-slate-200"
						type="text"
						name="q"
						id="search"
						placeholder="Enter search value"
						onChange={(e) => setSearchValue(e.currentTarget.value)}
						value={searchValue}
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
						<img
							className={`inline-block h-full aspect-square scale-150 ${
								showFilters ? 'brightness-[105] saturate-100 invert-100' : ''
							}`}
							src={filterIcon}
							alt="filter icon"
						/>
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
									searchHandler(link);
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
		</>
	);
}
