import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	signInWithPopup,
	GoogleAuthProvider,
} from 'firebase/auth';
import { createContext, ReactElement, useContext, useMemo } from 'react';
import { AUTH } from '../firebase';
import useLocalStorage from './useLocalStorage';

interface User {
	email: string;
	password: string;
}

interface AuthContextProps {
	user: {
		email: string | null;
		token: string;
	} | null;
	signup: (data: User) => Promise<unknown>;
	login: (data: User) => Promise<unknown>;
	G_login: () => Promise<void>;
	logout: () => Promise<unknown>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactElement }) => {
	const [user, setUser] = useLocalStorage<{
		email: string | null;
		token: string;
	} | null>('user', null);
	const signup = async (data: User) => {
		try {
			const credentials = await createUserWithEmailAndPassword(
				AUTH,
				data.email,
				data.password
			);
			const userData = {
				email: credentials.user.email,
				token: credentials.user.uid,
			};
			setUser(userData);
		} catch (err) {
			throw JSON.stringify(err);
		}
	};
	const login = async (data: User) => {
		try {
			const credentials = await signInWithEmailAndPassword(
				AUTH,
				data.email,
				data.password
			);
			const userData = {
				email: credentials.user.email,
				token: credentials.user.uid,
			};
			setUser(userData);
		} catch (err) {
			throw JSON.stringify(err);
		}
	};
	const G_login = async () => {
		try {
			const G_AUTH = new GoogleAuthProvider();
			const credentials = await signInWithPopup(AUTH, G_AUTH);
			const userData = {
				email: credentials.user.email,
				token: credentials.user.uid,
			};
			setUser(userData);
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
			G_login,
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
