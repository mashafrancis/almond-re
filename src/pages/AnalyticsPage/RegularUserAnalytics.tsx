import { useContext, useEffect, useState, lazy } from 'react';

// components
import { Cell, Row } from '@material/react-layout-grid';
import {
	BlurLinearTwoTone,
	BlurOn,
	MemoryTwoTone,
	OpacityTwoTone,
	ScheduleTwoTone,
	Waves,
} from '@material-ui/icons';
import { ComponentContext } from '@context/ComponentContext';
// import { useSubscription } from 'mqtt-hooks';
import { data } from '@pages/AnalyticsPage/fixtures';
import formatWaterLevelData from '@utils/formatWaterLevel';
import {
	IData,
	RegularUserAnalyticsState,
} from '@pages/AnalyticsPage/interfaces';

const AnalyticsCard = lazy(() => import('@components/AnalyticsCard'));

const RegularUserAnalytics = (): JSX.Element => {
	const [temperature, setTemperature] = useState<number | null>(0);
	const [message, setMessage] = useState<any>('');
	// const { lastMessage, mqtt } = useSubscription('almond/data');

	// useEffect(() => {
	// 	setMessage(lastMessage);
	// 	return () => {
	// 		mqtt?.end();
	// 	};
	// }, []);

	// const { lastMessage } = useSubscription('almond/data');
	// console.log(lastMessage);
	// const temps = lastMessage?.message;

	// useEffect(() => {
	// 	const tempa = lastMessage?.message;
	// 	console.log('Class: , Function: , Line 30 tem():', tempa);
	// 	// setTemperature(temps);
	// 	// return () => {};
	// }, [lastMessage]);
	// const [state, setState] = useState<RegularUserAnalyticsState>({
	// 	data: {
	// 		temp: 0,
	// 		humid: 0,
	// 		water_level: 0,
	// 	},
	// 	lastMessage: {},
	// });

	// const { lastMessage } = useSubscription('almond/data');
	//
	// useEffect(() => {
	//   // const { temp, humid, water_level } = message;
	//   setState(prevState => ({
	//     ...prevState,
	//     // data: {
	//     //   temp: temp || 0,
	//     //   humid: humid,
	//     //   water_level: water_level
	//     // }
	//     lastMessage: lastMessage
	//   }));
	//
	//   return () => console.log('cleaning up...');
	// }, [])

	const menu = useContext(ComponentContext);
	const { setSelectedIndex } = menu;
	// eslint-disable-next-line camelcase
	const { temp, humid, water_level } = data;

	// const { data: { temp = 0, humid = 0, water_level = 0 } } = message;

	const handleCardClick = (index: number) => () => setSelectedIndex(index);

	return (
		<>
			<Row className="analytics-page" data-testid="regular-analytics-page">
				<Cell columns={4} desktopColumns={4} tabletColumns={4} phoneColumns={4}>
					<AnalyticsCard
						onClick={handleCardClick(1)}
						colorClass="card-color-blue"
						icon={<OpacityTwoTone className="content-icon" />}
						mainInfo="Water Level"
						subInfo={`${formatWaterLevelData(water_level)} %`}
					/>
				</Cell>
				<Cell columns={4} desktopColumns={4} tabletColumns={4} phoneColumns={4}>
					<AnalyticsCard
						onClick={handleCardClick(1)}
						colorClass="card-color-yellow"
						icon={<BlurLinearTwoTone className="content-icon" />}
						mainInfo="Water Temperature"
						subInfo={`${temp} \u00b0C`}
					/>
				</Cell>
				<Cell columns={4} desktopColumns={4} tabletColumns={4} phoneColumns={4}>
					<AnalyticsCard
						onClick={handleCardClick(1)}
						colorClass="card-color-brown"
						icon={<ScheduleTwoTone className="content-icon" />}
						mainInfo="Next schedule"
						subInfo="14:00"
					/>
				</Cell>
			</Row>
			<Row className="analytics-page">
				<Cell columns={4} desktopColumns={4} tabletColumns={4} phoneColumns={4}>
					<AnalyticsCard
						onClick={handleCardClick(2)}
						colorClass="card-color-red"
						icon={<BlurOn className="content-icon" />}
						mainInfo="Air Temperature"
						subInfo={`${temp} \u00b0C`}
					/>
				</Cell>
				<Cell columns={4} desktopColumns={4} tabletColumns={4} phoneColumns={4}>
					<AnalyticsCard
						onClick={handleCardClick(2)}
						colorClass="card-color-green"
						icon={<Waves className="content-icon" />}
						mainInfo="Air Humidity"
						subInfo={`${humid} %`}
					/>
				</Cell>
				<Cell columns={4} desktopColumns={4} tabletColumns={4} phoneColumns={4}>
					<AnalyticsCard
						onClick={handleCardClick(3)}
						colorClass="card-color-purple"
						icon={<MemoryTwoTone className="content-icon" />}
						mainInfo="Power usage"
						subInfo="30 KW"
					/>
				</Cell>
			</Row>
		</>
	);
};

export default RegularUserAnalytics;
