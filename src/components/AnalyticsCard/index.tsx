import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ButtonBase, Card, Grid } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { AnalyticsCardProps } from './interfaces';

import './AnalyticsCard.scss';

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
		subInfoText: {
			fontWeight: 600,
			// [theme.breakpoints.up('xl')]: {
			//   fontSize: 12
			// },
		},
		mainCard: {
			[theme.breakpoints.down('sm')]: {
				paddingTop: '0 !important',
			},
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
				className={clsx(classes.root, classes.cardPaper, colorClass)}
				style={{ cursor: 'pointer' }}
				variant="outlined"
				onClick={onClick}
				data-testid="analytics-card"
			>
				<CardContent className={classes.content}>
					<Grid
						item
						container
						direction="row"
						justify="space-between"
						alignItems="center"
						spacing={2}
						style={{ display: 'flex' }}
						xs={12}
					>
						<Grid item xs={1}>
							<ButtonBase>{icon}</ButtonBase>
						</Grid>
						<Grid item xs={10} sm container>
							<Grid
								item
								container
								justify="space-between"
								alignItems="center"
								direction="row"
								style={{ display: 'flex', width: '100%' }}
							>
								<Typography className={colorClass} variant="body1">
									{mainInfo}
								</Typography>
								<Typography
									variant="h4"
									className={clsx(classes.subInfoText, colorClass)}
								>
									{subInfo}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default AnalyticsCard;
