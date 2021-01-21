import { forwardRef } from 'react';
// components
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@material-ui/core';
// interfaces
import { ModalProps } from '@components/Modal/interfaces';
// styles
import './Modal.scss';

const Modal = forwardRef(
	(
		{
			isModalOpen,
			renderContent,
			fullScreen,
			onClose,
			renderHeader,
			submitButtonName,
			onSubmit,
			onDismiss,
			disabled,
		}: ModalProps,
		ref,
	): JSX.Element => {
		return (
			<Dialog
				ref={ref}
				className="modal-dialog"
				open={isModalOpen}
				fullScreen={fullScreen}
				onClose={onClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle data-testid="header" id="responsive-dialog-title">
					<p className="headline-3 modal-header">{renderHeader()}</p>
				</DialogTitle>
				<DialogContent className="modal-content">
					{renderContent()}
				</DialogContent>
				<DialogActions>
					<Button name="Dismiss" onClick={onDismiss} variant="text" />
					<Button
						name={submitButtonName as string}
						onClick={onSubmit}
						variant="contained"
						disabled={disabled}
					/>
				</DialogActions>
			</Dialog>
		);
	},
);

export default Modal;
