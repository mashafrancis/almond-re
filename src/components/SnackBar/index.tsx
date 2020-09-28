// react libraries
import React, { useEffect, useContext } from 'react';

// third-party libraries
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { ComponentContext } from '@context/ComponentContext';
import { useSnackStyles } from '@components/SnackBar/styles';
import useViewport from '../../hooks/useViewport';

// interfaces
import { SnackMessageProps } from './interfaces';

// styles

export const SnackBar = ({ snack }: SnackMessageProps): JSX.Element => {
	const classes = useSnackStyles();
	const componentContext = useContext(ComponentContext);
	const {
		isSnackOpen,
		handleCloseSnack,
		snackMessage,
		setSnackMessage,
		setOpenSnack,
	} = componentContext;

	const { width } = useViewport();
	const breakpoint = 539;

	useEffect(() => {
		const { message } = snack;
		setSnackMessage(message);
		setOpenSnack(!!message);
	}, [snack]);

	const Alert = (alertProps: AlertProps) => (
		<MuiAlert elevation={6} variant="filled" {...alertProps} />
	);
	return (
		<div className={classes.root}>
			<Snackbar
				anchorOrigin={
					width > breakpoint
						? { vertical: 'top', horizontal: 'center' }
						: { vertical: 'bottom', horizontal: 'center' }
				}
				open={isSnackOpen}
				autoHideDuration={6000}
				onClose={handleCloseSnack}
			>
				<div data-testid="snack-message">
					<Alert onClose={handleCloseSnack} severity="success">
						{snackMessage}
					</Alert>
				</div>
			</Snackbar>
		</div>
	);
};

export default SnackBar;
