import { lazy } from 'react';
// third-party libraries
import { Cell, Row } from '@material/react-layout-grid';
import { connect, useSelector } from 'react-redux';
import { FilterList } from '@material-ui/icons';
import {Button} from "@material-ui/core";
// thunks
import { displaySnackMessage } from '@modules/snack';
// import { getEnvironmentData } from '@modules/sensorData';
// helpers
import roundDigit from '@utils/roundDigit';
// styles
import './EnvironmentControlPage.scss';
import { EnvironmentControlPageProps } from '@pages/EnvironmentControlPage/interfaces';

// components
const DashboardCard = lazy(() => import('@components/DashboardCard'));
const DonutDisplay = lazy(() => import('@components/DonutDisplay'));
const AreaChardDisplay = lazy(() => import('@components/AreaChartDisplay'));

export const EnvironmentControlPage = ({
	sensorData,
}: EnvironmentControlPageProps): JSX.Element => {
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

	return (
		<>
			<Row>
				<Cell columns={7} desktopColumns={7} tabletColumns={8} phoneColumns={4}>
					{window.innerWidth < 539 && (
						<div className="main-subheader">
							<h3>EnvironmentControl</h3>
						</div>
					)}
				</Cell>
			</Row>
			<Row className="analytics-page">
				{donutData.map((data, index) => (
					<Cell
						key={index}
						columns={4}
						desktopColumns={4}
						tabletColumns={4}
						phoneColumns={4}
					>
						<DashboardCard
							classes="recent-activities-available"
							heading={data.heading}
							body={
								<DonutDisplay
									backgroundColor={data.backgroundColor}
									hoverBackgroundColor={data.hoverBackgroundColor}
									data={data.data}
									donutInfo={data.donutInfo}
									halfDonut
								/>
							}
						/>
					</Cell>
				))}
				{/* <Cell columns={4} desktopColumns={4} tabletColumns={8} phoneColumns={4}> */}
				{/*  <DashboardCard */}
				{/*    classes="recent-activities-available" */}
				{/*    heading="About" */}
				{/*    body={`You can monitor the plant environment, the air temperature and humidity. The given set points for optimal plant growth are: 27 degrees celcius for temperature and 55 % for humidity`} */}
				{/*    // actionItem={<ActionButton name="Refresh" icon="update" />} */}
				{/*  /> */}
				{/*  /!*<GeneralCardInfo*!/ */}
				{/*  /!*  mainHeader="About Environmental Control"*!/ */}
				{/*  /!*  subHeader={`You can monitor the plant environment, the air temperature and humidity. The given set points for optimal plant growth are: 27 degrees celcius for temperature and 55 % for humidity`}*!/ */}
				{/*  /!*  icon={<BlurCircularIcon className="content-icon general-info-icon" />}*!/ */}
				{/*  /!*  />*!/ */}
				{/* </Cell> */}
			</Row>
			<Row>
				<Cell columns={6} desktopColumns={6} tabletColumns={4} phoneColumns={4}>
					<DashboardCard
						classes="recent-activities-available"
						heading="Daily Temperature Chart"
						body={
							<AreaChardDisplay
								backgroundColor="rgba(25, 103, 210, 0.2)"
								chartColor="#36A2EB"
								chartData={[15, 16, 20, 27, 21, 24, 21, 19, 16]}
								labels={[
									'00:00',
									'03:00',
									'06:00',
									'09:00',
									'12:00',
									'15:00',
									'18:00',
									'21:00',
									'00:00',
								]}
							/>
						}
						actionItem={
							<Button
								name="Filter"
								startIcon={<FilterList />}
								variant="text"
							/>
						}
					/>
				</Cell>
				<Cell columns={6} desktopColumns={6} tabletColumns={8} phoneColumns={4}>
					<DashboardCard
						classes="recent-activities-available"
						heading="Daily Humidity Chart"
						body={
							<AreaChardDisplay
								backgroundColor="rgba(255,206,86,0.2)"
								chartColor="#FFCE56"
								chartData={[25, 36, 50, 57, 40, 70, 55, 30, 47]}
								labels={[
									'00:00',
									'03:00',
									'06:00',
									'09:00',
									'12:00',
									'15:00',
									'18:00',
									'21:00',
									'00:00',
								]}
							/>
						}
						actionItem={
							<Button
								name="Filter"
								startIcon={<FilterList />}
								variant="text"
							/>
						}
					/>
				</Cell>
			</Row>
		</>
	);
};

export const mapStateToProps = (state) => ({
	sensorData: state.sensorData.sensorData,
});

export const mapDispatchToProps = (dispatch) => ({
	displaySnackMessage: (message) => dispatch(displaySnackMessage(message)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EnvironmentControlPage);
