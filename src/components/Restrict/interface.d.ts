import { ReactNode } from 'react';

export interface RestrictProps {
	authorize: string | string[];
	fallback?: ReactNode;
	children: ReactNode;
	strict: boolean;
}
