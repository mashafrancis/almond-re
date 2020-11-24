export interface SelectBoxProps {
	title: string;
	defaultValue?: string;
	options: Option[];
	handleDateSelect?: any;
	selectedValue: string;
}

interface Option {
	label: string;
	value: string;
}
