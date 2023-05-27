import { PropsWithChildren, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

interface ProtectedRouteProps extends PropsWithChildren {
	allowAccessTo?: 'unregistered' | 'user';
}

export const ProtectedRoute = ({
	children,
	allowAccessTo = 'user',
}: ProtectedRouteProps) => {
	const { user } = useAuth();
	if (allowAccessTo === 'user') {
		if (user === null) {
			return <Navigate to="/welcome" />;
		}
	}
	if (allowAccessTo === 'unregistered') {
		if (user !== null) {
			return <Navigate to="/search" />;
		}
	}

	return children as ReactElement;
};
