export interface DashboardState {
	isOpen: boolean;
	isLoading: boolean;
	isFeedbackMenuOpen: boolean;
	isFeedbackModal: boolean;
	isProfileMenuOpen: boolean;
	device: string;
	action: string;
	feedback: '';
	fields: {
		[key: string]: string | number;
	};
	isChangeRoleDialogOpen: boolean;
	anchorEl: null | HTMLElement;
	roleSelected: string;
	roleId: string;
}
