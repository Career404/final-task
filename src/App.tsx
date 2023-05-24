import bgdna from './assets/bg.png';
import './App.css';

export default function App() {
	return (
		<div
			className="fullscreen bg-dna"
			style={{
				background: `url(${bgdna}) no-repeat`,
				backgroundSize: 'cover',
			}}
		>
			<div className="welcome">
				<h1>Q-1 Search</h1>
				<p>Please login to search through UniProt database</p>
				<button>Login</button>
			</div>
		</div>
	);
}
