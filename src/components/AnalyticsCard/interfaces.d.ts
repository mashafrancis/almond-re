import { ReactNode } from 'react';

type color =
	| 'blueCard'
	| 'yellowCard'
	| 'purpleCard'
	| 'redCard'
	| 'greenCard'
	| 'brownCard';

export interface AnalyticsCardProps {
	icon?: ReactNode;
	mainInfo: string;
	subInfo: string;
	colorClass?: color;
	onClick?: () => void;
}
