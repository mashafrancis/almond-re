import { DescriptionCta, SectionHeader } from '@components/molecules';
import {
	Grid,
	Stack,
	Button,
	useMediaQuery,
	Divider,
	Typography,
	Card,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Theme, useTheme } from '@material-ui/core/styles';
import { CardBase } from '@components/organisms';
import { AccessTimeTwoTone, FilterVintageTwoTone } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		'& .description-cta__button-group': {
			flexWrap: 'nowrap',
		},
	},
	title: {
		fontWeight: 'bold',
	},
	divider: {
		margin: theme.spacing(3, 0),
		[theme.breakpoints.up('md')]: {
			margin: theme.spacing(5, 0),
		},
	},
	textWhite: {
		color: 'white',
	},
	cardHighlighted: {
		background: theme.palette.primary.dark,
	},
	checkBox: {
		background: 'transparent',
		borderRadius: 0,
	},
	list: {
		marginBottom: theme.spacing(3),
		[theme.breakpoints.up('md')]: {
			marginBottom: theme.spacing(4),
		},
	},
	icon: {
		width: 70,
		height: 'auto',
	},
}));

interface Props {
	title: string;
	subtitle?: string;
	daysToSprout?: string;
	daysToMature?: string;
	[x: string]: any;
}

const SinglePlantBook = ({
	title,
	subtitle,
	daysToMature,
	daysToSprout,
	...rest
}: Props): JSX.Element => {
	const classes = useStyles();

	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	return (
		<div {...rest}>
			<DescriptionCta
				title={title}
				subtitle={subtitle}
				primaryCta={
					<Card variant="outlined" sx={{ padding: 3 }}>
						<Stack
							direction="column"
							justifyContent="center"
							alignItems="center"
							spacing={1}
							sx={{ border: '1px' }}
						>
							<FilterVintageTwoTone color="primary" fontSize="large" />
							<Typography
								variant="subtitle1"
								align="center"
								color="textPrimary"
							>
								Days to sprout
							</Typography>
							<Typography
								variant="body1"
								align="center"
								color="primary"
								fontWeight={700}
							>
								{daysToSprout}
							</Typography>
						</Stack>
					</Card>
				}
				secondaryCta={
					<Card variant="outlined" sx={{ padding: 3 }}>
						<Stack
							direction="column"
							justifyContent="center"
							alignItems="center"
							spacing={1}
						>
							<AccessTimeTwoTone color="primary" fontSize="large" />
							<Typography
								variant="subtitle1"
								align="center"
								color="textPrimary"
							>
								Matures in
							</Typography>
							<Typography
								variant="body1"
								align="center"
								color="primary"
								fontWeight={700}
							>
								{daysToMature}
							</Typography>
						</Stack>
					</Card>
				}
				align="left"
				titleProps={{
					variant: 'h4',
					className: classes.title,
					color: 'textPrimary',
				}}
				subtitleProps={{
					color: 'textPrimary',
				}}
			/>
			<Divider className={classes.divider} />

			<Grid container spacing={isMd ? 4 : 2}>
				<Grid item xs={12} md={8}>
					<SectionHeader
						title="Care and harvest"
						subtitle="We believe lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus feugiat elit vitae enim lacinia semper. Cras nulla lectus, porttitor vitae
                urna iaculis, malesuada tincidunt lectus. Proin nec tellus sit amet massa auctor
                imperdiet id vitae diam. Aenean gravida est nec diam suscipit iaculis.
                Praesent urna velit, auctor nec turpis et, vehicula lobortis sem.
                Vivamus convallis mi sagittis eleifend laoreet. Praesent vitae venenatis
                enim. Nulla tincidunt felis et lectus rhoncus laoreet."
						align="left"
						data-aos="fade-up"
						titleProps={{
							className: classes.title,
							color: 'textPrimary',
						}}
						subtitleProps={{
							variant: 'body1',
							color: 'textPrimary',
						}}
					/>
				</Grid>
				<Grid item xs={12} md={4}>
					<Grid container spacing={isMd ? 4 : 2} direction="column">
						<Grid item xs={12} data-aos="fade-up">
							<CardBase className={classes.cardHighlighted}>
								<SectionHeader
									title="Quick facts"
									subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus feugiat elit vitae enim lacinia semper."
									ctaGroup={[<Button variant="contained">Learn more</Button>]}
									disableGutter
									align="left"
									titleProps={{
										variant: 'h6',
										className: classes.textWhite,
									}}
									subtitleProps={{
										variant: 'body1',
										className: classes.textWhite,
									}}
								/>
							</CardBase>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

export default SinglePlantBook;
