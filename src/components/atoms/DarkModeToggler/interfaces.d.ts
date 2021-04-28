import * as React from 'react';
import { defaultProperties } from '@components/atoms/DarkModeToggler/DarkModeToggler';

type SVGProps = Omit<React.HTMLAttributes<HTMLOrSVGElement>, 'onChange'>;
export interface DarkModeTogglerProps extends SVGProps {
	/**
	 * External classes
	 */
	className?: string;
	/**
	 * The theme mode
	 */
	themeMode: string;
	/**
	 * Theme toggler function
	 */
	onChange: (event: any) => void;
	/**
	 * Color of the icon
	 */
	fontIconColor?: string;

	style?: React.CSSProperties;
	size?: number;
	animationProperties?: typeof defaultProperties;
	moonColor?: string;
	sunColor?: string;

	// All other props
	[x: string]: any;
}
