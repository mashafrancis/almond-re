import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
	Typography,
	Grid,
	Box,
	ImageList,
	ImageListItem,
	ImageListItemBar,
	IconButton,
	ListSubheader,
	useMediaQuery,
	Theme,
} from '@material-ui/core';
import { Image } from '@components/atoms';
import fancyId from '@utils/fancyId';
import { ViewComponentProps } from '../../../../types/ViewComponentProps';

const useStyles = makeStyles((theme: Theme) => ({
	image: {
		borderRadius: 12,
	},
	listItemBar: {
		color: theme.palette.text.primary,
	},
}));

const PlantPhotos = ({
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
			<Box sx={{ flexGrow: 1 }}>
				<ImageList cols={isMd ? 5 : 3} gap={4}>
					{data.map((item) => (
						<NavLink key={item.id} to={item.href}>
							<ImageListItem sx={{ borderRadius: 8 }}>
								<img
									srcSet={`${item.cover}?w=248&fit=crop&auto=format 1x,
                ${item.cover}?w=248&fit=crop&auto=format&dpr=2 2x`}
									alt={item.title}
									loading="lazy"
									className={classes.image}
								/>
								<ImageListItemBar
									title={item.title}
									position="below"
									className={classes.listItemBar}
									// subtitle={item.author}
									// actionIcon={
									// 	<IconButton
									// 		sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
									// 		aria-label={`info about ${item.title}`}
									// 	>
									// 		{/* <InfoIcon /> */}
									// 	</IconButton>
									// }
								/>
							</ImageListItem>
						</NavLink>
					))}
				</ImageList>
			</Box>
		</div>
	);
};

export default PlantPhotos;
