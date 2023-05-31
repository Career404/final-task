import { useNavigate } from 'react-router-dom';
import './SearchResults.css';

export default function SearchResults({
	results,
	q,
	total,
	page,
}: {
	results: Protein[];
	q: string;
	total: string;
	page: number;
}) {
	const navigate = useNavigate();
	return (
		<>
			<p className="px-[10%] pb-4 text-xl font-semibold">
				{total + ' '}
				{q ? `Search Results for ${q}` : 'Total Proteins'}
			</p>
			<div className="h-[70vh] xl:mx-[10%] xl:w-[80%] overflow-auto ">
				<table className="results-table">
					<colgroup>
						<col span={1} className="w-8" />
						<col span={3} />
						<col span={1} />
						<col span={1} className="w-[30vw]" />
					</colgroup>

					<thead className="mb-[10px]">
						<tr>
							<th scope="col">#</th>
							<th scope="col">Entry</th>
							<th scope="col">Entry Names</th>
							<th scope="col">Genes</th>
							<th scope="col">Organism</th>
							<th scope="col">Subcellular Location</th>
							<th scope="col">Length</th>
						</tr>
					</thead>
					<tbody>
						{results.map((prot, index) => (
							<tr
								className="cursor-pointer"
								title={prot.proteinDescription.recommendedName?.fullName.value}
								key={prot.uniProtkbId}
								onClick={() => navigate(`./protein/${prot.primaryAccession}`)}
							>
								<td>{index + page * 25 - 24}</td>
								<td>{prot.primaryAccession}</td>
								<td>{prot.uniProtkbId}</td>
								<td>
									{prot.genes
										?.map((gene: any) => {
											return gene.geneName ? gene.geneName.value : null;
										})
										.join(', ')}
								</td>
								<td
									title={prot.organism.commonName}
									className="bg-blue-100 px-4 rounded-3xl text-center"
								>
									{prot.organism.scientificName}
								</td>
								<td className="">
									{prot.comments
										?.filter(
											(comment: any) =>
												comment?.commentType === 'SUBCELLULAR LOCATION'
										)
										.flatMap((comment: any) => {
											return comment.subcellularLocations
												? comment.subcellularLocations.map((location: any) => {
														return location?.location
															? location.location.value
															: 'No data';
												  })
												: [];
										})
										.join(', ')}
								</td>
								<td>{prot.sequence.length}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
/*
Entry - accession
Entry Names - id
Organism - organism_name
Genes - gene_names
Subcellular location - cc_subcellular_location
Length - length
 */
