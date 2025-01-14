import ProtvistaUniprot from 'protvista-uniprot';
declare global {
	namespace JSX {
		interface IntrinsicElements {
			['protvista-uniprot']: any;
		}
	}
}

export default function Feature({ id }: { id: string }) {
	if (!window.customElements.get('protvista-uniprot')) {
		window.customElements.define('protvista-uniprot', ProtvistaUniprot);
	}

	return (
		<div className="pt-4">
			<protvista-uniprot accession={id}></protvista-uniprot>
		</div>
	);
}
