import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Button } from '@material-ui/core';
import { Image } from '@components/atoms';
import { SectionHeader } from '@components/molecules';
import fancyId from '@utils/fancyId';
import { NavLink } from 'react-router-dom';
import { ViewComponentProps } from '../../../../types/ViewComponentProps';

const useStyles = makeStyles((theme) => ({
	title: {
		fontWeight: 'bold',
	},
	image: {
		maxWidth: 400,
		borderRadius: 10,
	},
}));

const AboutBottom = ({
	className,
	...rest
}: ViewComponentProps): JSX.Element => {
	const classes = useStyles();

	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	return (
		<div className={className} {...rest}>
			<Grid container spacing={4} direction={isMd ? 'row' : 'column-reverse'}>
				<Grid item container alignItems="center" xs={12} md={6}>
					<SectionHeader
						title="Try one of our produce."
						subtitle="With our hydroponics home farm, we grow sweet strawberries, perfect for eating anytime."
						// subtitleVariant="body1"
						// subtitleColor="textPrimary"
						data-aos="fade-up"
						align="left"
						ctaGroup={[
							<NavLink key={fancyId()} to="/store">
								<Button variant="contained" color="primary">
									Order now!
								</Button>
							</NavLink>,
						]}
					/>
				</Grid>
				<Grid
					item
					container
					justifyContent={isMd ? 'flex-start' : 'center'}
					xs={12}
					md={6}
				>
					<Image
						src="https://storage.googleapis.com/static.almondhydroponics.com/static/images/hydroponic-strawberries.jpg"
						srcSet="https://storage.googleapis.com/static.almondhydroponics.com/static/images/hydroponic-strawberries.jpg 2x"
						className={classes.image}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default AboutBottom;
