// react libraries
import { useEffect, useContext } from 'react';

// third-party libraries
import { Snackbar, useMediaQuery } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { ComponentContext } from '@context/ComponentContext';
import { useSnackStyles } from '@components/SnackBar/styles';
import { useTheme } from '@material-ui/core/styles';

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

	const theme = useTheme();
	const isSm = useMediaQuery(theme.breakpoints.up('sm'), {
		defaultMatches: true,
	});

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
					isSm
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
