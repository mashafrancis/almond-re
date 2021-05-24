import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { CardBaseProps } from '@components/organisms/CardBase/interfaces';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
		width: '100%',
		borderRadius: 12,
		borderStyle: 'solid',
		border: 0.8,
		borderColor: theme.palette.cardShadow,
	},
	withShadow: {
		boxShadow: `0 2px 10px 0 ${theme.palette.cardShadow}`,
	},
	noShadow: {
		boxShadow: 'none',
	},
	noBorder: {
		border: 0,
	},
	noBg: {
		background: 'transparent',
	},
	liftUp: {
		transition:
			'box-shadow .25s ease,transform .25s ease,-webkit-transform .25s ease',
		'&:hover': {
			boxShadow:
				'0 1.5rem 2.5rem rgba(22,28,45,.1),0 .3rem 0.5rem -.50rem rgba(22,28,45,.05) !important',
			transform: 'translate3d(0,-5px,0)',
		},
	},
	content: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: theme.spacing(4, 2),
		'&:last-child': {
			padding: theme.spacing(4, 2),
		},
		[theme.breakpoints.up('md')]: {
			padding: theme.spacing(6, 3),
			'&:last-child': {
				padding: theme.spacing(6, 3),
			},
		},
	},
	left: {
		alignItems: 'flex-start',
	},
	right: {
		alignItems: 'flex-end',
	},
	center: {
		alignItems: 'center',
	},
	action: {
		margin: 0,
	},
	title: {
		fontWeight: 500,
		backgroundColor: 'rgba(25, 103, 210, 0.11)',
		padding: '6px 20px',
		borderRadius: 6,
		width: 'fit-content',
	},
}));

/**
 * Component to display the basic card
 *
 * @param {Object} props
 */
const CardBase = ({
	withShadow,
	noShadow,
	noBorder,
	noBg,
	liftUp,
	children,
	align = 'center',
	className,
	cardContentProps = {},
	heading,
	actionItem,
	...rest
}: CardBaseProps): JSX.Element => {
	const classes = useStyles();

	return (
		<Card
			className={clsx(
				'card-base',
				classes.root,
				withShadow ? classes.withShadow : {},
				noShadow ? classes.noShadow : {},
				noBorder ? classes.noBorder : {},
				noBg ? classes.noBg : {},
				liftUp ? classes.liftUp : {},
				className,
			)}
			{...rest}
		>
			{heading && (
				<CardHeader
					classes={{
						action: classes.action,
					}}
					title={
						<Typography
							className={classes.title}
							variant="subtitle2"
							color="primary"
							data-testid="header"
						>
							{heading}
						</Typography>
					}
					action={actionItem}
				/>
			)}
			<CardContent
				className={clsx('card-base__content', classes.content, classes[align])}
				{...cardContentProps}
			>
				{children}
			</CardContent>
		</Card>
	);
};

export default CardBase;
