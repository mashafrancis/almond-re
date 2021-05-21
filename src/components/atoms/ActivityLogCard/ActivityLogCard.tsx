import { Card } from '@material-ui/core';
import dayjs from 'dayjs';
// interfaces
import CardContent from '@material-ui/core/CardContent';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { ActivityLogCardProps } from './interfaces';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			margin: 4,
		},
		details: {
			display: 'flex',
			flexDirection: 'row',
		},
		content: {
			flex: '1 0 auto',
			flexDirection: 'column',
			width: '100%',
			paddingBottom: '10px !important',
			paddingTop: 10,
			paddingLeft: 10,
			paddingRight: 10,
		},
		mainCard: {
			[theme.breakpoints.down('sm')]: {
				paddingTop: '0 !important',
			},
		},
		info: {
			color: '#0e5827',
			backgroundColor: '#e6f4ea',
		},
		error: {
			color: '#821721',
			backgroundColor: 'rgba(210, 43, 53, 0.12)',
		},
	}),
);

const ActivityLogCard = ({
	log,
	date,
	type,
}: ActivityLogCardProps): JSX.Element => {
	const classes = useStyles();
	return (
		<Card
			variant="outlined"
			className={clsx(
				classes.root,
				type === 'info' ? classes.info : classes.error,
			)}
		>
			<CardContent className={classes.content}>
				<Typography variant="body2" data-testid="header">
					{log}
				</Typography>
				<Typography
					variant="caption"
					style={{ fontWeight: 600 }}
					data-testid="details"
				>
					{`${dayjs(date).format('HH:mm:ss')}`}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default ActivityLogCard;
