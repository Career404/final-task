import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'src/utils/hooks/useAuth';
import bgdna from '../../assets/bg.png';
import './Welcome.css';

export default function Welcome() {
	const { user } = useAuth();
	if (user) {
		return <Navigate to="/search" />;
	}
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
