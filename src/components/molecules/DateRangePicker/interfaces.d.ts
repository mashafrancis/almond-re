export interface DateRanges {
	startDate: Date;
	endDate: Date;
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
