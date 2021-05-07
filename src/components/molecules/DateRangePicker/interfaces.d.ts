export interface DateRanges {
	startDate: Date | null;
	endDate: Date | null;
}

export interface DateRangePickerProps {
	onChange: (range: DateRanges) => void;
	isOpen: boolean;
	onClose: (e?) => void;
	onDismiss: (e?) => void;
}

export interface DateRangePickerState {
	selection: {
		startDate: Date;
		endDate: Date;
		key?: string;
	};
}

export type Param =
	| 'Today'
	| 'This Week'
	| 'This Month'
	| 'Quarterly'
	| 'This Year'
	| 'Pick a date';
