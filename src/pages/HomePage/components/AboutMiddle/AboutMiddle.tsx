import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { Image } from '@components/atoms';
import { SectionHeader } from '@components/molecules';
import { Section } from '@components/organisms';
import { Theme } from '@material-ui/core/styles';
import fancyId from '@utils/fancyId';
import { ViewComponentProps } from '../../../../types/ViewComponentProps';

import image from '../../../../assets/images/people-in-sofa.svg';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		background: theme.palette.primary.dark,
		position: 'relative',
	},
	header: {
		[theme.breakpoints.up('md')]: {
			position: 'absolute',
			top: '50%',
			right: 0,
			maxWidth: '50%',
			transform: 'translateY(-50%)',
		},
	},
	image: {
		position: 'relative',
		bottom: theme.spacing(-1),
		[theme.breakpoints.down('sm')]: {
			display: 'none',
		},
	},
	textWhite: {
		color: 'white',
	},
}));

const AboutMiddle = ({
	className,
	...rest
}: ViewComponentProps): JSX.Element => {
	const classes = useStyles();
	return (
		<div className={clsx(classes.root, className)} {...rest}>
			<Section className={classes.header}>
				<SectionHeader
					title={
						<span className={classes.textWhite}>
							Hydroponics technology designed for home.
						</span>
					}
					subtitle={
						<span className={classes.textWhite}>
							Keep track of what&apos;s happening with your data, change
							permissions, and run reports against your data anywhere in the
							world.
						</span>
					}
					ctaGroup={[
						<Button key={fancyId()} variant="contained" size="large">
							Get started
						</Button>,
					]}
					align="left"
					disableGutter
					data-aos="fade-up"
				/>
			</Section>
			<Image src={image} className={classes.image} data-aos="fade-up" />
		</div>
	);
};

export default AboutMiddle;
