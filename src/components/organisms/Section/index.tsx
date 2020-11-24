import clsx from 'clsx';
import useStyles from '@components/organisms/Section/styles';
import { SectionProps } from '@components/organisms/Section/interfaces';

/**
 * Component to display the sections
 *
 * @param {Object} props
 */
const Section = ({
	children,
	fullWidth,
	narrow,
	disablePadding,
	alternate,
	className,
	...rest
}: SectionProps): JSX.Element => {
	const classes = useStyles();

	return (
		<section
			className={clsx(
				'section',
				classes.root,
				fullWidth ? classes.fullWidth : {},
				narrow ? classes.narrow : {},
				disablePadding ? classes.disablePadding : {},
				alternate ? classes.alternate : {},
				className,
			)}
			{...rest}
		>
			{children}
		</section>
	);
};

export default Section;
