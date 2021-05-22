import React from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { PlantPhotos } from '@pages/PlantResourcesPage/components';
import { plantPortfolio } from '@pages/PlantResourcesPage/data';
import { DividerWithText } from '@components/atoms';
import { Headline } from './components';

const useStyles = makeStyles((theme: Theme) => ({
	divider: {
		margin: theme.spacing(3, 0),
		[theme.breakpoints.up('md')]: {
			margin: theme.spacing(5, 0),
		},
	},
	list: {
		marginBottom: theme.spacing(3),
		[theme.breakpoints.up('md')]: {
			marginBottom: theme.spacing(4),
		},
	},
}));

const Introduction = ({ className, ...rest }: any): JSX.Element => {
	const classes = useStyles();

	const dividerSection = (heading: string) => (
		<Grid item xs={12}>
			<DividerWithText>
				<Typography
					variant="h5"
					color="primary"
					sx={{ fontWeight: 600, padding: 2 }}
				>
					{heading}
				</Typography>
			</DividerWithText>
		</Grid>
	);

	return (
		<div className={className} {...rest}>
			<Headline />
			{dividerSection('Greens')}
			<PlantPhotos data={plantPortfolio[1].pages} />
			{dividerSection('Herbs')}
			<PlantPhotos data={plantPortfolio[2].pages} />
			{dividerSection('Fruits')}
			<PlantPhotos data={plantPortfolio[3].pages} />
		</div>
	);
};

export default Introduction;
