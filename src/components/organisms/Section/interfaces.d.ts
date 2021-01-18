import { ReactNode } from 'react';

export interface SectionProps {
	/**
	 * External classes
	 */
	className?: string;
	/**
	 * Children to placed inside the section
	 */
	children?: ReactNode;
	/**
	 * Should show narrow sections
	 */
	narrow?: boolean;
	/**
	 * Should the section be full width
	 */
	fullWidth?: boolean;
	/**
	 * Should the section render with no padding
	 */
	disablePadding?: boolean;
	alternate?: any;
}
