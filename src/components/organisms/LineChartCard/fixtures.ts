export const dateSelectOptions: string[][] = [
	[
		'30 second window',
		'1 minutes window',
		'5 minute window',
		'30 minutes window',
		'1 hour window',
		'All time',
	],
	[
		'Today',
		'Week to date',
		'Month to date',
		'Year to date',
		'Yesterday',
		'Previous week',
		'Previous month',
		'Previous year',
	],
	[
		'Last 15 minutes',
		'Last 60 minutes',
		'Last 4 hours',
		'Last 24 hours',
		'Last 7 days',
		'Last 30 days',
	],
	['Pick a date'],
];

const dateValueRangeOptions: string[] = [
	'-1d',
	'-2d',
	'-3d',
	'-4d',
	'-5d',
	'-6d',
	'-7d',
	'-8d',
	'-9d',
	'-10d',
	'-11d',
	'-12d',
	'-13d',
	'-14d',
	'-15d',
	'-16d',
	'-17d',
	'-18d',
	'-19d',
	'-20d',
	'-21d',
];

export const dateObjectValues = dateSelectOptions
	.flat()
	.reduce((o, k, i) => ({ ...o, [k]: dateValueRangeOptions[i] }), {});
