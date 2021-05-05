import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import { IconAlternate } from '@components/molecules';
import { DescriptionListIcon } from '@components/organisms';
import fancyId from '@utils/fancyId';
import clsx from 'clsx';
import { ViewComponentProps } from '../../../../types/ViewComponentProps';

const useStyles = makeStyles((theme) => ({
	root: {},
}));

const Services = ({
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
		<div className={clsx(classes.root, className)} {...rest}>
			<Grid container spacing={isMd ? 4 : 2}>
				{data.map((item: any) => (
					<Grid key={fancyId()} item xs={12} sm={4} data-aos="fade-up">
						<DescriptionListIcon
							title={item.title}
							subtitle={item.subtitle}
							icon={
								<IconAlternate
									avatarIcon={item.icon}
									size="medium"
									color={indigo}
									sx={{ width: 70, height: 70 }}
								/>
							}
						/>
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default Services;
