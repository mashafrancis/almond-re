import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
// interfaces
import { ActionButtonProps } from '@components/ActionButton/interfaces';
// styles
import useStyles from './styles';
import {
	defaultFont,
	primaryBoxShadow,
	primaryColor,
} from '../../assets/tss/common';

const ColorButton = withStyles((theme) => ({
	root: {
		color: theme.palette.getContrastText(primaryColor),
		boxShadow: 'none',
		textTransform: 'none',
		backgroundColor: primaryColor,
		'&:hover': {
			backgroundColor: primaryColor,
		},
		'&:focus': {
			...primaryBoxShadow,
		},
		...defaultFont,
	},
}))(Button);

const ActionButton = ({
	startIcon,
	endIcon,
	handleClick,
	name,
	variant,
	disabled,
}: ActionButtonProps): JSX.Element => {
	const classes = useStyles();

	const buttonClasses = (type: string) => {
		switch (type) {
			case 'contained':
				return classes.contained;
			case 'outlined':
				return classes.outlined;
			default:
				return classes.text;
		}
	};

	return (
		<ColorButton
			className={classes.root && buttonClasses(variant)}
			startIcon={startIcon}
			endIcon={endIcon}
			onClick={handleClick}
			variant={variant}
			disabled={disabled}
			color="primary"
		>
			{name}
		</ColorButton>
	);
};

export default ActionButton;
