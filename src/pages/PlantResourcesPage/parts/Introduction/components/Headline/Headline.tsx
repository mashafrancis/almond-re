import { Grid, makeStyles } from '@material-ui/core';
import { GeneralCardInfo, SectionHeader } from '@components/molecules';
import { SecurityTwoTone } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
	fontWeightBold: {
		fontWeight: 'bold',
	},
}));

const Headline = ({ className, ...rest }: any): JSX.Element => {
	const classes = useStyles();

	return (
		<div className={className} {...rest}>
			<Grid container item xs={12} spacing={2}>
				<GeneralCardInfo
					mainHeader="Almond plantbook"
					subHeader="This is almond. Choose from 20+ varieties. What you grow is up to you."
				/>
			</Grid>
			{/* <SectionHeader */}
			{/*	title="Almond plantbook" */}
			{/*	subtitle="This is almond. Choose from 20+ varieties. What you grow is up to you." */}
			{/*	align="left" */}
			{/*	titleProps={{ */}
			{/*		className: classes.fontWeightBold, */}
			{/*		color: 'textPrimary', */}
			{/*	}} */}
			{/*	subtitleProps={{ */}
			{/*		color: 'textPrimary', */}
			{/*		variant: 'body1', */}
			{/*	}} */}
			{/*	disableGutter */}
			{/* /> */}
		</div>
	);
};

export default Headline;
