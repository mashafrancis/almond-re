import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Box } from '@material-ui/core';
import { Image } from '@components/atoms';
import fancyId from '@utils/fancyId';
import { ViewComponentProps } from '../../../../types/ViewComponentProps';

const useStyles = makeStyles((theme) => ({
	folioItem: {
		position: 'relative',
		overflow: 'hidden',
		borderRadius: theme.shape.borderRadius,
		margin: theme.spacing(1, 0),
		[theme.breakpoints.up('sm')]: {
			margin: theme.spacing(1),
		},
		'&:last-child': {
			marginBottom: 0,
		},
		'&:hover': {
			'& .folio__image': {
				transform: 'scale(1.2)',
			},
		},
	},
	image: {
		transitionDuration: '.7s',
		transform: 'scale(1.0)',
		minHeight: 150,
		objectFit: 'cover',
		[theme.breakpoints.up('md')]: {
			minHeight: 300,
		},
	},
	folioInfoWrapper: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		backgroundImage:
			'linear-gradient(to bottom, rgba(0, 0, 0, 0) 2%, #000000)',
		padding: theme.spacing(4, 2),
		[theme.breakpoints.up('md')]: {
			padding: theme.spacing(6),
		},
	},
	folioTitle: {
		color: 'white',
		fontWeight: 'bold',
	},
	folioSubtitle: {
		color: 'white',
		margin: theme.spacing(1, 0),
	},
	grid: {
		display: 'flex',
		flexDirection: 'row',
		[theme.breakpoints.up('sm')]: {
			maxWidth: 500,
			margin: '0 auto',
		},
		[theme.breakpoints.up('md')]: {
			flexDirection: 'row',
			maxWidth: '100%',
		},
	},
	gridWrapper: {
		display: 'flex',
		flexDirection: 'column',
	},
}));

const PlantPhotos = ({
	data,
	className,
	...rest
}: ViewComponentProps): JSX.Element => {
	const classes = useStyles();

	return (
		<div className={className} {...rest}>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={1}>
					<Grid container item spacing={1}>
						{data.map((item: any) => (
							<Grid item xs={6} sm={6} md={4} lg={3} key={fancyId()}>
								<div className={classes.folioItem} data-aos="fade-up">
									<Image
										src={item.cover}
										alt={item.title}
										className={clsx('folio__image', classes.image)}
										lazy={false}
									/>
									<div className={classes.folioInfoWrapper}>
										<div>
											<Typography variant="h6" className={classes.folioTitle}>
												{item.title}
											</Typography>
										</div>
									</div>
								</div>
							</Grid>
						))}
					</Grid>
				</Grid>
			</Box>
		</div>
	);
};

export default PlantPhotos;
