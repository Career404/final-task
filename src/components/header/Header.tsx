export default function Header(/* { padded = false, padding = 48 } */) {
	return (
		<>
			{/*
			{padded && <div className="pad mb-[48px]"></div>} */}
			<div className="fixed top-0 w-full px-[10%] border-b-2 border-slate-200 bg-white bg-opacity-70 backdrop-blur-sm">
				<div className="flex items-center justify-end gap-12 h-[48px] text-[12px]">
					<div> Header</div>
					<div>Log out</div>
				</div>
			</div>
		</>
	);
}
