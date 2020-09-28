import { ReactElement, ReactNode } from 'react';

export interface TopBarProps {
	photoImage: ReactNode;
	openProfileDialog: (e?) => void;
	isActivityLogsEmpty: boolean;
	window?: () => Window;
	children?: ReactElement;
}

export interface ElevationBarProps {
	window?: () => Window;
	children: ReactElement;
}
