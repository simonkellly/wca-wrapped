import { WCA_ORIGIN } from "./wca-env";


export const wcaApiFetch = async (path: string, accessToken: string, fetchOptions: unknown) => {
	const baseApiUrl = `${WCA_ORIGIN}`;

	const res = await fetch(
		`${baseApiUrl}${path}`,
		Object.assign({}, fetchOptions, {
			headers: new Headers({
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			}),
		})
	);

	if (!res.ok) {
		throw new Error(`${res.status}${res.statusText ? `: ${res.statusText}` : ''}`);
	}

	return await res.json();
};