import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { MenuItem, TextField } from '@material-ui/core';
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
		<TextField
			className={classes.root}
			id={`select-${title}`}
			select
			size="small"
			label={title}
			value={selectedValue}
			defaultValue={defaultValue}
			onChange={handleDateSelect}
			variant="outlined"
		>
			{options.map((option) => (
				<MenuItem key={option.value} value={option.value}>
					{option.label}
				</MenuItem>
			))}
		</TextField>
	);
};

export default SelectBox;
