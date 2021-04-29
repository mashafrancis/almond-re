import { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useDarkMode from '@hooks/useDarkMode';
import AOS from 'aos';
import getTheme from './theme';

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
	useEffect(() => {
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
