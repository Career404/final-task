import { Form, Link } from 'react-router-dom';
/**
 *

if some of rules isn’t completed - app must show an error

if login failed app shows appropriate message about the error. D
 */
export default function Login() {
	return (
		<div className="fullscreen flex justify-center items-center">
			<div className="auth-card bg-white rounded-xl sm:w-[450px] w-4/5 p-6">
				<h3 className="text-center mb-[18px]">Login</h3>
				<Form method="post" className="flex flex-col gap-[20px]">
					<label>
						Email
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Enter your email"
							required
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
					<button type="submit" className="bg-blue-100 rounded-xl">
						Login
					</button>
				</Form>
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
