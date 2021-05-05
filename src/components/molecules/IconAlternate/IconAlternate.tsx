import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import { IconAlternateProps } from '@components/molecules/IconAlternate/interfaces';

const useStyles = makeStyles((theme) => ({
	extraSmall: {
		width: 20,
		height: 20,
	},
	small: {
		width: 50,
		height: 50,
	},
	medium: {
		width: 70,
		height: 70,
	},
	large: {
		width: 90,
		height: 90,
	},
	circle: {
		borderRadius: '100%',
	},
	square: {
		borderRadius: theme.spacing(2),
	},
}));

/**
 * Component to display the alternate icon
 *
 * @param {Object} props
 */
const IconAlternate = ({
	avatarIcon,
	size = 'medium',
	color = [],
	shape = 'square',
	className,
	...rest
}: IconAlternateProps): JSX.Element => {
	const classes = useStyles();
	const useBackgroundStyles = makeStyles(() => ({
		background: {
			backgroundColor: `${color[50]} !important`,
		},
	}));
	const backgroundClasses = useBackgroundStyles();

	return (
		<Avatar
			className={clsx(
				'icon-alternate',
				classes[size],
				classes[shape],
				backgroundClasses.background,
				className,
			)}
			{...rest}
		>
			{avatarIcon}
		</Avatar>
	);
};

export default IconAlternate;
