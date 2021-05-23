import clsx from 'clsx';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import { ButtonBase, Card, Grid, Stack } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { AnalyticsCardProps } from './interfaces';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		details: {
			display: 'flex',
			flexDirection: 'row',
		},
		content: {
			flex: '1 0 auto',
			flexDirection: 'row',
			width: '100%',
		},
		title: {
			fontWeight: 500,
		},
		cardPaper: {
			borderRadius: 12,
		},
		image: {
			width: 128,
			height: 128,
		},
		mainInfoText: {
			fontWeight: 500,
		},
		subInfoText: {
			fontWeight: 600,
			// [theme.breakpoints.up('xl')]: {
			//   fontSize: 12
			// },
		},
		mainCard: {
			[theme.breakpoints.down('sm')]: {
				paddingTop: '0 !important',
				marginBottom: 8,
			},
		},
		yellowCard: {
			color: '#f29900 !important',
			backgroundColor: '#fef7e0',
			borderColor: 'rgba(242, 153, 0, 0.2) !important',
		},

		blueCard: {
			color: '#1967d2 !important',
			backgroundColor: '#e8f0fe',
			borderColor: 'rgba(25, 103, 210, 0.2) !important',
		},

		purpleCard: {
			color: '#512da8 !important',
			backgroundColor: '#f3e8fd',
			borderColor: 'rgba(81, 45, 168, 0.2) !important',
		},

		brownCard: {
			color: '#3e2723 !important',
			backgroundColor: '#efebe9',
			borderColor: 'rgba(62, 39, 35, 0.2) !important',
		},

		redCard: {
			color: '#821721 !important',
			backgroundColor: 'rgba(130, 23, 33, 0.12)',
			borderColor: 'rgba(210, 43, 53, 0.2) !important',
		},

		greenCard: {
			color: '#1b5e20 !important',
			backgroundColor: '#e8f5e9',
			borderColor: 'rgba(27, 94, 32, 0.2) !important',
		},
	}),
);

const AnalyticsCard = ({
	icon,
	mainInfo,
	subInfo,
	colorClass,
	onClick,
}: AnalyticsCardProps): JSX.Element => {
	const classes = useStyles();

	return (
		<Grid item lg={4} md={6} xs={12} className={classes.mainCard}>
			<Card
				className={clsx(classes.root, classes.cardPaper, classes[colorClass!])}
				style={{ cursor: 'pointer' }}
				variant="outlined"
				onClick={onClick}
				data-testid="analytics-card"
			>
				<CardContent className={classes.content}>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
						spacing={2}
					>
						<Grid item xs={1} md={2}>
							<ButtonBase>{icon}</ButtonBase>
						</Grid>
						<Grid item xs={10} sm container>
							<Grid
								item
								container
								justifyContent="space-between"
								alignItems="center"
								direction="row"
								style={{ display: 'flex', width: '100%' }}
							>
								<Typography
									className={clsx(classes.mainInfoText, colorClass)}
									variant="h6"
									data-testid="main-info"
								>
									{mainInfo}
								</Typography>
								<Typography
									variant="h4"
									className={clsx(classes.subInfoText, colorClass)}
									data-testid="sub-info"
								>
									{subInfo}
								</Typography>
							</Grid>
						</Grid>
					</Stack>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default AnalyticsCard;
