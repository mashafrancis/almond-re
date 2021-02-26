import { GeneralCardInfoProps } from './interfaces';
// styles
import './GeneralCardInfo.scss';
import { ButtonBase, Card, Grid, useMediaQuery } from '@material-ui/core';
import clsx from 'clsx';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {
	createStyles,
	makeStyles,
	Theme,
	useTheme,
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			// flexGrow: 1,
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
			paddingBottom: 0,
			[theme.breakpoints.down('sm')]: {
				paddingTop: '0 !important',
			},
		},
	}),
);

const GeneralCardInfo = ({
	mainHeader,
	subHeader,
	actionItem,
	icon,
}: GeneralCardInfoProps): JSX.Element => {
	const classes = useStyles();
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	return (
		<Grid item xs={12} className={classes.mainCard}>
			<Card
				className={clsx(classes.root, classes.cardPaper)}
				variant="outlined"
				data-testid="general-card-info"
			>
				<CardContent className={classes.content}>
					<Grid
						item
						container
						direction="row"
						justify="space-between"
						alignItems="center"
						// spacing={2}
						style={{ display: 'flex' }}
						xs={12}
					>
						<Grid
							item
							container
							// xl={1}
							xs={2}
							direction="row"
							alignItems="center"
							justify="center"
						>
							<ButtonBase>{icon}</ButtonBase>
						</Grid>
						<Grid
							item
							container
							// xl={8}
							xs={7}
							justify="space-between"
							alignItems="flex-start"
							direction="column"
							style={{ display: 'flex', width: '100%' }}
						>
							<Typography variant="h6" color="primary">
								{mainHeader}
							</Typography>
							<Typography
								variant={isMd ? 'subtitle1' : 'body2'}
								// className={clsx(classes.subInfoText)}
							>
								{subHeader}
							</Typography>
						</Grid>
						<Grid
							item
							container
							// xl={3}
							xs={3}
							direction="row"
							alignItems="center"
							justify="flex-end"
						>
							{actionItem}
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default GeneralCardInfo;
