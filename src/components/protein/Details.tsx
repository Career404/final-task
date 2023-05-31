export default function Details({ prot }: { prot: Prot }) {
	return (
		<>
			<div className="tabTarget" id="detailsTarget">
				<h2 className="text-xl font-semibold py-4">Sequence</h2>
				<div className="w-1/2 grid grid-cols-2 gap-4">
					<div className="flex flex-col">
						<p>Length</p>
						<p>{prot.sequence.length}</p>
					</div>

					<div className="flex flex-col">
						<p>Last updated</p>
						<p>{prot.entryAudit.lastSequenceUpdateDate}</p>
					</div>

					<div className="flex flex-col">
						<p>Mass (DA)</p>
						<p>{prot.sequence.molWeight.toLocaleString()}</p>
					</div>
					<div className="flex flex-col">
						<p>Checksum</p>
						<p>{prot.sequence.crc64}</p>
					</div>
				</div>
				<div>
					<div className="flex justify-end">
						<p
							className="p-4 cursor-pointer hover:scale-125"
							onClick={() => navigator.clipboard.writeText(prot.sequence.value)}
						>
							<svg
								className="inline -translate-y-[1px]"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M0 1.6C0 1.17565 0.168571 0.768687 0.468629 0.468629C0.768687 0.168571 1.17565 0 1.6 0H9.6C10.0243 0 10.4313 0.168571 10.7314 0.468629C11.0314 0.768687 11.2 1.17565 11.2 1.6V4.8H14.4C14.8243 4.8 15.2313 4.96857 15.5314 5.26863C15.8314 5.56869 16 5.97565 16 6.4V14.4C16 14.8243 15.8314 15.2313 15.5314 15.5314C15.2313 15.8314 14.8243 16 14.4 16H6.4C5.97565 16 5.56869 15.8314 5.26863 15.5314C4.96857 15.2313 4.8 14.8243 4.8 14.4V11.2H1.6C1.17565 11.2 0.768687 11.0314 0.468629 10.7314C0.168571 10.4313 0 10.0243 0 9.6V1.6ZM6.4 11.2V14.4H14.4V6.4H11.2V9.6C11.2 10.0243 11.0314 10.4313 10.7314 10.7314C10.4313 11.0314 10.0243 11.2 9.6 11.2H6.4ZM9.6 9.6V1.6H1.6V9.6H9.6Z"
									fill="#0D0D0D"
								/>
							</svg>{' '}
							Copy
						</p>
					</div>
					<p className="bg-slate-200 p-4 rounded-xl break-all">
						{prot.sequence.value}
					</p>
				</div>
			</div>
		</>
	);
}
