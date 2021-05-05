import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid } from '@material-ui/core';
import { Image } from '@components/atoms';
import { SectionHeader } from '@components/molecules';
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
			<Grid container spacing={isMd ? 4 : 2}>
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
				<Grid item container alignItems="center" xs={12} md={6}>
					<SectionHeader
						title="Hydroponics technology designed for home."
						subtitle="Keep track of what's happening with your data, change permissions, and run reports against your data anywhere in the world."
						subtitleVariant="body1"
						// subtitleColor="textPrimary"
						data-aos="fade-up"
						align="left"
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default AboutBottom;
