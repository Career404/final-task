import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider,
	redirect,
	Navigate,
} from 'react-router-dom';

import { createRoutesFromElements, Route } from 'react-router-dom';

import Welcome from './pages/welcome/Welcome';
import Intro from './pages/welcome/Intro';
import Login from './pages/welcome/Login';
import SignUp from './pages/welcome/SignUp';
import NotFound from './pages/404/NotFound';
import Header from './components/header/Header';
import SearchPage from './pages/search/Search';
import { ProtectedRoute } from './utils/ProtectedRoute';
import { AuthProvider } from './utils/hooks/useAuth';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route index element={<Navigate to="/search" />} />
			<Route path="welcome" element={<Welcome />}>
				<Route index element={<Intro />} />
				<Route
					path="login"
					element={<Login />}
					action={async ({ request }) => {
						let data = await request.formData();
						const email = data.get('email');
						const password = data.get('password');
						if (email && password) {
							localStorage.setItem(
								'user',
								JSON.stringify({
									email,
									password,
								})
							);
						}
						return redirect('/search');
					}}
				/>
				<Route path="signup" element={<SignUp />} />
				<Route path="*" element={<Navigate to={'/welcome'} />} />
			</Route>
			<Route
				path="search"
				element={
					<ProtectedRoute>
						<SearchPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path="not-found"
				element={
					<>
						<Header />3
						<NotFound />
					</>
				}
			/>
			<Route path="*" element={<Navigate to="not-found" />} />
		</Route>
	)
);

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>
);
