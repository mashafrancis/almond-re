import { makeStyles, Typography } from '@material-ui/core';
import { SectionHeader } from '@components/molecules';

const useStyles = makeStyles((theme) => ({
	fontWeightBold: {
		fontWeight: 'bold',
	},
	list: {
		marginBottom: theme.spacing(3),
		[theme.breakpoints.up('md')]: {
			marginBottom: theme.spacing(4),
		},
	},
}));

const QuickStart = ({ className, ...rest }: any): JSX.Element => {
	const classes = useStyles();

	return (
		<div className={className} {...rest}>
			<SectionHeader
				title="Quick start with React Scripts"
				subtitle={
					<Typography variant="h6" component="p" color="textPrimary">
						Open{' '}
						<Typography color="primary" component="span" variant="h6">
							`./react-scripts`
						</Typography>{' '}
						folder and do the following:
					</Typography>
				}
				align="left"
				titleProps={{
					className: classes.fontWeightBold,
					color: 'textPrimary',
				}}
				disableGutter
			/>
			<SectionHeader
				title="Quick start with NextJS"
				subtitle={
					<Typography variant="h6" component="p" color="textPrimary">
						Open{' '}
						<Typography color="primary" component="span" variant="h6">
							`./nextjs`
						</Typography>{' '}
						folder and do the following:
					</Typography>
				}
				align="left"
				titleProps={{
					className: classes.fontWeightBold,
					color: 'textPrimary',
				}}
				disableGutter
			/>
			<SectionHeader
				title="Quick start with GatsbyJS"
				align="left"
				subtitle={
					<Typography variant="h6" component="p" color="textPrimary">
						Open{' '}
						<Typography color="primary" component="span" variant="h6">
							`./gatsbyjs`
						</Typography>{' '}
						folder and do the following:
					</Typography>
				}
				titleProps={{
					className: classes.fontWeightBold,
					color: 'textPrimary',
				}}
				disableGutter
			/>
		</div>
	);
};

export default QuickStart;
