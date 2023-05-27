import { createContext, ReactElement, useContext, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface User {
	email: string;
	password: string;
}

interface AuthContextProps {
	user: User | null;
	login: (data: User) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactElement }) => {
	const [user, setUser] = useLocalStorage('user', null);
	const login = async (data: any) => {
		setUser(data);
	};
	const logout = () => {
		setUser(null);
	};
	const value = useMemo(
		() => ({
			user,
			login,
			logout,
		}),
		[user]
	);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
