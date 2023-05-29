import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: 'qs-final-auth.firebaseapp.com',
	projectId: 'qs-final-auth',
	storageBucket: 'qs-final-auth.appspot.com',
	messagingSenderId: '424565765438',
	appId: '1:424565765438:web:bb46eca150a3c59fe0286f',
};

export const initializeFirebaseApp = () => {
	return initializeApp(firebaseConfig);
};
initializeFirebaseApp();

export const AUTH = getAuth();
