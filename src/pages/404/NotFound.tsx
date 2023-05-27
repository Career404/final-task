import { useNavigate } from 'react-router-dom';

export default function NotFound() {
	const navigate = useNavigate();
	return (
		<div className="absolute h-full w-full flex justify-center items-center flex-col gap-5">
			<p className="text-center">
				<h2 className="text-[5.1rem] font-bold leading-tight">404</h2>
				<p className="text-[16px] text-gray-400 font-semibold">
					Page not found
				</p>
			</p>
			<button
				className="w-[144px] rounded-3xl bg-blue-100 text-black"
				onClick={() => navigate('/')}
			>
				Back to Search
			</button>
		</div>
	);
}
