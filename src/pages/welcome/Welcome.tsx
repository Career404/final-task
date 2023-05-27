import { Outlet } from 'react-router-dom';
import bgdna from '../../assets/bg.png';
import './Welcome.css';

export default function Welcome() {
	return (
		<div
			className="fullscreen"
			style={{
				background: `url(${bgdna}) no-repeat`,
				backgroundSize: 'cover',
			}}
		>
			<Outlet />
		</div>
	);
}
