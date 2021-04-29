import { useEffect, useState } from 'react';
import AOS from 'aos';

const useDarkMode = () => {
	const [themeMode, setTheme] = useState('light');
	const [mountedComponent, setMountedComponent] = useState(false);

	const setMode = (mode) => {
		window.localStorage.setItem('themeMode', mode);
		setTheme(mode);
	};

	const themeToggler = () => {
		// eslint-disable-next-line no-unused-expressions
		themeMode === 'light' ? setMode('dark') : setMode('light');
	};

	useEffect(() => {
		const localTheme = window.localStorage.getItem('themeMode');
		// eslint-disable-next-line no-unused-expressions
		localTheme ? setTheme(localTheme) : setMode('light');
		setMountedComponent(true);
		AOS.refresh();
	}, []);

	useEffect(() => {
		AOS.refresh();
	}, [themeMode]);

	return [themeMode, themeToggler, mountedComponent];
};

export default useDarkMode;
