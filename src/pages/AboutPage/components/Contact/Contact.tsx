import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
	useMediaQuery,
	colors,
	List,
	ListItem,
	ListItemText,
} from '@material-ui/core';
import { SectionHeader } from '@components/molecules';
import { contacts } from '@pages/AboutPage/data';
import fancyId from '@utils/fancyId';
import { ViewComponentProps } from '../../../../types/ViewComponentProps';

const useStyles = makeStyles((theme) => ({
	list: {
		display: 'flex',
		flexDirection: 'column',
		[theme.breakpoints.up('sm')]: {
			flexDirection: 'row',
		},
	},
	listItemText: {
		display: 'flex',
		flexDirection: 'column',
		flex: '0 0 auto',
	},
	listItem: {
		justifyContent: 'flex-start',
		borderBottom: `1px solid ${colors.grey[200]}`,
		'&:last-child': {
			borderBottom: 0,
		},
		[theme.breakpoints.up('sm')]: {
			justifyContent: 'center',
			borderRight: `1px solid ${colors.grey[200]}`,
			borderBottom: 0,
			'&:last-child': {
				borderRight: 0,
			},
		},
	},
	icon: {
		background: 'transparent',
		borderRadius: 0,
	},
}));

const Contact = ({ className, ...rest }: ViewComponentProps): JSX.Element => {
	const classes = useStyles();

	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	return (
		<div className={className} {...rest}>
			<SectionHeader
				title="Can't find the answer you need?"
				subtitle="Keep track of what's happening with your data, change permissions, and run reports against your data anywhere in the world. Keep track of what's happening with your data, change permissions."
				subtitleProps={{
					variant: 'body1',
					color: 'textPrimary',
				}}
				data-aos="fade-up"
				align={isMd ? 'center' : 'left'}
			/>
			<List disablePadding className={classes.list}>
				{contacts.map((item) => (
					<ListItem
						key={fancyId()}
						disableGutters
						data-aos="fade-up"
						className={classes.listItem}
					>
						<ListItemText
							className={classes.listItemText}
							primary={item.title}
							secondary={item.subTitle}
							primaryTypographyProps={{
								color: 'textSecondary',
							}}
							secondaryTypographyProps={{
								color: 'textPrimary',
								component: 'span',
							}}
						/>
					</ListItem>
				))}
			</List>
		</div>
	);
};

export default Contact;
