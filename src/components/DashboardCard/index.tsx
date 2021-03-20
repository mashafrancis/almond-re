import {
	ButtonBase,
	Card,
	Grid,
	CardContent,
	CardHeader,
} from '@material-ui/core';
// interfaces
// styles
// import './DashboardCard.scss';
import clsx from 'clsx';

import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { DashboardCardProps } from './interfaces';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			height: '-webkit-fit-content',
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
			backgroundColor: 'rgba(25, 103, 210, 0.11)',
			padding: '6px 20px',
			borderRadius: 6,
			width: 'fit-content',
		},
		cardPaper: {
			borderRadius: 16,
		},
		image: {
			width: 128,
			height: 128,
		},
		subInfoText: {
			fontWeight: 500,
			// [theme.breakpoints.up('xl')]: {
			//   fontSize: 12
			// },
		},
		mainCard: {
			height: '-webkit-fit-content',
			[theme.breakpoints.down('sm')]: {
				paddingTop: '0 !important',
			},
		},
		action: {
			margin: 0,
		},
	}),
);

const DashboardCard = ({
	heading,
	actionItem,
	body,
	styles,
}: DashboardCardProps): JSX.Element => {
	const classes = useStyles();
	return (
		<Grid item xs={12} className={classes.mainCard}>
			<Card
				className={clsx(classes.root, classes.cardPaper)}
				variant="outlined"
				data-testid="dashboard-card"
				style={styles}
			>
				<CardHeader
					classes={{
						action: classes.action,
					}}
					title={
						<Typography
							className={classes.title}
							variant="subtitle2"
							color="primary"
						>
							{heading}
						</Typography>
					}
					action={actionItem}
				/>
				<CardContent className={classes.content}>
					<Grid
						item
						container
						direction="column"
						justify="center"
						alignItems="center"
						spacing={2}
						style={{ display: 'flex', textAlign: 'center', margin: 0 }}
						xs={12}
					>
						{body}
					</Grid>
				</CardContent>
			</Card>
		</Grid>
		// <Card variant="outlined" style={{ borderRadius: 16 }}>
		// 	<div className="dashboard-card">
		// 		<div className="card-header">
		// 			<h5 data-testid="heading" className="card-header__title">
		// 				{heading}
		// 			</h5>
		// 			<div className="card-header__right-header">{actionItem}</div>
		// 		</div>
		// 		<div data-testid="body" className={`${classes} card-body`}>
		// 			{body}
		// 		</div>
		// 	</div>
		// </Card>
	);
};

export default DashboardCard;
