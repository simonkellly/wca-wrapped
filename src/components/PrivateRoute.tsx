import { useAuth } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom"

export default function RequireAuth({ children, redirectTo }: React.PropsWithChildren<{ redirectTo: string }>) {
	const { signedIn } = useAuth();
	return signedIn() ? <>
		{children}

	</> : <Navigate to={redirectTo} />;
}


export function PublicOnly({ children, redirectTo }: React.PropsWithChildren<{ redirectTo: string }>) {
	const { signedIn } = useAuth();
	return !signedIn() ? <>
		{children}

	</> : <Navigate to={redirectTo} />;
}

