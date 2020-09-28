import { ReactNode } from 'react';

export interface MenuComponentProps {
	primaryText: string;
	component: any;
	icon: ReactNode;
}

export interface MenuBottomProps {
	label: string;
	icon: ReactNode;
	value: string;
}
