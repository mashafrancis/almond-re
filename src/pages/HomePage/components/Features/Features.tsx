import { makeStyles } from '@material-ui/styles';
import {
	useMediaQuery,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	colors,
} from '@material-ui/core';
import { Theme, useTheme } from '@material-ui/core/styles';
import { DoneTwoTone } from '@material-ui/icons';
import { Image } from '@components/atoms';
import { SectionHeader, IconAlternate } from '@components/molecules';
import fancyId from '@utils/fancyId';
import { ViewComponentProps } from '../../../../types/ViewComponentProps';

const useStyles = makeStyles((theme: Theme) => ({
	listItemAvatar: {
		minWidth: 'auto',
		marginRight: theme.spacing(2),
	},
	coverImage: {
		[theme.breakpoints.down('sm')]: {
			maxWidth: 500,
		},
	},
	icon: {
		borderRadius: theme.spacing(0, 1),
	},
	listText: {
		color: theme.palette.text.secondary,
	},
}));

const Features = ({
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
			<Grid container spacing={4} direction={isMd ? 'row' : 'column-reverse'}>
				<Grid item xs={12} md={6}>
					<SectionHeader
						title="Grow with Almond"
						subtitle="Easy steps to feed you family and friends."
						align="left"
						disableGutter
						data-aos="fade-up"
					/>
					<List disablePadding>
						{data.map((item: any) => (
							<ListItem disableGutters key={fancyId()} data-aos="fade-up">
								<ListItemAvatar className={classes.listItemAvatar}>
									<IconAlternate
										avatarIcon={
											<DoneTwoTone
												color="primary"
												fontSize="small"
												fontWeight={600}
											/>
										}
										size="extraSmall"
										color={colors.indigo}
										className={classes.icon}
									/>
								</ListItemAvatar>
								<ListItemText primary={item} className={classes.listText} />
							</ListItem>
						))}
					</List>
				</Grid>
				<Grid
					item
					container
					justifyContent="center"
					alignItems="center"
					xs={12}
					md={6}
					data-aos="fade-up"
				>
					<Image
						src="https://assets.maccarianagency.com/the-front/illustrations/learning.svg"
						alt="..."
						className={classes.coverImage}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default Features;
