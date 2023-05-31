import { Navigate, useParams } from 'react-router-dom';

export default function ProteinRedirectRoute() {
	const { id } = useParams();
	return <Navigate to={`/search/protein/${id}`} replace />;
}
/*
I'd love to do this directly in the route:
					loader={({ params }) => {
						return redirect(`/search/protein/${params.id}`)
					}}
And it works, but there is no 'replace' property in redirect, and it means that 'Back' on the protein page will not work
*/
