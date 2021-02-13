import { useContext, lazy, useEffect } from 'react';
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
import AnalyticsCard from '@components/AnalyticsCard';
import { ComponentContext } from '@context/ComponentContext';
import formatWaterLevelData from '@utils/formatWaterLevel';
import { RegularUserAnalyticsProps } from '@pages/AnalyticsPage/interfaces';
import { useSubscription } from '@hooks/mqtt';
import { getSensorData } from '@modules/sensorData';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
	}),
);

const RegularUserAnalytics = ({
	sensorData,
}: RegularUserAnalyticsProps): JSX.Element => {
	const classes = useStyles();
	const { setSelectedIndex } = useContext(ComponentContext);
	const { temperature, humidity, waterLevel } = sensorData;

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
					colorClass="card-color-blue"
					icon={<OpacityTwoTone fontSize="large" />}
					mainInfo="Water Level"
					subInfo={`${formatWaterLevelData(waterLevel)} %`}
				/>
				<AnalyticsCard
					onClick={handleCardClick(1)}
					colorClass="card-color-yellow"
					icon={<HorizontalSplitTwoTone fontSize="large" />}
					mainInfo="Water Temperature"
					subInfo={`${temperature ?? 0} \u00b0C`}
				/>
				<AnalyticsCard
					onClick={handleCardClick(1)}
					colorClass="card-color-brown"
					icon={<ScheduleTwoTone fontSize="large" />}
					mainInfo="Next schedule"
					subInfo="14:00"
				/>
				<AnalyticsCard
					onClick={handleCardClick(2)}
					colorClass="card-color-red"
					icon={<BlurOn fontSize="large" />}
					mainInfo="Air Temperature"
					subInfo={`${temperature ?? 0} \u00b0C`}
				/>
				<AnalyticsCard
					onClick={handleCardClick(2)}
					colorClass="card-color-green"
					icon={<BubbleChart fontSize="large" />}
					mainInfo="Air Humidity"
					subInfo={`${humidity ?? 0} %`}
				/>
				<AnalyticsCard
					onClick={handleCardClick(3)}
					colorClass="card-color-purple"
					icon={<MemoryTwoTone fontSize="large" />}
					mainInfo="Power usage"
					subInfo="30 KW"
				/>
			</Grid>
		</div>
	);
};

export default RegularUserAnalytics;
