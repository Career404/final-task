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

const loggerLoader = () => {
	let isLoggedIn = JSON.parse(sessionStorage.getItem('isLoggedIn')!);
	if (!isLoggedIn) {
		sessionStorage.setItem('isLoggedIn', 'false');
		isLoggedIn = false;
	}
	return isLoggedIn ? null : redirect('welcome');
};

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route index loader={loggerLoader} element={<Navigate to="search" />} />
			<Route path="welcome" element={<Welcome />}>
				<Route index element={<Intro />}></Route>
				<Route
					path="login"
					element={<Login />}
					action={() => {
						sessionStorage.setItem('isLoggedIn', 'true');
						return redirect('/search');
					}}
				></Route>
				<Route path="signup" element={<SignUp />}></Route>
				<Route path="*" element={<Navigate to={'/welcome'} />} />
			</Route>
			<Route path="search" element={<SearchPage />}></Route>
			<Route
				path="not-found"
				element={
					<>
						<Header />
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
		<RouterProvider router={router} />
	</React.StrictMode>
);
