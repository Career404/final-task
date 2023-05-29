import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'src/utils/hooks/useAuth';

/*
if some of rules isn’t completed - app must show an error

if login failed app shows appropriate message about the error.
*/

export default function Login() {
	const [error, setError] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const navigate = useNavigate();
	const { login } = useAuth();
	const handleSubmit = () => {
		if (email !== '' && password !== '') {
			login({ email, password })
				.then(() => navigate('/'))
				.catch((err) => {
					err = JSON.parse(err);
					setErrorMessage(err.code!);
					setError(true);
				});
		}
	};

	return (
		<div className="fullscreen flex justify-center items-center">
			<div className="auth-card bg-white rounded-xl sm:w-[450px] w-4/5 p-6">
				<h3 className="text-center mb-[18px]">Login</h3>
				<div className="flex flex-col gap-[20px]">
					<label>
						Email
						<input
							className={error ? 'border-red-600 border-2' : ''}
							onChange={(e) => {
								setError(false);
								setEmail(e.currentTarget.value);
							}}
							type="email"
							name="email"
							placeholder="Enter your email"
							required
						/>
					</label>
					<label>
						Password
						<input
							className={error ? 'border-red-600 border-2' : ''}
							onChange={(e) => {
								setError(false);
								setPassword(e.currentTarget.value);
							}}
							type="password"
							name="password"
							placeholder="Enter your password"
							required
						/>
					</label>
					{error && (
						<p className="text-red-600 text-[12px] font-semibold">
							Login failed! Please, check you password and email and try again
							<br /> Error: {errorMessage}
						</p>
					)}
					<button
						onClick={() => handleSubmit()}
						className="bg-blue-100 rounded-xl"
					>
						Login
					</button>
				</div>
				<p className="mt-3 text-center">
					Don’t have an account?{' '}
					<Link to="../signup" className="font-bold">
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
}
