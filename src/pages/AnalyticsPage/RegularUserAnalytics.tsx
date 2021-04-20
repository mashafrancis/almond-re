import { useContext, useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// components
import Grid from '@material-ui/core/Grid';
import {
	BlurLinearTwoTone,
	BlurOn,
	MemoryTwoTone,
	OpacityTwoTone,
	ScheduleTwoTone,
	BubbleChart,
	HorizontalSplitTwoTone,
} from '@material-ui/icons';
import { AnalyticsCard } from '@components/molecules';
import { ComponentContext } from '@context/ComponentContext';
import formatWaterLevelData from '@utils/formatWaterLevel';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSchedules } from '@modules/timeSchedules';
import { UserContext } from '@context/UserContext';
import { getDiff } from '@utils/validateTimeOneHour';
import dayjs from '@utils/dayjsTime';
import { IRootState } from '../../store/rootReducer';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
	}),
);

const RegularUserAnalytics = (): JSX.Element => {
	const classes = useStyles();
	const { setSelectedIndex } = useContext(ComponentContext);
	const { activeDevice } = useContext(UserContext);
	const { temperature, humidity, waterLevel } = useSelector(
		(globalState: IRootState) => globalState.sensorData.sensorData,
	);
	const { schedules } = useSelector(
		(globalState: IRootState) => globalState.timeSchedules,
	);

	const [nextTimeSchedule, setNextTimeSchedule] = useState('00:00');
	const dispatch = useDispatch();

	useEffect(() => {
		const getSchedules = async () =>
			dispatch(getAllSchedules(activeDevice._id));
		getSchedules().then(() => {
			if (schedules.length > 0) {
				const nextTime = schedules
					.filter((t) => getDiff(dayjs(), t.schedule) > 0)
					.reduce((accumulator, current) => {
						const accumulatorDiff = getDiff(dayjs(), accumulator.schedule);
						const currentDiff = getDiff(dayjs(), current.schedule);
						return accumulatorDiff < currentDiff ? accumulator : current;
					});
				setNextTimeSchedule(nextTime.schedule);
			}
		});
	}, [schedules]);

	const handleCardClick = (index: number) => () => setSelectedIndex(index);

	return (
		<div className={classes.root} data-testid="regular-analytics-page">
			<Grid
				container
				item
				xs={12}
				spacing={2}
				style={{ margin: 0, padding: 0 }}
			>
				<AnalyticsCard
					onClick={handleCardClick(1)}
					colorClass="blueCard"
					icon={<OpacityTwoTone fontSize="large" />}
					mainInfo="Water Level"
					subInfo={`${formatWaterLevelData(waterLevel)} %`}
				/>
				<AnalyticsCard
					onClick={handleCardClick(1)}
					colorClass="yellowCard"
					icon={<HorizontalSplitTwoTone fontSize="large" />}
					mainInfo="Water Temperature"
					subInfo={`${temperature ?? 0}\u00b0C`}
				/>
				<AnalyticsCard
					onClick={handleCardClick(1)}
					colorClass="brownCard"
					icon={<ScheduleTwoTone fontSize="large" />}
					mainInfo="Next schedule"
					subInfo={nextTimeSchedule}
				/>
				<AnalyticsCard
					onClick={handleCardClick(2)}
					colorClass="redCard"
					icon={<BlurOn fontSize="large" />}
					mainInfo="Air Temperature"
					subInfo={`${temperature ?? 0}\u00b0C`}
				/>
				<AnalyticsCard
					onClick={handleCardClick(2)}
					colorClass="greenCard"
					icon={<BubbleChart fontSize="large" />}
					mainInfo="Air Humidity"
					subInfo={`${humidity ?? 0} %`}
				/>
				<AnalyticsCard
					onClick={handleCardClick(3)}
					colorClass="purpleCard"
					icon={<MemoryTwoTone fontSize="large" />}
					mainInfo="Power usage"
					subInfo="30 KW"
				/>
			</Grid>
		</div>
	);
};

export default RegularUserAnalytics;
