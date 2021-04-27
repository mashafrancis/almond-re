import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Button, Typography } from '@material-ui/core';

import { Image, LearnMoreLink } from '@components/atoms';
import { SectionHeader } from '@components/molecules';
import { ViewComponentProps } from '../../../../types/ViewComponentProps';

const useStyles = makeStyles((theme) => ({
	listGrid: {
		overflow: 'hidden',
		marginBottom: theme.spacing(3),
		'&:last-child': {
			marginBottom: theme.spacing(0),
		},
	},
	image: {
		width: '100%',
	},
}));

const Solutions = ({
	data,
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
			<SectionHeader
				title={
					<span>
						Meet Almond{' '}
						<Typography component="span" variant="inherit" color="primary">
							Hydroponics Farming
						</Typography>
					</span>
				}
				subtitle="Join the food revolution as we bring the farm next to you. Here’s how you can go about with it:"
				fadeUp
			/>
			<Grid container justify="center">
				{data.map((item: any, index: number) => (
					<Grid
						key={index}
						item
						container
						spacing={isMd ? 4 : 2}
						data-aos="fade-up"
						alignItems="center"
						justify="space-between"
						direction={index % 2 === 1 ? 'row-reverse' : 'row'}
						className={classes.listGrid}
					>
						<Grid item xs={12} sm={6}>
							<SectionHeader
								titleVariant="h6"
								subtitleVariant="body1"
								title={item.title}
								subtitle={item.description}
								ctaGroup={[
									<LearnMoreLink title="Learn more" variant="body1" />,
								]}
								align="left"
								disableGutter
							/>
						</Grid>
						<Grid item container justify="center" xs={12} sm={6}>
							<Image
								src={item.illustration}
								alt={item.label}
								className={classes.image}
							/>
						</Grid>
					</Grid>
				))}
				<Grid item container justify="center" xs={12}>
					<Button
						variant="contained"
						color="primary"
						size={isMd ? 'large' : 'medium'}
					>
						Buy Now
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};

export default Solutions;
