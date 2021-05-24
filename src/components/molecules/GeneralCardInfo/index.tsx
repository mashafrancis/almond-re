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
import { createStyles, makeStyles } from '@material-ui/styles';
import { Theme, useTheme } from '@material-ui/core/styles';
import { Image } from '@components/atoms';
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
			fontSize: 14,
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

	const renderIcon = (param) => {
		if (typeof param === 'string' || param instanceof String) {
			return <Image src={param as string} alt="almond" lazy={false} />;
		}
		return <ButtonBase className={classes.iconBase}>{param}</ButtonBase>;
	};

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
						{icon && (
							<Grid
								item
								container
								xs={2}
								direction="row"
								alignItems="center"
								justifyContent="center"
							>
								{renderIcon(icon)}
							</Grid>
						)}
						<Grid item container xs={icon ? 8 : 12}>
							<Stack spacing={0}>
								<Typography variant="h6" color="primary" data-testid="header">
									{mainHeader}
								</Typography>
								<Typography
									variant={isMd ? 'subtitle1' : 'body2'}
									data-testid="sub-header"
									className={classes.subInfoText}
								>
									{subHeader}
								</Typography>
							</Stack>
						</Grid>
						<Grid
							item
							container
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
