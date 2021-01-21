import { useState } from 'react';
import { DateRange } from 'react-date-range';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	useMediaQuery,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
// styles
import './default.scss';
import './styles.scss';
import {
	DateRangePickerProps,
	DateRangePickerState,
} from '@components/DateRangePicker/interfaces';

// const styles = (theme: Theme) =>
//   createStyles({
//     root: {
//       margin: 0,
//       padding: theme.spacing(2),
//     },
//     closeButton: {
//       position: 'absolute',
//       right: theme.spacing(1),
//       top: theme.spacing(1),
//       color: theme.palette.grey[500],
//     },
//   });

const DateRangePicker = ({
	onChange,
	isOpen,
	onClose,
	onDismiss,
}: DateRangePickerProps): JSX.Element => {
	const [state, setState] = useState<DateRangePickerState>({
		selection: {
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection',
		},
	});
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const handleRangeChange = (payload: DateRangePickerState) => {
		const {
			selection: { startDate, endDate },
		} = payload;
		setState((prevState) => ({
			selection: {
				...prevState.selection,
				startDate,
				endDate,
			},
		}));

		onChange({
			startDate,
			endDate,
		});
	};

	const { startDate } = state.selection;

	return (
		<Dialog
			open={isOpen}
			className="modal-date-range"
			fullScreen={fullScreen}
			onClose={onClose}
			aria-labelledby="responsive-dialog-title"
		>
			<DialogTitle data-testid="header" id="responsive-dialog-title">
				<p className="headline-3 modal-header">Pick a date</p>
			</DialogTitle>
			<DialogContent className="modal-content">
				<DateRange
					className="date-range-picker"
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					onChange={handleRangeChange}
					ranges={[state.selection]}
					shownDate={startDate}
					moveRangeOnFirstSelection={false}
					editableDateInputs
				/>
			</DialogContent>
			<DialogActions>
				<Button name="Dismiss" onClick={onDismiss} variant="text" />
			</DialogActions>
		</Dialog>
	);
};

export default DateRangePicker;
