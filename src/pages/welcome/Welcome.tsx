import { Outlet } from 'react-router-dom';
import usePageTitle from 'src/utils/hooks/usePageTitle';

import bgdna from '../../assets/bg.png';
import './Welcome.css';

export default function Welcome() {
	usePageTitle();
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
