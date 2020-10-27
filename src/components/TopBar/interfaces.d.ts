import { ReactElement } from 'react';

export interface TopBarProps {
	openProfileDialog?: (e?) => void;
	isActivityLogsEmpty: boolean;
	window?: () => Window;
	children?: ReactElement;
	toggleRoleChangeDialog: any;
}

export interface ElevationBarProps {
	window?: () => Window;
	children: ReactElement;
}
