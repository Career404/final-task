export async function getProteins(q: string, link?: string) {
	try {
		const queryString = link
			? link
			: `https://rest.uniprot.org/uniprotkb/search?fields=accession,reviewed,id,protein_name,gene_names,organism_name,length,ft_peptide,cc_subcellular_location&query=${q}`;
		const response = await fetch(queryString);
		if (!response.ok) {
			throw new Error('server error');
		}
		const headers = [...response.headers];
		const result = await response.json();
		return { result, headers };
	} catch (error) {
		throw { message: 'failed to make a server call', error };
	}
}
export async function getProtein(id: string) {
	try {
		const response = await fetch(`https://rest.uniprot.org/uniprotkb/${id}`);
		if (!response.ok) {
			throw new Error('server error');
		}
		const headers = response.headers;
		const result = await response.json();
		return { result, headers };
	} catch (error) {
		throw { message: 'failed to make a server call', error };
	}
}
export async function getProteinPublications(id: string) {
	try {
		const response = await fetch(
			`https://rest.uniprot.org/uniprotkb/${id}/publications`
		);
		if (!response.ok) {
			throw new Error('server error');
		}
		const headers = response.headers;
		const result = await response.json();
		return { result, headers };
	} catch (error) {
		throw { message: 'failed to make a server call', error };
	}
}
