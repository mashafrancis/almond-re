import { ReactNode } from 'react';

export interface AnalyticsCardProps {
	icon?: ReactNode;
	mainInfo: string;
	subInfo: string;
	colorClass?: string;
	onClick?: () => void;
}
