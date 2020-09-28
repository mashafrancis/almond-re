export interface ToggleButtonProps {
	onClick?: () => void;
	onChange?: () => void;
	isChecked?: boolean;
	id?: string;
	isActive?: boolean;
	ariaLabel?: string;
	classes: string;
}
