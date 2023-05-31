import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProtein } from 'src/api/uniprot';
import Details from '../../components/protein/Details';
import Feature from 'src/components/protein/Feature';
import './Protein.css';
import Publications from 'src/components/protein/Publications';

export function Protein() {
	const { id } = useParams();
	const [displayTab, setDisplayTab] = useState<
		'Details' | 'Feature' | 'Publications'
	>('Details');
	const [prot, setProt] = useState<Prot | undefined>();
	const [err, setErr] = useState<any>();

	useEffect(() => {
		getProtein(id!)
			.then((data) => {
				setProt(data.result);
			})
			.catch((err) => setErr(err));
	}, []);
	return (
		<div className="fixed top-0 bottom-0 left-0 right-0 px-[10%] pt-32 bg-white bg-opacity-95 overflow-y-auto">
			{prot ? (
				<>
					<div className="flex flex-col justify-center items-start">
						<h3 className="text-3xl mb-4">
							{prot.primaryAccession} / {prot.uniProtkbId}
							{'  '}
							<span
								className="cursor-help relative -top-1 py-2 px-4 bg-blue-100 rounded-3xl text-base font-normal"
								title={prot.organism.commonName!}
							>
								{prot.organism.scientificName}
							</span>
						</h3>
						<p className="font-semibold text-slate-600">Protein</p>
						<p>{prot.proteinDescription.recommendedName.fullName.value}</p>
						<p className="font-semibold text-slate-600">Gene</p>
						<p>{prot.genes![0].geneName.value || 'No data'}</p>
					</div>
					<div>
						<div className="tabWrapper flex mt-4">
							<div
								className={`cursor-pointer px-8 py-2 text-[16px] font-semibold hover:text-blue-800 ${
									displayTab === 'Details'
										? 'text-blue-600 border-b-2 border-blue-600'
										: ''
								}`}
								onClick={() => setDisplayTab('Details')}
							>
								Details
							</div>
							<div
								className={`cursor-pointer px-8 py-2 text-[16px] font-semibold hover:text-blue-800  ${
									displayTab === 'Feature'
										? 'text-blue-600 border-b-2 border-blue-600'
										: ''
								}`}
								onClick={() => setDisplayTab('Feature')}
							>
								Feature Viewer
							</div>
							<div
								className={`cursor-pointer px-8 py-2 text-[16px] font-semibold hover:text-blue-800   ${
									displayTab === 'Publications'
										? 'text-blue-600 border-b-2 border-blue-600'
										: ''
								}`}
								onClick={() => setDisplayTab('Publications')}
							>
								Publications
							</div>
						</div>
						<div className="tabTargetWrapper">
							{displayTab === 'Details' && <Details prot={prot} />}
							{displayTab === 'Feature' && <Feature id={id!} />}
							{displayTab === 'Publications' && <Publications id={id!} />}
						</div>
					</div>
				</>
			) : (
				<div className="h-full w-full flex flex-col justify-center items-center">
					{err ? (
						<div className="text-xl">
							<h3 className="text-4xl text-red-600 text-center">Sorry!</h3>{' '}
							<br />
							<p>There seems to be this kind of error:</p>
							<br />
							<p className="text-xl font-semibold">{err.message}</p>
						</div>
					) : (
						<>
							<p>Loading data about:</p>
							<p>{id}</p>
						</>
					)}
				</div>
			)}
			<Link
				to={-1 as any}
				className="cursor-pointer absolute top-0 w-8 h-8 py-16 hover:scale-150 hover:underline text-blue-600"
			>
				Back
			</Link>
		</div>
	);
}
