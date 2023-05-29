import { useEffect, useState } from 'react';
import { useNavigate, Form, Link } from 'react-router-dom';
import { useAuth } from 'src/utils/hooks/useAuth';

export default function SignUp() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordRepeat, setPasswordRepeat] = useState('');
	const [passwordsMatch, setPasswordsMatch] = useState(true);
	const [formValid, setFormValid] = useState(false);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const navigate = useNavigate();
	const { signup } = useAuth();

	useEffect(() => {
		setPasswordsMatch(password === passwordRepeat);
	}, [password, passwordRepeat]);

	useEffect(() => {
		setFormValid(isFormValid());
	}, [email, password, passwordRepeat]);

	const isFormValid = (): boolean => {
		const form = document.querySelector('form');
		return form ? form.checkValidity() : false;
	};
	const handleSubmit = async () => {
		signup({ email, password })
			.then(() => navigate('/'))
			.catch((err) => {
				err = JSON.parse(err);
				setErrorMessage(err.code!);
				setError(true);
			});
	};

	//TOdo: controlled inputs, disabled y default button
	/**
if some of rules isn’t completed - app must show an error

if one of the field is empty - “Sign Up“ button should be disabled

on click “Login” link - app opens form to login
	 */
	return (
		<div className="fullscreen flex justify-center items-center">
			<div className="relative auth-card bg-white rounded-xl sm:w-[450px] w-4/5 p-6">
				{!formValid && (
					<p className="absolute left-1/2 -translate-x-1/2 -translate-y-[160%] sm:w-[450px] w-4/5 bg-blue-50 bg-opacity-90 rounded-xl text-center">
						Password must be at least 6 characters long. Please include at least
						one uppercase, one lowercase letter and a number
					</p>
				)}
				<h3 className="text-center mb-[18px]">Sign up</h3>
				{error && (
					<p className="text-red-600 font-semibold">Error: {errorMessage}</p>
				)}
				<Form className="flex flex-col gap-[20px]" onSubmit={handleSubmit}>
					<label>
						Email
						<input
							className={error ? 'border-red-600 border-2' : ''}
							type="email"
							name="email"
							id="email"
							placeholder="Enter your email"
							onChange={(e) => setEmail(e.currentTarget.value)}
						/>
					</label>
					<label>
						Password
						<input
							className={error ? 'border-red-600 border-2' : ''}
							type="password"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.currentTarget.value)}
							placeholder="Enter your password"
							pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$"
							title="Password must be at least 6 characters long. Please include at least one uppercase, one lowercase letter and a number"
							required
						/>
					</label>
					<label>
						Repeat Password
						<input
							className={error ? 'border-red-600 border-2' : ''}
							type="password"
							name="passwordRepeat"
							value={passwordRepeat}
							onChange={(e) => setPasswordRepeat(e.currentTarget.value)}
							placeholder="Enter your password again"
							pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$"
							required
						/>
						{!passwordsMatch && (
							<p className="text-red-600 text-[12px] font-semibold">
								Passwords do not match
							</p>
						)}
					</label>
					<button
						type="submit"
						className="bg-blue-100 rounded-xl"
						disabled={!formValid || !passwordsMatch}
					>
						Create Account
					</button>
				</Form>
				<p className="mt-3 text-center">
					Already have an account?{' '}
					<Link to="../login" className="font-bold">
						Login
					</Link>
				</p>
			</div>
		</div>
	);
}
