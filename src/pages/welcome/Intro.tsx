import { useNavigate } from 'react-router-dom';
export default function Intro() {
	const navigate = useNavigate();
	return (
		<div className="fullscreen intro-container">
			<div className="welcome p-6 bg-blue-50 bg-opacity-10 backdrop-blur-md rounded-3xl drop-shadow-lg">
				<h1>Q-1 Search</h1>
				<p className="mb-[18px]">
					Please login to search through UniProt database
				</p>
				<button
					className="max-w-[158px] rounded-3xl bg-white font-semibold"
					onClick={() => navigate('./login')}
				>
					Login
				</button>
			</div>
		</div>
	);
}
