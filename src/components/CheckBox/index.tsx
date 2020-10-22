import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { withStyles } from '@material-ui/core/styles';
import { primaryColor } from '../../assets/tss/common';

const CheckBox = withStyles({
	root: {
		color: primaryColor,
		'&$checked': {
			color: primaryColor,
		},
	},
	checked: {},
})((props: CheckboxProps) => {
	return (
		<Checkbox
			color="default"
			icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
			checkedIcon={<CheckBoxIcon fontSize="small" />}
			{...props}
		/>
	);
});

export default CheckBox;
