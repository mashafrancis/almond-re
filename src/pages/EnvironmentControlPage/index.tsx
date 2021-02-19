import { ChangeEvent, lazy, useEffect, useState } from 'react';
// third-party libraries
import { Cell, Row } from '@material/react-layout-grid';
import { connect, useSelector } from 'react-redux';
import { FilterList } from '@material-ui/icons';
import { Button } from '@material-ui/core';
// thunks
import { displaySnackMessage } from '@modules/snack';
// import { getEnvironmentData } from '@modules/sensorData';
// helpers
import roundDigit from '@utils/roundDigit';
// styles
import './EnvironmentControlPage.scss';
import {
	EnvironmentControlPageProps,
	EnvironmentControlPageState,
} from '@pages/EnvironmentControlPage/interfaces';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AreaChardDisplay from '@components/AreaChartDisplay';
import DashboardCard from '@components/DashboardCard';
import DonutDisplay from '@components/DonutDisplay';
import { LineChartCard } from '@components/organisms';
import { DateRanges } from '@components/DateRangePicker/interfaces';
import getDateRange from '@utils/DateRangeSelect';
import { getAirTemperatureTrend } from '@modules/sensorData';
import fancyId from '@utils/fancyId';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
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

export const EnvironmentControlPage = ({
	sensorData,
	getAirTemperatureTrend,
	airTemperatureTrend,
}: EnvironmentControlPageProps): JSX.Element => {
	const classes = useStyles();
	const [state, setState] = useState<EnvironmentControlPageState>({
		isDateRangeHidden: true,
		currentDateInView: '',
		airTemperatureCardDateRange: '',
	});

	useEffect(() => {
		// const queryParams = {
		// 	db: 'almond_db',
		// 	q:
		// 		'SELECT mean("temperature") FROM "data" WHERE time >= now() - 7d GROUP BY time(10s) fill(null)',
		// 	epoch: 'ms',
		// };
		const queryParams = {
			q: 'time >= now() - 7d',
		};
		getAirTemperatureTrend(queryParams).then(() => {
			setState((prevState) => ({
				...prevState,
				isLoading: false,
			}));
		});
	}, []);

	// :TODO: Implement useSelector method
	const { temperature, humidity } = sensorData;

	const currentTemperature = roundDigit(temperature, 1) || 0;
	const currentHumidity = roundDigit(humidity, 1) || 0;

	const donutData = [
		{
			heading: 'Air Temperature',
			backgroundColor: ['#36A2EB', '#CCCCCC'],
			hoverBackgroundColor: ['#36A2EB', '#CCCCCC'],
			data: [currentTemperature, 100 - currentTemperature],
			donutInfo: `${currentTemperature} \u00b0C`,
		},
		{
			heading: 'Plant Humidity',
			backgroundColor: ['#FFCE56', '#CCCCCC'],
			hoverBackgroundColor: ['#FFCE56', '#CCCCCC'],
			data: [currentHumidity, 100 - currentHumidity],
			donutInfo: `${currentHumidity}%`,
		},
		{
			heading: 'Water Temperature',
			backgroundColor: ['#7ad283', '#CCCCCC'],
			hoverBackgroundColor: ['#7ad283', '#CCCCCC'],
			data: [currentHumidity, 100 - currentHumidity],
			donutInfo: `${currentHumidity}%`,
		},
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
		getAirTemperatureTrend(queryParams).then(() => {
			setState((prevState) => ({
				...prevState,
				isLoading: false,
			}));
		});
	};

	return (
		<div className={classes.root} data-testid="environment-page">
			<Grid container item xs={12} style={{ margin: 0, padding: 0 }}>
				{donutData.map((data, index) => (
					<Grid
						key={fancyId()}
						item
						container
						direction="row"
						justify="center"
						alignItems="center"
						spacing={2}
						xs={6}
						sm={6}
						md={4}
						style={{ margin: 0, padding: 0 }}
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
				<Grid
					item
					container
					direction="row"
					justify="center"
					alignItems="center"
					spacing={2}
					xs={12}
					sm={12}
					md={6}
					style={{ margin: 0, padding: 0 }}
				>
					<LineChartCard
						heading="Daily Temperature Chart"
						selectedValue={state.airTemperatureCardDateRange}
						handleDateSelect={handleDateSelect}
						isDateRangeHidden={state.isDateRangeHidden}
						onDateRangeChange={onDateRangeChange}
						handleDateRangeModal={handleDateRangeModal}
						data={airTemperatureTrend}
					/>
				</Grid>
				<Grid
					item
					container
					direction="row"
					justify="center"
					alignItems="center"
					spacing={2}
					xs={12}
					sm={12}
					md={6}
					style={{ margin: 0, padding: 0 }}
				>
					<LineChartCard
						heading="Daily Humidity Chart"
						selectedValue={state.airTemperatureCardDateRange}
						handleDateSelect={handleDateSelect}
						isDateRangeHidden={state.isDateRangeHidden}
						onDateRangeChange={onDateRangeChange}
						handleDateRangeModal={handleDateRangeModal}
						data={airTemperatureTrend}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export const mapStateToProps = (state) => ({
	sensorData: state.sensorData.sensorData,
	airTemperatureTrend: state.sensorData.airTemperatureTrend,
});

export const mapDispatchToProps = (dispatch) => ({
	displaySnackMessage: (message) => dispatch(displaySnackMessage(message)),
	getAirTemperatureTrend: (queryParams) =>
		dispatch(getAirTemperatureTrend(queryParams)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EnvironmentControlPage);
