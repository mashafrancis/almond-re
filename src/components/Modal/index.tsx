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
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	modalPaper: {
		borderRadius: 12,
		width: 360,
	},
	title: {
		backgroundColor: 'rgba(66, 133, 244, 0.15)',
		marginBottom: 6,
		padding: '10px 24px',
	},
	header: {
		fontWeight: 500,
	},
	content: {
		marginTop: 0,
		marginBottom: 10,
	},
}));

const Modal = ({
	isModalOpen,
	renderContent,
	fullScreen,
	onClose,
	renderHeader,
	submitButtonName,
	onSubmit,
	onDismiss,
	disabled,
}: ModalProps): JSX.Element => {
	const classes = useStyles();
	return (
		<Dialog
			open={isModalOpen}
			fullScreen={fullScreen}
			onClose={onClose}
			aria-labelledby="responsive-dialog-title"
			classes={{
				paper: classes.modalPaper,
			}}
		>
			<DialogTitle
				className={classes.title}
				data-testid="header"
				id="responsive-dialog-title"
			>
				<Typography variant="body1" color="primary" className={classes.header}>
					{renderHeader()}
				</Typography>
			</DialogTitle>
			<DialogContent>
				<Typography variant="subtitle1" className={classes.content}>
					{renderContent}
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button variant="text" color="primary" onClick={onDismiss}>
					Dismiss
				</Button>
				<Button
					variant="contained"
					color="primary"
					onClick={onSubmit}
					disabled={disabled}
				>
					{submitButtonName}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default Modal;
