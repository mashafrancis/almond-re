import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import {
	MenuItem,
	TextField,
	Select,
	FormControl,
	InputLabel,
} from '@material-ui/core';
import { SelectBoxProps } from '@components/atoms/SelectBox/interfaces';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& .MuiInputBase-input': {
				fontSize: 14,
				fontWeight: 500,
				color: 'rgba(0, 0, 0, 0.80)',
			},
			minWidth: 120,
			margin: theme.spacing(1),
		},
		selectEmpty: {
			marginTop: theme.spacing(2),
		},
		formControl: {
			margin: theme.spacing(1),
			minWidth: 80,
		},
	}),
);

const SelectBox = ({
	title,
	options,
	defaultValue,
	handleDateSelect,
	selectedValue,
}: SelectBoxProps): JSX.Element => {
	const classes = useStyles();

	return (
		<FormControl className={classes.formControl}>
			<InputLabel id={`select-${title}`}>{defaultValue ?? title}</InputLabel>
			<Select
				labelId={`select-${title}`}
				id={`select-${title}`}
				value={selectedValue}
				defaultValue={defaultValue}
				onChange={handleDateSelect}
				variant="outlined"
				autoWidth
				label={title}
				size="small"
			>
				{options.map((option) => (
					<MenuItem key={option.value} value={option.value}>
						{option.label}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default SelectBox;
