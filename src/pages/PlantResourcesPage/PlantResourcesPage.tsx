import { lazy, Suspense } from 'react';
import { parse } from 'query-string';
import { makeStyles } from '@material-ui/styles';
import { Section } from '@components/organisms';
import { Theme } from '@material-ui/core/styles';
import { plantPortfolio } from '@pages/PlantResourcesPage/data';
import { Loading } from './components';
import { SinglePlantBook } from './plants';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		minHeight: '100vh',
		height: '100%',
		width: '100%',
	},
	section: {
		paddingTop: theme.spacing(2),
		[theme.breakpoints.up('md')]: {
			paddingTop: theme.spacing(4),
		},
	},
}));

const getComponentId = (): string | string[] =>
	parse(window.location.search).component || 'introduction';

const renderComponent = (): JSX.Element => {
	let Component;
	const componentId = getComponentId();

	const plantObject: any = plantPortfolio
		.map((plant) => plant.pages)
		.flatMap((element) => element)
		.filter((plant) => plant.id === componentId)[0];

	switch (componentId) {
		case 'introduction':
			const Introduction = lazy(() => import('./parts/Introduction'));
			Component = <Introduction />;
			break;
		case 'quick-start':
			const QuickStart = lazy(() => import('./parts/QuickStart'));
			Component = <QuickStart />;
			break;
		case plantObject.id:
			Component = (
				<SinglePlantBook
					title={plantObject.title}
					subtitle={plantObject.subtitle}
					daysToSprout={plantObject.daysToSprout}
					daysToMature={plantObject.daysToMature}
				/>
			);
			break;
		default:
			Component = null;
			break;
	}

	return Component;
};

const PlantResourcesPage = (): JSX.Element => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Section className={classes.section}>
				<Suspense fallback={<Loading />}>{renderComponent()}</Suspense>
			</Section>
		</div>
	);
};

export default PlantResourcesPage;
