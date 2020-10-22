import { useState } from 'react';

const useLoading = (): any => {
	const [isLoading, setLoading] = useState<boolean>(false);
	const load = (aPromise: Promise<boolean>) => {
		setLoading(true);
		return aPromise.finally(() => setLoading(false));
	};
	return [isLoading, load] as [
		boolean,
		(aPromise: Promise<boolean>) => Promise<boolean>,
	];
};

export default useLoading;
