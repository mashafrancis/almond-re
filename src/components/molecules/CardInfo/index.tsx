import clsx from 'clsx';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import { Button, ButtonBase, Card, Fab, Grid } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import useViewport from '@hooks/useViewport';
// interfaces
import { CardInfoProps } from './interfaces';
// styles
import './CardInfo.scss';

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
			[theme.breakpoints.down('sm')]: {
				paddingTop: '0 !important',
			},
		},
	}),
);

const CardInfo = ({
	mainHeader,
	subHeader,
	buttonName,
	onClick,
	icon,
}: CardInfoProps): JSX.Element => {
	const classes = useStyles();
	const renderCardButton = () => (
		<div className="card-content__button">
			{width > breakpoint ? (
				<Button color="primary" variant="contained" onClick={onClick}>
					{buttonName}
				</Button>
			) : (
				<Fab
					size="small"
					color="primary"
					aria-label="add"
					onClick={onClick}
					data-testid="fab"
				>
					<Add />
				</Fab>
			)}
		</div>
	);
	const { width } = useViewport();
	const breakpoint = 539;

	return (
		<Grid item xs={12} className={classes.mainCard}>
			<Card
				className={clsx(classes.root, classes.cardPaper)}
				style={{ cursor: 'pointer' }}
				variant="outlined"
				data-testid="analytics-card"
			>
				<CardContent className={classes.content}>
					<Grid
						item
						container
						direction="row"
						justifyContent="space-between"
						alignItems="center"
						spacing={2}
						style={{ display: 'flex' }}
						xs={12}
					>
						<Grid
							item
							container
							xs={2}
							direction="row"
							alignItems="center"
							justifyContent="center"
						>
							<ButtonBase>{icon}</ButtonBase>
						</Grid>
						<Grid
							item
							container
							xs={8}
							justifyContent="space-between"
							alignItems="flex-start"
							direction="column"
							style={{ display: 'flex', width: '100%' }}
						>
							<Typography variant="h5" color="primary" data-testid="header">
								{mainHeader}
							</Typography>
							<Typography
								variant="subtitle1"
								// className={clsx(classes.subInfoText)}
							>
								{subHeader}
							</Typography>
						</Grid>
						<Grid
							item
							container
							xs={2}
							direction="row"
							alignItems="center"
							justifyContent="flex-end"
						>
							{renderCardButton()}
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default CardInfo;
