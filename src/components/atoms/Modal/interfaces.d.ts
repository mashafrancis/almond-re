import { ReactNode } from 'react';
import { WithStyles } from '@material-ui/core/styles';

export interface ModalProps extends WithStyles<typeof styles> {
	isModalOpen: boolean;
	renderHeader: ReactNode | string | null;
	renderContent?: ReactNode;
	renderDialogText?: ReactNode;
	fullScreen?: boolean;
	onClose?: (e?) => void;
	submitButtonName?: string;
	disabled?: boolean;
	onSubmit?: (e?) => void;
	onDismiss?: (e?) => void;
	innerRef?: any;
}
