import { colors } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// components
import { Section, SectionAlternate } from '@components/organisms';
import {
  Farming,
  Hero,
  Overview,
  Solutions,
  Story
} from '@pages/HomePage/components';
// data
import {farming, features} from '@pages/HomePage/data';

const useStyles = makeStyles((theme) => ({
	sectionFarming: {
		maxWidth: '100%',
		paddingRight: 0,
		paddingLeft: 0,
	},
	featuresSection: {
		background:
			'url(https://assets.maccarianagency.com/the-front/illustrations/patterns-bg.svg) no-repeat center',
		backgroundSize: 'contain',
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
	const classes = useStyles();

	return (
		<div data-testid="homepage">
			<Hero />
			{/* <Section className={classes.sectionNoPaddingTop}> */}
			{/*	<Overview /> */}
			{/* </Section> */}
			{/*<Section className={classes.sectionFarming}>*/}
			{/*	<Farming data={farming} />*/}
			{/*</Section>*/}
      <SectionAlternate>
        <Solutions data={features} />
      </SectionAlternate>
			{/* <SectionAlternate> */}
			{/*  <Story /> */}
			{/* </SectionAlternate> */}
		</div>
	);
};

export default HomePage;
