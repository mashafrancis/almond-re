import { colors } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// components
import { Section, SectionAlternate } from '@components/organisms';
import {
	AboutBottom,
	AboutMiddle,
	Features,
	Farming,
	Hero,
	HeroAlt,
	Overview,
	Solutions,
	Story,
	Services,
} from '@pages/HomePage/components';
// data
import { farming, features, services } from '@pages/HomePage/data';

const useStyles = makeStyles((theme) => ({
	sectionFarming: {
		// maxWidth: '100%',
		paddingRight: 0,
		paddingLeft: 0,
	},
	servicesSection: {
		background:
			'url(https://assets.maccarianagency.com/the-front/illustrations/patterns-bg.svg) no-repeat center',
		backgroundSize: 'cover',
		[theme.breakpoints.down('sm')]: {
			backgroundSize: 'contain',
		},
	},
	integrationsSection: {
		background: '#0c133e',
	},
	sectionNoPaddingTop: {
		paddingTop: 0,
	},
	reviewSection: {
		background: theme.palette.primary.dark,
	},
	aboutSection: {
		background: '#0c133e',
	},
}));

export const HomePage = (): JSX.Element => {
	const { servicesSection } = useStyles();

	return (
		<div data-testid="homepage" className="homepage">
			<HeroAlt />
			<Section className={servicesSection}>
				<Services data={services} />
			</Section>
			<Section>
				<Features data={features} />
			</Section>
			<AboutMiddle />
			{/* <Hero /> */}
			{/* <Section className={classes.sectionNoPaddingTop}> */}
			{/*	<Overview /> */}
			{/* </Section> */}
			{/* <Section className={classes.sectionFarming}> */}
			{/*	<Farming data={farming} /> */}
			{/* </Section> */}
			{/* <SectionAlternate> */}
			{/*	<Solutions data={features} /> */}
			{/* </SectionAlternate> */}
			<Section>
				<AboutBottom />
			</Section>
		</div>
	);
};

export default HomePage;
