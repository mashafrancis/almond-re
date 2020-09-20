import React from 'react';
// Material
import Button from '@material-ui/core/Button';
// interfaces
import { ActionButtonProps } from '@components/ActionButton/interfaces';
// styles
import useStyles from './styles';

const ActionButton = ({
	startIcon,
	endIcon,
	handleClick,
	name,
	variant,
	disabled,
}: ActionButtonProps): JSX.Element => {
	const classes = useStyles();
	return (
		<Button
			className={classes.root}
			startIcon={startIcon}
			endIcon={endIcon}
			onClick={handleClick}
			variant={variant}
			disabled={disabled}
		>
			{name}
		</Button>
	);
};

export default ActionButton;
