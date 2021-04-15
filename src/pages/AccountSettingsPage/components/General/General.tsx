import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
	useMediaQuery,
	Grid,
	Typography,
	TextField,
	Button,
	Divider,
} from '@material-ui/core';
import { shallowEqual, useSelector } from 'react-redux';
import { ViewComponentProps } from '../../../../types/ViewComponentProps';
import { IRootState } from '../../../../store/rootReducer';

const useStyles = makeStyles((theme) => ({
	inputTitle: {
		fontWeight: 700,
		marginBottom: theme.spacing(1),
	},
}));

const General = ({ className, ...rest }: ViewComponentProps): JSX.Element => {
	const { firstName, lastName, email } = useSelector(
		(globalState: IRootState) => globalState.user.userDetails,
		shallowEqual,
	);

	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	return (
		<div className={className} {...rest}>
			<Grid container spacing={isMd ? 4 : 2}>
				<Grid item xs={12}>
					<Typography variant="h6" color="textPrimary">
						Basic Information
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Divider />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						label="First Name"
						variant="outlined"
						size="medium"
						name="firstName"
						fullWidth
						type="text"
						defaultValue={firstName ?? ''}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						label="Last Name"
						variant="outlined"
						size="medium"
						name="lastName"
						fullWidth
						type="text"
						defaultValue={lastName ?? ''}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						label="Email Address"
						variant="outlined"
						size="medium"
						name="email"
						fullWidth
						type="email"
						defaultValue={email ?? ''}
					/>
				</Grid>
				<Grid item container justify="flex-start" xs={12}>
					<Button
						variant="contained"
						type="submit"
						color="primary"
						size="large"
					>
						Save
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};

export default General;
