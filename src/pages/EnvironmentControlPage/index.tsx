import { ChangeEvent, useState } from 'react';
// third-party libraries
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Grid, Stack } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
// components
import { DashboardCard } from '@components/molecules';
import { LineChartCard, DonutDisplay, CardBase } from '@components/organisms';
// thunks
import { getAirTemperatureTrend } from '@modules/sensorData';
// helpers
import roundDigit from '@utils/roundDigit';
import getDateRange from '@utils/DateRangeSelect';
import fancyId from '@utils/fancyId';
// interfaces
import { EnvironmentControlPageState } from '@pages/EnvironmentControlPage/interfaces';
import { DateRanges } from '@components/molecules/DateRangePicker/interfaces';
import { IRootState } from '../../store/rootReducer';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		menu: {
			height: 'auto',
		},
		blankContent: {
			marginTop: 40,
			marginBottom: 40,
			fontFamily: 'San Francisco, serif !important',
			fontSize: 30,
			fontWeight: 300,
			letterSpacing: -2,
			wordSpacing: 2,
		},
		'& .super-app-theme--header': {
			color: theme.palette.text.primary,
			// fontWeight: 500,
		},
	}),
);

export const EnvironmentControlPage = (): JSX.Element => {
	const { sensorData, airTemperatureTrend } = useSelector(
		(globalState: IRootState) => globalState.sensorData,
		shallowEqual,
	);

	const [state, setState] = useState<EnvironmentControlPageState>({
		isDateRangeHidden: false,
		currentDateInView: '',
		airTemperatureCardDateRange: '',
	});

	const classes = useStyles();
	const dispatch = useDispatch();
	const { temperature, humidity } = sensorData;

	// useEffect(() => {
	// 	// const queryParams = {
	// 	// 	db: 'almond_db',
	// 	// 	q:
	// 	// 		'SELECT mean("temperature") FROM "data" WHERE time >= now() - 7d GROUP BY time(10s) fill(null)',
	// 	// 	epoch: 'ms',
	// 	// };
	// 	const queryParams = {
	// 		q: 'time >= now() - 7d',
	// 	};
	// 	getAirTemperatureTrend(queryParams).then(() => {
	// 		setState((prevState) => ({
	// 			...prevState,
	// 			isLoading: false,
	// 		}));
	// 	});
	// }, []);

	const currentTemperature = roundDigit(temperature, 1) || 0;
	const currentHumidity = roundDigit(humidity, 1) || 0;

	const donutData = [
		{
			heading: 'Air Temperature',
			backgroundColor: ['#36A2EB', '#CCCCCC'],
			hoverBackgroundColor: ['#36A2EB', '#CCCCCC'],
			data: [currentTemperature, 100 - currentTemperature],
			donutInfo: `${currentTemperature}\u00b0C`,
		},
		{
			heading: 'Plant Humidity',
			backgroundColor: ['#FFCE56', '#CCCCCC'],
			hoverBackgroundColor: ['#FFCE56', '#CCCCCC'],
			data: [currentHumidity, 100 - currentHumidity],
			donutInfo: `${currentHumidity}%`,
		},
		// {
		// 	heading: 'Water Temperature',
		// 	backgroundColor: ['#7ad283', '#CCCCCC'],
		// 	hoverBackgroundColor: ['#7ad283', '#CCCCCC'],
		// 	data: [currentHumidity, 100 - currentHumidity],
		// 	donutInfo: `${currentHumidity}%`,
		// },
	];

	const handleDateRangeModal = () => {
		setState((prevState) => ({
			...prevState,
			isDateRangeHidden: !prevState.isDateRangeHidden,
		}));
	};

	const onDateRangeChange = (range: DateRanges) => {
		handleDateRangeModal();
		console.log(
			'Class: , Function: onDateRangeChange, Line 324 range():',
			range,
		);
	};

	const currentDateView = (frequency: string) => {
		setState((prevState) => ({
			...prevState,
			currentDateInView: frequency,
		}));
	};

	const handleDateSelect = (event: ChangeEvent<{ value: unknown }>) => {
		const { value: param } = event.target;
		if (param === 'Pick a date') {
			setState((prevState) => ({
				...prevState,
				isDateRangeHidden: false,
			}));
		}

		setState((prevState) => ({
			...prevState,
			waterCardDateRange: param as string,
		}));

		const range = {
			startDate: new Date(),
			endDate: new Date(),
		};
		const date = getDateRange(param, range, currentDateView);
		const queryParams = {
			q: `time >= '${date.startDate}' and time <= '${date.endDate}'`,
		};

		dispatch(getAirTemperatureTrend(queryParams));
	};

	return (
		<div className={classes.root} data-testid="environment-page">
			<Grid container spacing={2}>
				{donutData.map((data) => (
					<Grid
						key={fancyId()}
						item
						container
						direction="row"
						justifyContent="center"
						alignItems="center"
						spacing={1}
						xs={6}
						md={2}
					>
						<DashboardCard
							key={fancyId()}
							heading={data.heading}
							body={
								<DonutDisplay
									backgroundColor={data.backgroundColor}
									hoverBackgroundColor={data.hoverBackgroundColor}
									data={data.data}
									donutInfo={data.donutInfo}
									halfDonut={false}
								/>
							}
						/>
					</Grid>
				))}
				{/* <Grid */}
				{/*	item */}
				{/*	container */}
				{/*	direction="row" */}
				{/*	justifyContent="center" */}
				{/*	alignItems="center" */}
				{/*	spacing={2} */}
				{/*	xs={12} */}
				{/*	style={{ margin: 0, padding: 0 }} */}
				{/* > */}
				{/*	<LineChartCard */}
				{/*		heading="Daily Temperature Chart" */}
				{/*		selectedValue={state.airTemperatureCardDateRange} */}
				{/*		handleDateSelect={handleDateSelect} */}
				{/*		isDateRangeHidden={state.isDateRangeHidden} */}
				{/*		onDateRangeChange={onDateRangeChange} */}
				{/*		handleDateRangeModal={handleDateRangeModal} */}
				{/*		data={airTemperatureTrend} */}
				{/*	/> */}
				{/* </Grid> */}
				{/* <Grid */}
				{/*	item */}
				{/*	container */}
				{/*	direction="row" */}
				{/*	justifyContent="center" */}
				{/*	alignItems="center" */}
				{/*	spacing={2} */}
				{/*	xs={12} */}
				{/*	sm={12} */}
				{/*	md={6} */}
				{/*	style={{ margin: 0, padding: 0 }} */}
				{/* > */}
				{/*	<LineChartCard */}
				{/*		heading="Daily Humidity Chart" */}
				{/*		selectedValue={state.airTemperatureCardDateRange} */}
				{/*		handleDateSelect={handleDateSelect} */}
				{/*		isDateRangeHidden={state.isDateRangeHidden} */}
				{/*		onDateRangeChange={onDateRangeChange} */}
				{/*		handleDateRangeModal={handleDateRangeModal} */}
				{/*		data={airTemperatureTrend} */}
				{/*	/> */}
				{/* </Grid> */}
			</Grid>
		</div>
	);
};

export default EnvironmentControlPage;
