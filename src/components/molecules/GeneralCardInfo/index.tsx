import {
	ButtonBase,
	Card,
	Grid,
	Stack,
	useMediaQuery,
} from '@material-ui/core';
import clsx from 'clsx';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {
	createStyles,
	makeStyles,
	Theme,
	useTheme,
} from '@material-ui/core/styles';
import { GeneralCardInfoProps } from './interfaces';

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
				marginBottom: 8,
			},
		},
		iconBase: {
			padding: 6,
			borderRadius: 8,
			backgroundColor: 'rgba(25, 103, 210, 0.11)',
			color: '#2573b5',
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
						justifyContent="space-between"
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
							justifyContent="center"
						>
							<ButtonBase className={classes.iconBase}>{icon}</ButtonBase>
						</Grid>
						<Grid
							item
							container
							// xl={8}
							xs={8}
							// justifyContent="space-between"
							// alignItems="flex-start"
							// direction="column"
							// style={{ display: 'flex', width: '100%' }}
						>
							<Stack spacing={0}>
								<Typography variant="h6" color="primary" data-testid="header">
									{mainHeader}
								</Typography>
								<Typography
									variant={isMd ? 'subtitle1' : 'body2'}
									data-testid="sub-header"
									// className={clsx(classes.subInfoText)}
								>
									{subHeader}
								</Typography>
							</Stack>
						</Grid>
						<Grid
							item
							container
							// xl={3}
							xs={2}
							direction="row"
							alignItems="center"
							justifyContent="flex-end"
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
