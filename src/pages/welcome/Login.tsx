import { Form, Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'src/utils/hooks/useAuth';

/*
if some of rules isn’t completed - app must show an error

if login failed app shows appropriate message about the error.
*/

export default function Login() {
	const navigate = useNavigate();
	const { login } = useAuth();
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		if (email && password) {
			login({ email, password });
		}
		navigate('/');
	};

	return (
		<div className="fullscreen flex justify-center items-center">
			<div className="auth-card bg-white rounded-xl sm:w-[450px] w-4/5 p-6">
				<h3 className="text-center mb-[18px]">Login</h3>
				<Form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
					<label>
						Email
						<input
							type="email"
							name="email"
							placeholder="Enter your email"
							required
						/>
					</label>
					<label>
						Password
						<input
							type="password"
							name="password"
							placeholder="Enter your password"
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
