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
interface Prot {
	entryType: string;
	primaryAccession: string;
	secondaryAccessions?: string[] | null;
	uniProtkbId: string;
	entryAudit: EntryAudit;
	annotationScore: number;
	organism: Organism;
	proteinExistence: string;
	proteinDescription: ProteinDescription;
	genes?: GenesEntity[] | null;
	comments?: CommentsEntity[] | null;
	features?: FeaturesEntity[] | null;
	keywords?: KeywordsEntity[] | null;
	references?: ReferencesEntity[] | null;
	uniProtKBCrossReferences?: UniProtKBCrossReferencesEntity[] | null;
	sequence: Sequence;
	extraAttributes: ExtraAttributes;
}
interface EntryAudit {
	firstPublicDate: string;
	lastAnnotationUpdateDate: string;
	lastSequenceUpdateDate: string;
	entryVersion: number;
	sequenceVersion: number;
}
interface Organism {
	scientificName: string;
	commonName: string;
	taxonId: number;
	lineage?: string[] | null;
}
interface ProteinDescription {
	recommendedName: RecommendedName;
	alternativeNames?: AlternativeNamesEntity[] | null;
}
interface RecommendedName {
	fullName: FullNameOrShortNamesEntityOrNameOrTextsEntity;
}
interface FullNameOrShortNamesEntityOrNameOrTextsEntity {
	value: string;
}
interface AlternativeNamesEntity {
	fullName: FullNameOrShortNamesEntityOrNameOrTextsEntity;
	shortNames?: FullNameOrShortNamesEntityOrNameOrTextsEntity[] | null;
}
interface GenesEntity {
	geneName: SynonymsEntityOrGeneNameOrTextsEntityOrName;
	synonyms?: SynonymsEntityOrGeneNameOrTextsEntityOrName[] | null;
}
interface SynonymsEntityOrGeneNameOrTextsEntityOrName {
	evidences?: EvidencesEntity[] | null;
	value: string;
}
interface EvidencesEntity {
	evidenceCode: string;
	source: string;
	id: string;
}
interface CommentsEntity {
	texts?: TextsEntity[] | null;
	commentType: string;
	subcellularLocations?: SubcellularLocationsEntity[] | null;
	events?: string[] | null;
	isoforms?: IsoformsEntity[] | null;
	note?: Note | string;
	disease?: Disease | null;
	molecule?: string | null;
	sequenceCautionType?: string | null;
	sequence?: string | null;
	evidences?: EvidencesEntity1[] | null;
}
interface TextsEntity {
	evidences?: EvidencesEntity2[] | null;
	value: string;
}
interface EvidencesEntity2 {
	evidenceCode: string;
	source?: string | null;
	id?: string | null;
}
interface SubcellularLocationsEntity {
	location: Location;
}
interface Location {
	evidences?: EvidencesEntity[] | null;
	value: string;
	id: string;
}
interface IsoformsEntity {
	name: SynonymsEntityOrGeneNameOrTextsEntityOrName;
	isoformIds?: string[] | null;
	isoformSequenceStatus: string;
	sequenceIds?: string[] | null;
	synonyms?: SynonymsEntityOrGeneNameOrTextsEntityOrName[] | null;
}
interface Note {
	texts?: SynonymsEntityOrGeneNameOrTextsEntityOrName[] | null;
}
interface Disease {
	diseaseId: string;
	diseaseAccession: string;
	acronym: string;
	description: string;
	diseaseCrossReference: DiseaseCrossReferenceOrFeatureCrossReferencesEntityOrCitationCrossReferencesEntity;
	evidences?: EvidencesEntity[] | null;
}
interface DiseaseCrossReferenceOrFeatureCrossReferencesEntityOrCitationCrossReferencesEntity {
	database: string;
	id: string;
}
interface EvidencesEntity1 {
	evidenceCode: string;
}
interface FeaturesEntity {
	type: string;
	location: Location1;
	description: string;
	featureId?: string | null;
	evidences?: EvidencesEntity2[] | null;
	alternativeSequence?: AlternativeSequence | null;
	featureCrossReferences?:
		| DiseaseCrossReferenceOrFeatureCrossReferencesEntityOrCitationCrossReferencesEntity[]
		| null;
}
interface Location1 {
	start: StartOrEnd;
	end: StartOrEnd;
}
interface StartOrEnd {
	value: number;
	modifier: string;
}
interface AlternativeSequence {
	originalSequence?: string | null;
	alternativeSequences?: string[] | null;
}
interface KeywordsEntity {
	id: string;
	category: string;
	name: string;
}
interface ReferencesEntity {
	citation: Citation;
	referencePositions?: string[] | null;
	evidences?: EvidencesEntity2[] | null;
	referenceComments?: ReferenceCommentsEntity[] | null;
}
interface Citation {
	id: string;
	citationType: string;
	authors?: string[] | null;
	citationCrossReferences?:
		| DiseaseCrossReferenceOrFeatureCrossReferencesEntityOrCitationCrossReferencesEntity[]
		| null;
	title: string;
	publicationDate: string;
	journal: string;
	firstPage: string;
	lastPage: string;
	volume: string;
}
interface ReferenceCommentsEntity {
	value: string;
	type: string;
}
interface UniProtKBCrossReferencesEntity {
	database: string;
	id: string;
	properties?: PropertiesEntity[] | null;
	isoformId?: string | null;
	evidences?: EvidencesEntity[] | null;
}
interface PropertiesEntity {
	key: string;
	value: string;
}
interface Sequence {
	value: string;
	length: number;
	molWeight: number;
	crc64: string;
	md5: string;
}
interface ExtraAttributes {
	countByCommentType: CountByCommentType;
	countByFeatureType: CountByFeatureType;
	uniParcId: string;
}
interface CountByCommentType {
	FUNCTION: number;
	SUBUNIT: number;
	'SUBCELLULAR LOCATION': number;
	'ALTERNATIVE PRODUCTS': number;
	'TISSUE SPECIFICITY': number;
	DISEASE: number;
	MISCELLANEOUS: number;
	'SEQUENCE CAUTION': number;
}
interface CountByFeatureType {
	Chain: number;
	Region: number;
	'Compositional bias': number;
	'Alternative sequence': number;
	'Natural variant': number;
	'Sequence conflict': number;
}
