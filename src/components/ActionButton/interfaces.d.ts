import { ReactNode } from 'react';

export interface ActionButtonProps {
	name: string;
	startIcon?: ReactNode;
	endIcon?: ReactNode;
	handleClick?: any;
	variant: 'contained' | 'outlined' | 'text';
	disabled?: boolean;
}
