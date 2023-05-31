interface Protein {
	entryType: string;
	primaryAccession: string;
	uniProtkbId: string;
	organism: Organism;
	proteinDescription: ProteinDescription;
	genes?: GenesEntity[] | null;
	comments?: (CommentsEntity | null)[] | null;
	features?: null[] | null;
	sequence: Sequence;
}
interface Organism {
	scientificName: string;
	commonName: string;
	taxonId: number;
	evidences?: EvidencesEntity[] | null;
	lineage?: string[] | null;
}
interface EvidencesEntity {
	evidenceCode: string;
	source: string;
	id: string;
}
interface ProteinDescription {
	recommendedName: RecommendedName;
	alternativeNames?: AlternativeNamesEntity[] | null;
	flag?: string | null;
	contains?: ContainsEntity[] | null;
}
interface RecommendedName {
	fullName: FullNameOrTextsEntity;
	ecNumbers?:
		| FullNameOrGeneNameOrTextsEntityOrEcNumbersEntityOrSynonymsEntityOrShortNamesEntity[]
		| null;
	shortNames?:
		| FullNameOrGeneNameOrTextsEntityOrEcNumbersEntityOrSynonymsEntityOrShortNamesEntity[]
		| null;
}
interface FullNameOrTextsEntity {
	evidences?: EvidencesEntity1[] | null;
	value: string;
}
interface EvidencesEntity1 {
	evidenceCode: string;
	source?: string | null;
	id?: string | null;
}
interface FullNameOrGeneNameOrTextsEntityOrEcNumbersEntityOrSynonymsEntityOrShortNamesEntity {
	evidences?: EvidencesEntity[] | null;
	value: string;
}
interface AlternativeNamesEntity {
	fullName: FullNameOrTextsEntity;
	shortNames?:
		| FullNameOrGeneNameOrTextsEntityOrEcNumbersEntityOrSynonymsEntityOrShortNamesEntity[]
		| null;
}
interface ContainsEntity {
	recommendedName: AlternativeNamesEntityOrRecommendedName;
}
interface AlternativeNamesEntityOrRecommendedName {
	fullName: FullNameOrSynonymsEntityOrGeneNameOrShortNamesEntityOrEcNumbersEntityOrOrfNamesEntityOrTextsEntity;
	shortNames?:
		| FullNameOrSynonymsEntityOrGeneNameOrShortNamesEntityOrEcNumbersEntityOrOrfNamesEntityOrTextsEntity[]
		| null;
}
interface FullNameOrSynonymsEntityOrGeneNameOrShortNamesEntityOrEcNumbersEntityOrOrfNamesEntityOrTextsEntity {
	value: string;
}
interface GenesEntity {
	geneName: FullNameOrGeneNameOrTextsEntityOrEcNumbersEntityOrSynonymsEntityOrShortNamesEntity;
	synonyms?:
		| FullNameOrGeneNameOrTextsEntityOrEcNumbersEntityOrSynonymsEntityOrShortNamesEntity[]
		| null;
	orfNames?:
		| FullNameOrSynonymsEntityOrGeneNameOrShortNamesEntityOrEcNumbersEntityOrOrfNamesEntityOrTextsEntity[]
		| null;
}
interface CommentsEntity {
	commentType: string;
	note?: Note | null;
	subcellularLocations?: SubcellularLocationsEntity[] | null;
}
interface Note {
	texts?: FullNameOrTextsEntity[] | null;
}
interface SubcellularLocationsEntity {
	location: LocationOrTopology;
	topology?: LocationOrTopology1 | null;
}
interface LocationOrTopology {
	evidences?: EvidencesEntity1[] | null;
	value: string;
	id: string;
}
interface LocationOrTopology1 {
	evidences?: EvidencesEntity1[] | null;
	value: string;
	id: string;
}
interface Sequence {
	length: number;
}
