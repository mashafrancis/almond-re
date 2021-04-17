import { ReactNode } from 'react';
// components
import {
	Button,
	Dialog,
	DialogContentText,
	IconButton,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import {
	createStyles,
	Theme,
	withStyles,
	WithStyles,
} from '@material-ui/core/styles';
// interfaces
import { ModalProps } from '@components/atoms/Modal/interfaces';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';

const styles = (theme: Theme) =>
	createStyles({
		root: {
			margin: 0,
			padding: theme.spacing(2),
		},
		modalPaper: {
			borderRadius: 12,
			width: 360,
		},
		title: {
			backgroundColor: 'rgba(66, 133, 244, 0.15)',
		},
		closeButton: {
			position: 'absolute',
			right: theme.spacing(1),
			top: theme.spacing(1),
			color: theme.palette.grey[500],
		},
	});

export interface DialogTitleProps extends WithStyles<typeof styles> {
	id: string;
	children: ReactNode;
	onClose?: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle
			disableTypography
			className={clsx(classes.root, classes.title)}
			{...other}
		>
			<Typography variant="h6" color="primary">
				{children}
			</Typography>
			{onClose ? (
				<IconButton
					aria-label="close"
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme: Theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions);

const Modal = withStyles(styles)(
	({
		isModalOpen,
		renderContent,
		fullScreen,
		onClose,
		renderHeader,
		submitButtonName,
		onSubmit,
		onDismiss,
		disabled = false,
		renderDialogText,
		classes,
		...rest
	}: ModalProps): JSX.Element => {
		return (
			<Dialog
				open={isModalOpen}
				fullScreen={fullScreen}
				onClose={onClose}
				aria-labelledby="responsive-dialog-title"
				classes={{
					paper: classes.modalPaper,
				}}
				{...rest}
			>
				<DialogTitle
					data-testid="header"
					id="responsive-dialog-title"
					onClose={onClose}
				>
					{renderHeader}
				</DialogTitle>
				<DialogContent>
					<DialogContentText
						gutterBottom
						style={{ marginBottom: 0, paddingBottom: 10 }}
					>
						{renderDialogText}
					</DialogContentText>
					{renderContent}
				</DialogContent>
				<DialogActions>
					<Button variant="text" color="primary" onClick={onDismiss}>
						Dismiss
					</Button>
					<Button
						autoFocus
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
	},
);

export default Modal;
