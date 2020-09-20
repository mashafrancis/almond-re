import { ReactNode } from 'react';

export interface ComponentContextProps {
	children: ReactNode;
}

export interface ComponentContextState {
	isOpen: boolean;
	isMenuOpen: boolean;
	selectedIndex: {
		group: number;
		item: number;
	};
	isSelectDeviceModalOpen: boolean;
	isActivityDrawerOpen: boolean;
	activityLogsViewed: boolean;
	isSnackOpen: boolean;
	snackMessage: string;
}
