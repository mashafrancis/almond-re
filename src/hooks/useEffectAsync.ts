import { DependencyList, useEffect } from 'react';

export const useEffectAsync = (
	effect: any,
	inputs: DependencyList | undefined,
) => {
	useEffect(() => {
		effect();
	}, inputs);
};
