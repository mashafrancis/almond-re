import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AOS from 'aos';
import getTheme from './theme';

export const useDarkMode = () => {
	const [themeMode, setTheme] = useState('light');
	const [mountedComponent, setMountedComponent] = useState(false);

	const setMode = (mode) => {
		window.localStorage.setItem('themeMode', mode);
		setTheme(mode);
	};

	const themeToggler = () => {
		themeMode === 'light' ? setMode('dark') : setMode('light');
	};

	useEffect(() => {
		const localTheme = window.localStorage.getItem('themeMode');
		localTheme ? setTheme(localTheme) : setMode('light');
		setMountedComponent(true);
		AOS.refresh();
	}, []);

	useEffect(() => {
		AOS.refresh();
	}, [themeMode]);

	return [themeMode, themeToggler, mountedComponent];
};

interface Props {
	layout: any;
	component: any;
	// All other props
	[x: string]: any;
}

export default function WithLayout({
	component: Component,
	layout: Layout,
	...rest
}: Props): JSX.Element {
	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles?.parentElement?.removeChild(jssStyles);
		}

		AOS.init({
			once: true,
			delay: 50,
			duration: 500,
			easing: 'ease-in-out',
		});
	}, []);

	const [themeMode, themeToggler, mountedComponent] = useDarkMode();

	if (!mountedComponent) return <div />;

	return (
		<ThemeProvider theme={getTheme(themeMode)}>
			<CssBaseline />
			<Paper elevation={0}>
				<Layout themeMode={themeMode} themeToggler={themeToggler}>
					<Component themeMode={themeMode} {...rest} />
				</Layout>
			</Paper>
		</ThemeProvider>
	);
}
