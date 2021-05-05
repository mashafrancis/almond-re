// eslint-disable-next-line
import { PaletteMode } from '@material-ui/core';

export const light = {
	alternate: {
		main: 'rgb(247, 249, 250)',
		dark: '#e8eaf6',
	},
	cardShadow: 'rgba(23, 70, 161, .11)',
	type: 'light' as PaletteMode,
	primary: {
		main: '#2573b5',
		light: '#62a1e8',
		dark: '#004885',
		contrastText: '#fff',
	},
	secondary: {
		main: '#00AB55',
		lighter: '#C8FACD',
		light: '#5BE584',
		dark: '#007B55',
		darker: '#005249',
		contrastText: 'rgba(0, 0, 0, 0.87)',
	},
	text: {
		primary: '#2d3748',
		secondary: '#718096',
	},
	divider: 'rgba(0, 0, 0, 0.12)',
	background: {
		paper: '#fff',
		default: '#fff',
		level2: '#62a1e81f',
		level1: '#fff',
		footer: '#f2f2f2',
		activeDevice: 'rgba(17, 17, 17, 0.8)',
	},
};

export const dark = {
	alternate: {
		main: '#121212',
		dark: '#24242b',
	},
	cardShadow: 'rgba(0, 0, 0, .11)',
	common: {
		black: '#000',
		white: '#fff',
	},
	type: 'dark' as PaletteMode,
	primary: {
		main: '#90caf9',
		light: 'rgb(166, 212, 250)',
		dark: 'rgb(100, 141, 174)',
		contrastText: 'rgba(0, 0, 0, 0.87)',
	},
	secondary: {
		light: '#ffb74d',
		main: '#f9b934',
		dark: '#f57c00',
		contrastText: 'rgba(0, 0, 0, 0.87)',
	},
	text: {
		primary: '#EEEEEF',
		secondary: '#AEB0B4',
	},
	divider: 'rgba(255, 255, 255, 0.12)',
	background: {
		paper: '#1A202C',
		default: '#121212',
		level2: '#333',
		level1: '#2D3748',
		footer: '#18181f',
		activeDevice: 'rgba(17, 17, 17, 0.8)',
	},
};
