import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/utils/hooks/useAuth';

export default function Header(/* { padded = false, padding = 48 } */) {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	return (
		<>
			{/*
			{padded && <div className="pad mb-[48px]"></div>} */}
			<div className="fixed top-0 w-full px-[10%] border-b-2 border-slate-200 bg-white bg-opacity-70 backdrop-blur-sm">
				<div className="flex items-center justify-end gap-12 h-[48px] text-[12px]">
					{children}
					<div className="font-semibold">{user?.email}</div>
					<div
						className="text-blue-500 cursor-pointer hover:scale-150 focus-visible:outline-black"
						tabIndex={0}
						onClick={() => {
							logout();
							navigate('/welcome');
						}}
					>
						Log out
					</div>
				</div>
			</div>
		</>
	);
}
