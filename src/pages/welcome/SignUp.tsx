import { useNavigate, Form, Link } from 'react-router-dom';

export default function SignUp() {
	const navigate = useNavigate();
	//TOdo: controlled inputs, disabled y default button
	/**
	 * Repeat password - value of this field matches with value of Password field

if some of rules isn’t completed - app must show an error

if one of the field is empty - “Sign Up“ button should be disabled

on click “Login” link - app opens form to login
	 */
	return (
		<div className="fullscreen flex justify-center items-center">
			<div className="auth-card bg-white rounded-xl sm:w-[450px] w-4/5 p-6">
				<h3 className="text-center mb-[18px]">Sign up</h3>
				<Form className="flex flex-col gap-[20px]">
					<label>
						Email
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Enter your email"
						/>
					</label>
					<label>
						Password
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Enter your password"
							pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$"
							required
						/>
					</label>
					<label>
						Repeat Password
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Enter your password again"
							pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$"
							required
						/>
					</label>
					<button
						type="button"
						className="bg-blue-100 rounded-xl"
						onClick={() => {
							alert('Success!');
							navigate('../login');
						}}
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
