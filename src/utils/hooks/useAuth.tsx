import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import { createContext, ReactElement, useContext, useMemo } from 'react';
import { AUTH } from '../firebase';
import useLocalStorage from './useLocalStorage';

interface User {
	email: string;
	password: string;
}

interface AuthContextProps {
	user: User | null;
	signup: (data: User) => Promise<unknown>;
	login: (data: User) => Promise<unknown>;
	logout: () => Promise<unknown>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactElement }) => {
	const [user, setUser] = useLocalStorage<User | null>('user', null);
	const signup = async (data: User) => {
		try {
			await createUserWithEmailAndPassword(AUTH, data.email, data.password);
			setUser(data);
		} catch (err) {
			throw JSON.stringify(err);
		}
	};
	const login = async (data: User) => {
		try {
			await signInWithEmailAndPassword(AUTH, data.email, data.password);
			setUser(data);
		} catch (err) {
			throw JSON.stringify(err);
		}
	};

	const logout = async () => {
		try {
			await signOut(AUTH);
			setUser(null);
		} catch (err) {
			throw JSON.stringify(err);
		}
	};
	const value = useMemo(
		() => ({
			user,
			signup,
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
