import React, { useEffect } from 'react';

export const useTimeout = (
	callback: () => void,
	timeout = 0,
	{ persistRenders = false } = {},
	_setTimeout = setTimeout,
	_clearTimeout = clearTimeout,
	_useEffect = useEffect,
) => {
	let timeoutId;
	const cancel = () => timeoutId && _clearTimeout(timeoutId);

	_useEffect(
		() => {
			timeoutId = _setTimeout(callback, timeout);
			return cancel;
		},
		persistRenders
			? [_setTimeout, _clearTimeout]
			: [callback, timeout, _setTimeout, _clearTimeout],
	);

	return cancel;
};
