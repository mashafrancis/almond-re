import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, IconButton } from '@material-ui/core';
import { Image, LearnMoreLink } from '@components/atoms';
import { SectionHeader } from '@components/molecules';
import { NavLink } from 'react-router-dom';
import fancyId from '@utils/fancyId';
import { ViewComponentProps } from '../../../../types/ViewComponentProps';

import productImage1 from '../../../../assets/images/product-2.png';
import plant1 from '../../../../assets/images/plant-1.png';

const useStyles = makeStyles((theme) => ({
	root: {
		background: theme.palette.primary.light,
		borderRadius: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		[theme.breakpoints.up('md')]: {
			paddingBottom: 0,
		},
	},
	textWhite: {
		color: 'white',
		fontSize: 16,
	},
	title: {
		fontSize: 22,
	},
	image: {
		objectFit: 'contain',
		maxWidth: '90%',
		width: 300,
	},
	imageLeft: {
		objectFit: 'cover',
	},
	copy: {
		margin: theme.spacing(2, 0),
		padding: theme.spacing(0, 2),
	},
}));

const Overview = ({ className, ...rest }: ViewComponentProps): JSX.Element => {
	const classes = useStyles();

	return (
		<div className={clsx(classes.root, className)} {...rest}>
			<Grid container data-aos="fade-up">
				<Grid item container alignItems="flex-start" xs={12} md={4}>
					<Image
						src={productImage1}
						srcSet={productImage1}
						className={clsx(classes.image, classes.imageLeft)}
						lazy={false}
					/>
				</Grid>
				<Grid
					item
					container
					alignItems="center"
					xs={12}
					md={4}
					className={classes.copy}
				>
					<SectionHeader
						title={
							<span className={clsx(classes.textWhite, classes.title)}>
								Find more products
							</span>
						}
						subtitle={
							<span className={classes.textWhite}>
								The AI-powered vertical indoor garden system will let you choose
								from more than 20 fruits, vegetables, herbs and greens.
							</span>
						}
						ctaGroup={[
							<NavLink key={fancyId()} to="/resources">
								<Button variant="contained" color="primary" size="medium">
									<LearnMoreLink title="Learn More" href="about" />
								</Button>
							</NavLink>,
						]}
						align="center"
						disableGutter
					/>
				</Grid>
				<Grid item container justifyContent="flex-end" xs={12} md={4}>
					<Image
						src={plant1}
						srcSet={plant1}
						className={classes.image}
						lazy={false}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default Overview;
