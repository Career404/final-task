import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
	Outlet,
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
import searchLoader from './pages/loaders/searchLoader';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route index element={<Navigate to="/search" />} />
			<Route
				path="welcome"
				element={
					<ProtectedRoute allowAccessTo="unregistered">
						<Welcome />
					</ProtectedRoute>
				}
			>
				<Route index element={<Intro />} />
				<Route path="login" element={<Login />} />
				<Route path="signup" element={<SignUp />} />
				<Route path="*" element={<Navigate to={'/welcome'} />} />
			</Route>

			<Route
				element={
					<ProtectedRoute>
						<Outlet />
					</ProtectedRoute>
				}
			>
				<Route
					path="search"
					loader={searchLoader}
					element={<SearchPage />}
					errorElement={
						<>
							<Header />
							<p className="h-[100vh] flex items-center justify-center text-4xl font-semibold">
								There seems to be a problem... Sorry!
								<br />
							</p>
						</>
					}
				/>
				<Route
					path="not-found"
					element={
						<>
							<NotFound />
							<Header />
						</>
					}
				/>
				<Route path="*" element={<Navigate to="not-found" />} />
			</Route>
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
