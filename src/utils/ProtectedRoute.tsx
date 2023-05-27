import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

export const ProtectedRoute = ({ children }: { children: ReactElement }) => {
	const { user } = useAuth();
	if (user === null) {
		return <Navigate to="/welcome" />;
	}
	return children;
};
