import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
	useMediaQuery,
	Grid,
	Typography,
	Divider,
	Button,
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
} from '@material-ui/core';
import { PrintTwoTone } from '@material-ui/icons';
import { SectionHeader, DescriptionCta } from '@components/molecules';
import { Section, CardBase } from '@components/organisms';
import { termsAndConditions } from '@pages/CompanyTerms/data';
import fancyId from '@utils/fancyId';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
		width: '100%',
		'& .description-cta__button-group': {
			flexWrap: 'nowrap',
		},
	},
	pagePaddingTop: {
		paddingTop: theme.spacing(3),
		[theme.breakpoints.up('md')]: {
			paddingTop: theme.spacing(5),
		},
	},
	fontWeightBold: {
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
		width: 30,
		height: 30,
	},
	list: {
		marginBottom: theme.spacing(3),
		[theme.breakpoints.up('md')]: {
			marginBottom: theme.spacing(4),
		},
	},
	link: {
		color: theme.palette.primary.main,
	},
}));

const CompanyTerms = (): JSX.Element => {
	const classes = useStyles();

	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	return (
		<div className={classes.root}>
			<Section className={classes.pagePaddingTop}>
				<>
					<DescriptionCta
						title="Terms of Service"
						subtitle="Updated on 22.05.2021"
						primaryCta={
							<Button variant="outlined" color="primary" size="medium">
								Print
								<PrintTwoTone color="primary" sx={{ marginLeft: 1 }} />
							</Button>
						}
						align="left"
						titleProps={{
							className: classes.fontWeightBold,
							color: 'textPrimary',
						}}
						subtitleProps={{
							color: 'textSecondary',
						}}
					/>
					<Divider className={classes.divider} />
					<Grid container spacing={isMd ? 4 : 2}>
						<Grid item xs={12} md={8}>
							<SectionHeader
								title="Summary"
								subtitle={termsAndConditions.summary}
								align="left"
								titleProps={{
									className: classes.fontWeightBold,
									color: 'textPrimary',
								}}
								subtitleProps={{
									variant: 'body1',
									color: 'textPrimary',
								}}
							/>
							<SectionHeader
								title="About the licence"
								subtitle={termsAndConditions.about}
								align="left"
								titleProps={{
									className: classes.fontWeightBold,
									color: 'textPrimary',
								}}
								subtitleProps={{
									variant: 'body1',
									color: 'textPrimary',
								}}
								disableGutter
							/>
							<List className={classes.list}>
								{termsAndConditions.termsServicesList.map((data) => (
									<ListItem key={fancyId()} disableGutters>
										<ListItemAvatar>
											<Avatar
												src="https://storage.googleapis.com/static.almondhydroponics.com/static/images/check-icon-yellow.svg"
												className={classes.checkBox}
											/>
										</ListItemAvatar>
										<Typography variant="body1" color="textPrimary">
											{data}
										</Typography>
									</ListItem>
								))}
							</List>
							<SectionHeader
								title="Content licenses"
								subtitle={termsAndConditions.about}
								align="left"
								titleProps={{
									className: classes.fontWeightBold,
									color: 'textPrimary',
								}}
								subtitleProps={{
									variant: 'body1',
									color: 'textPrimary',
								}}
								disableGutter
							/>
							<List className={classes.list}>
								{termsAndConditions.termsServicesList.map((data) => (
									<ListItem key={fancyId()} disableGutters>
										<ListItemAvatar>
											<Avatar
												src="https://storage.googleapis.com/static.almondhydroponics.com/static/images/check-icon-yellow.svg"
												className={classes.checkBox}
											/>
										</ListItemAvatar>
										<Typography variant="body1" color="textPrimary">
											{data}
										</Typography>
									</ListItem>
								))}
							</List>
							<SectionHeader
								title="Additional terms"
								subtitle={termsAndConditions.about}
								align="left"
								titleProps={{
									className: classes.fontWeightBold,
									color: 'textPrimary',
								}}
								subtitleProps={{
									variant: 'body1',
									color: 'textPrimary',
								}}
								disableGutter
							/>
							<List className={classes.list}>
								{termsAndConditions.termsServicesList.map((data) => (
									<ListItem key={fancyId()} disableGutters>
										<ListItemAvatar>
											<Avatar
												src="https://storage.googleapis.com/static.almondhydroponics.com/static/images/check-icon-yellow.svg"
												className={classes.checkBox}
											/>
										</ListItemAvatar>
										<Typography variant="body1" color="textPrimary">
											{data}
										</Typography>
									</ListItem>
								))}
							</List>
						</Grid>
						<Grid item xs={12} md={4}>
							<Grid container spacing={isMd ? 4 : 2} direction="column">
								<Grid item xs={12}>
									<CardBase withShadow className={classes.cardHighlighted}>
										<SectionHeader
											title="Have a question?"
											subtitle="Not sure exactly what we’re looking for or just want clarification? We’d be happy to chat with you and clear things up for you. Anytime!"
											ctaGroup={[
												<Button key={fancyId()} variant="contained">
													Contact us
												</Button>,
											]}
											disableGutter
											align="left"
											titleProps={{
												variant: 'subtitle1',
												className: clsx(
													classes.textWhite,
													classes.fontWeightBold,
												),
											}}
											subtitleProps={{
												variant: 'body2',
												className: classes.textWhite,
											}}
										/>
									</CardBase>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</>
			</Section>
			<Divider />
		</div>
	);
};

export default CompanyTerms;
